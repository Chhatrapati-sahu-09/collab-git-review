import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import {
  ArrowLeft,
  FileCode2,
  Users,
  Settings,
  Plus,
  Search,
  Clock,
  MoreVertical,
  FilePlus,
  X,
  Terminal,
} from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [id, user]);

  const fetchDocuments = async () => {
    try {
      const res = await api.get(`/documents/project/${id}`);
      setDocuments(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch documents", error);
      setIsLoading(false);
    }
  };

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;
    try {
      const res = await api.post("/documents", {
        title: newDocTitle,
        projectId: id,
      });
      setDocuments([...documents, res.data]);
      setNewDocTitle("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating document", error);
    }
  };

  // Show loading while auth state is being determined
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-dark-bg">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-dark-bg text-text-main">
      {/* Project Sidebar */}
      <aside className="flex flex-col w-64 border-r bg-dark-card border-dark-border">
        <div className="flex items-center gap-3 px-6 h-20 border-b border-dark-border">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-1.5 text-text-muted hover:text-white hover:bg-dark-border rounded-lg transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-lg font-bold tracking-tight text-white truncate">
            Workspace
          </span>
        </div>

        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <p className="px-2 mb-2 text-xs font-semibold tracking-wider text-text-muted uppercase">
            Codebase
          </p>
          <NavItem
            icon={<FileCode2 size={20} />}
            label="Files & Documents"
            active
          />

          <p className="px-2 mt-8 mb-2 text-xs font-semibold tracking-wider text-text-muted uppercase">
            Management
          </p>
          <NavItem icon={<Users size={20} />} label="Members" />
          <NavItem icon={<Settings size={20} />} label="Project Settings" />
        </div>

        {/* Mock Invite Button */}
        <div className="p-4 border-t border-dark-border">
          <button className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-primary bg-primary/10 border border-primary/20 rounded-xl hover:bg-primary/20 transition-colors">
            <Users size={16} /> Invite Team
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-20 px-8 border-b border-dark-border bg-dark-bg/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center">
              <Terminal className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">
                Project Files
              </h1>
              <p className="text-xs text-text-muted">
                Manage and collaborate on your codebase.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primaryHover hover:shadow-glow transition-all active:scale-95"
          >
            <Plus size={18} /> New File
          </button>
        </header>

        {/* Documents Table View */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto glass-panel border border-dark-border rounded-xl overflow-hidden">
            {/* Table Controls */}
            <div className="flex items-center justify-between p-4 border-b border-dark-border bg-dark-card/50">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search files..."
                  className="w-full pl-9 pr-4 py-1.5 bg-dark-bg border border-dark-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <span className="text-sm text-text-muted">
                {documents.length} files
              </span>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 text-xs font-semibold tracking-wider text-text-muted uppercase border-b border-dark-border bg-dark-card">
              <div className="col-span-6 md:col-span-5">Name</div>
              <div className="hidden md:block col-span-3">Status</div>
              <div className="col-span-4 md:col-span-3">Last Modified</div>
              <div className="col-span-2 md:col-span-1 text-right">Actions</div>
            </div>

            {/* Table Body */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : documents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FilePlus className="w-12 h-12 text-text-muted mb-4 opacity-50" />
                <h3 className="text-base font-medium text-white mb-1">
                  No files created
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  Get started by creating a new document.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm font-medium text-primary hover:text-primaryHover"
                >
                  + Create your first file
                </button>
              </div>
            ) : (
              <div className="divide-y divide-dark-border">
                {documents.map((doc) => (
                  <div
                    key={doc._id}
                    className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-dark-border/30 transition-colors group"
                  >
                    {/* File Name */}
                    <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                      <FileCode2 className="w-5 h-5 text-accent opacity-80" />
                      <Link
                        to={`/editor/${doc._id}`}
                        className="text-sm font-medium text-text-main group-hover:text-primary transition-colors truncate"
                      >
                        {doc.title}
                      </Link>
                    </div>

                    {/* Status */}
                    <div className="hidden md:flex col-span-3 items-center gap-2">
                      <span className="flex w-2 h-2 rounded-full bg-success"></span>
                      <span className="text-xs text-text-muted">Synced</span>
                    </div>

                    {/* Date */}
                    <div className="col-span-4 md:col-span-3 flex items-center gap-2 text-xs text-text-muted">
                      <Clock size={14} />
                      {new Date(
                        doc.updatedAt || doc.createdAt,
                      ).toLocaleDateString()}
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 md:col-span-1 flex justify-end">
                      <button className="p-1.5 text-text-muted hover:text-white hover:bg-dark-border rounded transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Create File Modal */}
        {isModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-dark-bg/80 backdrop-blur-sm px-4">
            <div className="glass-panel w-full max-w-md p-6 relative animate-[fadeIn_0.2s_ease-out]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold text-white mb-2">
                Create New File
              </h2>
              <p className="text-sm text-text-muted mb-6">
                Add a new document to this project workspace.
              </p>

              <form onSubmit={handleCreateDocument}>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-text-muted">
                    File Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileCode2 className="h-4 w-4 text-text-muted" />
                    </div>
                    <input
                      type="text"
                      value={newDocTitle}
                      onChange={(e) => setNewDocTitle(e.target.value)}
                      placeholder="e.g., utils.js"
                      required
                      autoFocus
                      className="w-full pl-9 pr-4 py-2.5 bg-dark-bg border border-dark-border text-text-main rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-text-muted hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-sm font-semibold text-dark-bg bg-accent rounded-xl hover:opacity-90 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] active:scale-95"
                  >
                    Create File
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sidebar Navigation Component
const NavItem = ({ icon, label, active }) => (
  <Link
    to="#"
    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors rounded-xl ${active ? "bg-primary/10 text-primary border border-primary/10" : "text-text-muted hover:bg-dark-border hover:text-white border border-transparent"}`}
  >
    {icon}
    {label}
  </Link>
);

export default ProjectDetail;
