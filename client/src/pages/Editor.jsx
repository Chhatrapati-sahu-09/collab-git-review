import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Automerge from "@automerge/automerge";
import io from "socket.io-client";
import api from "../api/axios";

// --- CodeMirror Imports ---
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const socket = io("http://localhost:5000");

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [title, setTitle] = useState("Loading...");
  const [isSaving, setIsSaving] = useState(false);

  const docRef = useRef(null);

  useEffect(() => {
    loadDocument();
    socket.emit("join-document", id);

    const handleReceiveChanges = (changes) => {
      if (!docRef.current) return;
      const [newDoc] = Automerge.applyChanges(docRef.current, changes);
      docRef.current = newDoc;
      setText(newDoc.text);
    };

    socket.on("receive-changes", handleReceiveChanges);
    return () => socket.off("receive-changes", handleReceiveChanges);
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
          text: "// Start coding here...\n// Real-time sync is active.\n",
        });
      }

      docRef.current = initialDoc;
      setText(initialDoc.text);
    } catch (error) {
      console.error("Failed to load document state", error);
    }
  };

  // Note: CodeMirror passes the raw value string directly
  const handleTextChange = (value) => {
    setText(value);

    if (docRef.current) {
      const newDoc = Automerge.change(docRef.current, (d) => {
        d.text = value;
      });

      const changes = Automerge.getChanges(docRef.current, newDoc);
      docRef.current = newDoc;

      if (changes.length > 0) {
        socket.emit("send-changes", { documentId: id, changes });
      }
    }
  };

  const saveToServer = async () => {
    if (!docRef.current) return;
    setIsSaving(true);
    try {
      const binary = Automerge.save(docRef.current);
      await api.put(`/documents/${id}`, binary, {
        headers: { "Content-Type": "application/octet-stream" },
      });
      setTimeout(() => setIsSaving(false), 1000);
    } catch (error) {
      console.error("Failed to save document", error);
      setIsSaving(false);
    }
  };

  if (!docRef.current)
    return (
      <div className="p-8 text-center text-gray-500">
        Initializing Real-Time Engine...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#282c34]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-700 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 transition-colors hover:text-white"
          >
            &larr; Dashboard
          </button>
          <h1 className="text-xl font-semibold text-white">
            {title}{" "}
            <span className="ml-2 text-xs text-green-400">● Live Sync</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={saveToServer}
            className={`px-4 py-2 font-medium text-white rounded transition-colors ${isSaving ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isSaving ? "Saved!" : "Save State"}
          </button>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Code Editor */}
        <div className="flex-1 overflow-y-auto">
          <CodeMirror
            value={text}
            height="100%"
            theme={oneDark}
            extensions={[javascript({ jsx: true })]}
            onChange={handleTextChange}
            className="text-lg"
          />
        </div>

        {/* Comment Sidebar Placeholder (Next Step) */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto hidden lg:block">
          <h3 className="text-gray-300 font-semibold mb-4 border-b border-gray-700 pb-2">
            Code Comments
          </h3>
          <p className="text-sm text-gray-500">
            Select a line to add a review comment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Editor;
