import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Users,
  FileCode2,
  FolderKanban,
  ArrowLeft,
  ShieldAlert,
  MoreVertical,
  Ban,
  Edit2,
} from "lucide-react";

const Admin = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not authenticated or not admin
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    } else if (!loading && user && user.role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  // Mock Data for UI
  const mockUsers = [
    {
      id: 1,
      name: "Chhatrapati Sahu",
      email: "admin@syncforge.dev",
      role: "admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Alex Developer",
      email: "alex@example.com",
      role: "reviewer",
      status: "Active",
    },
    {
      id: 3,
      name: "Sarah Engineer",
      email: "sarah@example.com",
      role: "contributor",
      status: "Offline",
    },
    {
      id: 4,
      name: "Suspicious User",
      email: "bot@spam.com",
      role: "contributor",
      status: "Banned",
    },
  ];

  // Show loading while auth state is being determined
  if (loading || !user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen bg-dark-bg">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-text-main p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 text-text-muted hover:text-white bg-dark-card border border-dark-border rounded-xl transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-error" /> System Administration
            </h1>
            <p className="text-sm text-text-muted">
              Manage users, roles, and platform metrics.
            </p>
          </div>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-panel p-6 border border-dark-border flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Total Users</p>
              <h3 className="text-3xl font-bold text-white">1,248</h3>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
              <Users className="text-primary" />
            </div>
          </div>
          <div className="glass-panel p-6 border border-dark-border flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Active Documents</p>
              <h3 className="text-3xl font-bold text-white">8,432</h3>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20">
              <FileCode2 className="text-accent" />
            </div>
          </div>
          <div className="glass-panel p-6 border border-dark-border flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Total Projects</p>
              <h3 className="text-3xl font-bold text-white">492</h3>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center border border-success/20">
              <FolderKanban className="text-success" />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="glass-panel border border-dark-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-dark-border bg-dark-card/50 flex justify-between items-center">
            <h2 className="font-semibold text-white">User Management</h2>
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-1.5 bg-dark-bg border border-dark-border rounded-lg text-sm focus:outline-none focus:border-primary text-white"
            />
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dark-card text-xs font-semibold tracking-wider text-text-muted uppercase border-b border-dark-border">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {mockUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-dark-border/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-dark-bg border border-dark-border flex items-center justify-center text-xs font-bold text-white">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-text-muted">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${user.role === "admin" ? "bg-error/10 text-error border-error/20" : user.role === "reviewer" ? "bg-primary/10 text-primary border-primary/20" : "bg-dark-bg text-text-muted border-dark-border"}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${user.status === "Active" ? "bg-success" : user.status === "Banned" ? "bg-error" : "bg-text-muted"}`}
                        ></div>
                        <span className="text-xs text-text-muted">
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-1.5 text-text-muted hover:text-primary bg-dark-bg border border-dark-border rounded transition-colors"
                          title="Edit Role"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="p-1.5 text-text-muted hover:text-error bg-dark-bg border border-dark-border rounded transition-colors"
                          title="Ban User"
                        >
                          <Ban size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
