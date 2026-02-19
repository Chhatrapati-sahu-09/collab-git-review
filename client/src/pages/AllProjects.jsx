import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import {
  Terminal,
  ArrowLeft,
  Plus,
  Search,
  FolderKanban,
  Clock,
  Users,
  X,
  Grid3X3,
  List,
} from "lucide-react";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch projects");
      setIsLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    try {
      const res = await api.post("/projects", { name: newProjectName });
      setProjects([...projects, res.data]);
      setNewProjectName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating project");
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-main">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-dark-card/80 backdrop-blur-md border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="p-2 rounded-lg hover:bg-dark-border transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <Terminal className="w-6 h-6 text-primary" />
              <span className="font-bold text-white">All Projects</span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primaryHover transition-colors text-sm font-medium"
          >
            <Plus size={18} />
            New Project
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and View Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark-card border border-dark-border rounded-xl focus:outline-none focus:border-primary text-sm text-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-primary text-white" : "bg-dark-card text-text-muted hover:text-white"}`}
            >
              <Grid3X3 size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-primary text-white" : "bg-dark-card text-text-muted hover:text-white"}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-panel p-4 border border-dark-border flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FolderKanban className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{projects.length}</p>
              <p className="text-sm text-text-muted">Total Projects</p>
            </div>
          </div>
          <div className="glass-panel p-4 border border-dark-border flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Users className="text-accent" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {projects.filter((p) => p.owner?._id === user?._id).length}
              </p>
              <p className="text-sm text-text-muted">Owned by You</p>
            </div>
          </div>
          <div className="glass-panel p-4 border border-dark-border flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Clock className="text-success" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {projects.filter((p) => p.owner?._id !== user?._id).length}
              </p>
              <p className="text-sm text-text-muted">Shared with You</p>
            </div>
          </div>
        </div>

        {/* Projects Display */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <FolderKanban className="w-16 h-16 text-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-white mb-2">
              {searchQuery ? "No projects found" : "No projects yet"}
            </h3>
            <p className="text-text-muted mb-6">
              {searchQuery
                ? "Try a different search term"
                : "Create your first project to get started"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primaryHover transition-colors font-medium"
              >
                Create Project
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link
                key={project._id}
                to={`/project/${project._id}`}
                className="glass-panel p-6 border border-dark-border hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-dark-border group-hover:border-primary/30 transition-colors">
                    <FolderKanban className="text-primary" size={24} />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-dark-bg text-text-muted border border-dark-border">
                    {project.owner?._id === user?._id ? "Owner" : "Member"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {formatDate(project.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {project.members?.length || 0}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="glass-panel border border-dark-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border bg-dark-bg/50">
                  <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                    Project Name
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                    Members
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {filteredProjects.map((project) => (
                  <tr
                    key={project._id}
                    onClick={() => navigate(`/project/${project._id}`)}
                    className="hover:bg-dark-bg/30 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FolderKanban className="text-primary" size={20} />
                        <span className="font-medium text-white">
                          {project.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${project.owner?._id === user?._id ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}
                      >
                        {project.owner?._id === user?._id ? "Owner" : "Member"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-muted">
                      {project.members?.length || 0}
                    </td>
                    <td className="px-6 py-4 text-text-muted">
                      {formatDate(project.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-panel border border-dark-border w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">New Project</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-text-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateProject}>
              <div className="mb-6">
                <label
                  htmlFor="project-name"
                  className="block text-sm font-medium text-text-muted mb-2"
                >
                  Project Name
                </label>
                <input
                  id="project-name"
                  name="projectName"
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="My Awesome Project"
                  className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl focus:outline-none focus:border-primary text-white text-sm transition-colors"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-text-muted border border-dark-border rounded-xl hover:bg-dark-border hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primaryHover transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProjects;
