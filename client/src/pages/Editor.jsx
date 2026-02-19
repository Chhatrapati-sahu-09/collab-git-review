import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Automerge from "@automerge/automerge";
import io from "socket.io-client";
import api from "../api/axios";

// Editor Imports
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

// Icons
import {
  ChevronLeft,
  Users,
  History,
  CheckCircle2,
  CloudLightning,
  MessageSquare,
  Terminal,
  Send,
  Check,
  AlertCircle,
  FileCode2,
} from "lucide-react";

import VersionHistoryPanel from "../components/VersionHistoryPanel";

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000");

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Core State
  const [text, setText] = useState("");
  const [title, setTitle] = useState("Loading...");
  const [syncStatus, setSyncStatus] = useState("connecting"); // connecting, synced, syncing, error
  const docRef = useRef(null);

  // Collaboration & Review State
  const [comments, setComments] = useState([]);
  const [selectedLine, setSelectedLine] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [isCommentsOpen, setIsCommentsOpen] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // --- 1. INITIALIZATION & SOCKET LOGIC ---
  useEffect(() => {
    loadDocument();
    fetchComments();

    socket.emit("join-document", id);
    setSyncStatus("synced");

    const handleReceiveChanges = (changes) => {
      if (!docRef.current) return;
      setSyncStatus("syncing");
      const [newDoc] = Automerge.applyChanges(docRef.current, changes);
      docRef.current = newDoc;
      setText(newDoc.text);
      setTimeout(() => setSyncStatus("synced"), 500);
    };

    const handleReceiveComment = () => {
      fetchComments();
    };

    socket.on("receive-changes", handleReceiveChanges);
    socket.on("receive-comment", handleReceiveComment);
    socket.on("connect_error", () => setSyncStatus("error"));

    return () => {
      socket.off("receive-changes");
      socket.off("receive-comment");
      socket.off("connect_error");
    };
  }, [id]);

  const loadDocument = async () => {
    try {
      const res = await api.get(`/documents/${id}`, { responseType: "json" });
      setTitle(res.data.title);

      let initialDoc;
      if (res.data.automergeBinary && res.data.automergeBinary.data) {
        const binaryData = new Uint8Array(res.data.automergeBinary.data);
        initialDoc = Automerge.load(binaryData);
      } else {
        initialDoc = Automerge.from({
          text: "// Initialize your code here...\n",
        });
      }

      docRef.current = initialDoc;
      setText(initialDoc.text);
    } catch (error) {
      setSyncStatus("error");
      console.error("Failed to load document state", error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/document/${id}`);
      setComments(res.data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  // --- 2. EDITOR INTERACTIONS ---
  const handleTextChange = (value) => {
    setText(value);
    setSyncStatus("syncing");

    if (docRef.current) {
      const newDoc = Automerge.change(docRef.current, (d) => {
        d.text = value;
      });
      const changes = Automerge.getChanges(docRef.current, newDoc);
      docRef.current = newDoc;

      if (changes.length > 0) {
        socket.emit("send-changes", { documentId: id, changes });
        saveToServer(newDoc); // Debounced in a real app, calling directly for MVP
      } else {
        setSyncStatus("synced");
      }
    }
  };

  const saveToServer = async (documentState) => {
    try {
      const binary = Automerge.save(documentState);
      await api.put(`/documents/${id}`, binary, {
        headers: { "Content-Type": "application/octet-stream" },
      });
      setSyncStatus("synced");
    } catch (error) {
      setSyncStatus("error");
    }
  };

  const handleEditorUpdate = (viewUpdate) => {
    if (viewUpdate.selectionSet || viewUpdate.docChanged) {
      const state = viewUpdate.state;
      const cursorPosition = state.selection.main.head;
      const line = state.doc.lineAt(cursorPosition).number;
      setSelectedLine(line);
    }
  };

  // --- 3. COMMENTING LOGIC ---
  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await api.post("/comments", {
        documentId: id,
        lineNumber: selectedLine,
        text: newComment,
      });

      setNewComment("");
      fetchComments();
      socket.emit("new-comment", id);
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  // --- 4. RENDER HELPERS ---
  const renderSyncStatus = () => {
    switch (syncStatus) {
      case "synced":
        return (
          <span className="flex items-center gap-1.5 text-xs text-success">
            <CheckCircle2 size={14} /> Synced
          </span>
        );
      case "syncing":
        return (
          <span className="flex items-center gap-1.5 text-xs text-accent">
            <CloudLightning size={14} className="animate-pulse" /> Syncing...
          </span>
        );
      case "error":
        return (
          <span className="flex items-center gap-1.5 text-xs text-error">
            <AlertCircle size={14} /> Offline
          </span>
        );
      default:
        return <span className="text-xs text-text-muted">Connecting...</span>;
    }
  };

  if (!docRef.current)
    return (
      <div className="flex items-center justify-center h-screen bg-dark-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium tracking-widest text-text-muted uppercase animate-pulse">
            Initializing CRDT Engine
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-dark-bg font-sans">
      {/* --- TOP NAVBAR --- */}
      <header className="flex items-center justify-between h-14 px-4 border-b border-dark-border bg-dark-card z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 text-text-muted hover:text-white hover:bg-dark-border rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <FileCode2 size={16} className="text-accent" />
            <span className="text-sm font-semibold text-text-main font-mono">
              {title}
            </span>
          </div>
          <div className="h-4 w-px bg-dark-border mx-2"></div>
          {renderSyncStatus()}
        </div>

        <div className="flex items-center gap-4">
          {/* Mock Active Users */}
          <div className="flex -space-x-2 mr-4">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-accent border-2 border-dark-card flex items-center justify-center text-[10px] font-bold text-white z-20">
              You
            </div>
            <div className="w-7 h-7 rounded-full bg-dark-border border-2 border-dark-card flex items-center justify-center text-[10px] font-bold text-text-muted z-10 animate-pulse">
              ...
            </div>
          </div>

          <button
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-text-main border border-dark-border rounded-lg hover:bg-dark-border transition-colors"
          >
            <History size={14} /> Version History
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primaryHover transition-colors shadow-glow">
            <Users size={14} /> Share
          </button>
          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className={`p-1.5 rounded-lg transition-colors ${isCommentsOpen ? "bg-primary/20 text-primary" : "text-text-muted hover:bg-dark-border hover:text-white"}`}
          >
            <MessageSquare size={18} />
          </button>
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Thin Left Icon Bar (Simulated Explorer) */}
        <div className="w-12 border-r border-dark-border bg-dark-card/50 flex flex-col items-center py-4 gap-4 hidden md:flex">
          <button className="p-2 text-primary bg-primary/10 rounded-lg">
            <FileCode2 size={20} />
          </button>
          <button className="p-2 text-text-muted hover:text-white transition-colors">
            <Terminal size={20} />
          </button>
        </div>

        {/* CodeMirror Editor Center */}
        <div className="flex-1 overflow-hidden bg-[#282c34] relative">
          <CodeMirror
            value={text}
            height="100%"
            theme={oneDark}
            extensions={[javascript({ jsx: true })]}
            onChange={handleTextChange}
            onUpdate={handleEditorUpdate}
            className="h-full text-[15px] font-mono leading-relaxed"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          />
        </div>

        {/* --- RIGHT COMMENT SIDEBAR --- */}
        <div
          className={`w-80 border-l border-dark-border bg-dark-card flex flex-col transition-all duration-300 ease-in-out ${isCommentsOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 absolute right-0 top-0 bottom-0"}`}
        >
          {/* Sidebar Header */}
          <div className="px-4 py-3 border-b border-dark-border flex justify-between items-center bg-dark-card z-10 shadow-sm">
            <h3 className="text-sm font-semibold text-text-main">
              Code Reviews
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-dark-bg border border-dark-border text-text-muted">
              Line {selectedLine}
            </span>
          </div>

          {/* Thread List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                <MessageSquare size={32} className="mb-3 text-text-muted" />
                <p className="text-sm text-text-muted">
                  Select a line to start a review thread.
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-3 bg-dark-bg border border-dark-border rounded-xl shadow-sm hover:border-dark-border/80 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-[8px] font-bold text-white">
                        {comment.author.name.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-text-main">
                        {comment.author.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-text-muted bg-dark-card px-1.5 py-0.5 rounded">
                      L{comment.lineNumber}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed mb-3">
                    {comment.text}
                  </p>
                  <div className="flex justify-end">
                    <button className="flex items-center gap-1 text-[10px] font-medium text-text-muted hover:text-success transition-colors">
                      <Check size={12} /> Resolve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Area (Bottom of sidebar) */}
          <div className="p-4 border-t border-dark-border bg-dark-card/80 backdrop-blur-md">
            <form onSubmit={handlePostComment} className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={`Leave a comment on Line ${selectedLine}...`}
                className="w-full pl-3 pr-10 py-2.5 text-sm text-text-main bg-dark-bg border border-dark-border rounded-xl outline-none resize-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-muted/50 scrollbar-hide"
                rows="2"
                required
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="absolute bottom-2.5 right-2 p-1.5 text-white bg-primary rounded-lg hover:bg-primaryHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-glow"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- BOTTOM STATUS BAR --- */}
      <footer className="h-6 flex items-center justify-between px-4 bg-[#1E293B] border-t border-dark-border text-[11px] text-text-muted font-mono tracking-wide z-20">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <Terminal size={12} className="text-accent" /> JavaScript React
          </span>
          <span>UTF-8</span>
        </div>
        <div>
          <span>Ln {selectedLine}, Col 1</span>
        </div>
      </footer>

      {/* Slide-in Modal */}
      <VersionHistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onRestore={(versionId) => console.log("Restoring version:", versionId)}
      />
    </div>
  );
};

export default Editor;
