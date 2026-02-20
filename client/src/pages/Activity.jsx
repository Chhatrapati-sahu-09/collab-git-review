import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Terminal,
  ArrowLeft,
  Clock,
  FileCode2,
  MessageSquare,
  GitCommit,
  Users,
} from "lucide-react";

const Activity = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "commit",
      user: "Chhatrapati Sahu",
      action: "pushed changes to",
      target: "main.js",
      project: "E-Commerce API",
      time: "2 minutes ago",
      icon: <GitCommit className="text-primary" size={18} />,
    },
    {
      id: 2,
      type: "comment",
      user: "Dev Team",
      action: "commented on",
      target: "auth.js",
      project: "Auth Service",
      time: "15 minutes ago",
      icon: <MessageSquare className="text-accent" size={18} />,
    },
    {
      id: 3,
      type: "file",
      user: "Chhatrapati Sahu",
      action: "created new file",
      target: "utils.js",
      project: "E-Commerce API",
      time: "1 hour ago",
      icon: <FileCode2 className="text-success" size={18} />,
    },
    {
      id: 4,
      type: "member",
      user: "Admin",
      action: "added member to",
      target: "Auth Service",
      project: "",
      time: "3 hours ago",
      icon: <Users className="text-yellow-400" size={18} />,
    },
    {
      id: 5,
      type: "commit",
      user: "Chhatrapati Sahu",
      action: "pushed changes to",
      target: "index.js",
      project: "Dashboard App",
      time: "5 hours ago",
      icon: <GitCommit className="text-primary" size={18} />,
    },
  ];

  // Show loading while auth state is being determined
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-dark-bg">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-text-main">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-dark-card/80 backdrop-blur-md border-b border-dark-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="p-2 rounded-lg hover:bg-dark-border transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <Terminal className="w-6 h-6 text-primary" />
              <span className="font-bold text-white">Activity Feed</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Clock size={16} />
            <span>Last 24 hours</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="glass-panel border border-dark-border overflow-hidden">
          <div className="p-4 border-b border-dark-border bg-dark-bg/50">
            <h2 className="font-semibold text-white">Recent Activity</h2>
            <p className="text-sm text-text-muted">
              Track all changes across your projects
            </p>
          </div>

          <div className="divide-y divide-dark-border">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 hover:bg-dark-bg/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-dark-bg border border-dark-border flex items-center justify-center flex-shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-text-muted">{activity.action}</span>{" "}
                    <span className="font-medium text-accent">
                      {activity.target}
                    </span>
                    {activity.project && (
                      <>
                        <span className="text-text-muted"> in </span>
                        <span className="text-primary">{activity.project}</span>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="mt-6 text-center">
          <button className="px-6 py-2 text-sm font-medium text-text-muted border border-dark-border rounded-xl hover:bg-dark-card hover:text-white transition-colors">
            Load More Activity
          </button>
        </div>
      </main>
    </div>
  );
};

export default Activity;
