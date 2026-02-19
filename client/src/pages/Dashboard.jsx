import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import {
  Terminal,
  LayoutDashboard,
  FolderKanban,
  Activity,
  Settings,
  LogOut,
  Plus,
  Search,
  Bell,
  Clock,
  Users,
  X,
} from "lucide-react";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { user, logout } = useContext(AuthContext);
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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-dark-bg text-text-main">
      {/* Sidebar (Left) */}
      <aside className="flex flex-col w-64 border-r bg-dark-card border-dark-border">
        <div className="flex items-center gap-3 px-6 h-20 border-b border-dark-border">
          <Terminal className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-white">
            SyncCode
          </span>
        </div>

        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <p className="px-2 mb-2 text-xs font-semibold tracking-wider text-text-muted uppercase">
            Menu
          </p>
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            to="/dashboard"
            active
          />
          <NavItem
            icon={<FolderKanban size={20} />}
            label="All Projects"
            to="/dashboard"
          />
          <NavItem
            icon={<Activity size={20} />}
            label="Activity"
            to="/activity"
          />

          <p className="px-2 mt-8 mb-2 text-xs font-semibold tracking-wider text-text-muted uppercase">
            Settings
          </p>
          <NavItem
            icon={<Settings size={20} />}
            label="Preferences"
            to="/profile"
          />
        </div>

        <div className="p-4 border-t border-dark-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-text-muted transition-colors rounded-xl hover:bg-dark-border hover:text-error"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Navbar */}
        <header className="flex items-center justify-between h-20 px-8 border-b border-dark-border bg-dark-bg/80 backdrop-blur-md z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects, files, or code..."
              className="w-full pl-10 pr-4 py-2 bg-dark-card border border-dark-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text-main"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-text-muted hover:text-white transition-colors">
              <Bell size={22} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-dark-border">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-sm font-bold text-white shadow-glow">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white leading-tight">
                  {user?.name}
                </p>
                <p className="text-xs text-text-muted capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user?.name?.split(" ")[0]} 👋
              </h1>
              <p className="text-text-muted">
                Here is what's happening with your projects today.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <StatCard
                title="Active Projects"
                value={projects.length}
                icon={<FolderKanban className="text-primary" />}
              />
              <StatCard
                title="Total Collaborators"
                value={projects.reduce(
                  (acc, p) => acc + (p.members?.length || 0) + 1,
                  0,
                )}
                icon={<Users className="text-accent" />}
              />
              <StatCard
                title="Pending Reviews"
                value="0"
                icon={<Clock className="text-amber-400" />}
              />
            </div>

            {/* Projects Section */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Projects</h2>
              {projects.length > 0 && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primaryHover transition-colors"
                >
                  <Plus size={16} /> New Project
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-dark-border rounded-xl bg-dark-card/30">
                <div className="w-16 h-16 bg-dark-bg rounded-full flex items-center justify-center mb-4 border border-dark-border">
                  <FolderKanban className="w-8 h-8 text-text-muted" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  No projects yet
                </h3>
                <p className="text-text-muted mb-6 max-w-sm">
                  Create your first project to start collaborating on code in
                  real-time.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-primary rounded-xl hover:bg-primaryHover transition-all shadow-glow active:scale-95"
                >
                  <Plus size={20} /> Create Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Link
                    to={`/project/${project._id}`}
                    key={project._id}
                    className="block group"
                  >
                    <div className="glass-panel p-6 h-full border border-dark-border hover:border-primary/50 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                      {/* Decorative gradient blob */}
                      <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>

                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                          <Terminal className="w-5 h-5 text-text-main group-hover:text-primary transition-colors" />
                        </div>
                        <span
                          className={`text-xs font-mono px-2 py-1 rounded-md border ${project.owner._id === user?._id ? "bg-primary/10 text-primary border-primary/20" : "bg-dark-bg text-text-muted border-dark-border"}`}
                        >
                          {project.owner._id === user?._id ? "Owner" : "Member"}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-text-muted flex items-center gap-2 mt-4">
                        <Clock size={14} /> Updated{" "}
                        {new Date(
                          project.updatedAt || project.createdAt,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Floating Action Button (FAB) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-8 right-8 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:bg-primaryHover hover:scale-105 transition-all active:scale-95 z-20"
          title="Create New Project"
        >
          <Plus size={28} />
        </button>

        {/* Create Project Modal */}
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
                Create New Project
              </h2>
              <p className="text-sm text-text-muted mb-6">
                Initialize a new workspace for your real-time code
                collaboration.
              </p>

              <form onSubmit={handleCreateProject}>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-text-muted">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="e.g., Auth Microservice"
                    required
                    autoFocus
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border text-text-main rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
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
                    className="px-6 py-2 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primaryHover transition-all shadow-glow active:scale-95"
                  >
                    Create Project
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

// Sub-components for cleaner code
const NavItem = ({ icon, label, to, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-xl ${active ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-dark-border hover:text-white"}`}
  >
    {icon}
    {label}
  </Link>
);

const StatCard = ({ title, value, icon }) => (
  <div className="glass-panel p-6 flex items-center justify-between border border-dark-border">
    <div>
      <p className="text-sm font-medium text-text-muted mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
    </div>
    <div className="w-12 h-12 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-center">
      {icon}
    </div>
  </div>
);

export default Dashboard;
