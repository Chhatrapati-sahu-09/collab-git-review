import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  Camera,
  ArrowLeft,
  Activity,
  FolderKanban,
} from "lucide-react";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  // Mock state for forms
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSaving, setIsSaving] = useState(false);

  // Update form values when user loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user && name === "" && email === "") {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000); // Mock save delay
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
    <div className="min-h-screen bg-dark-bg text-text-main p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 text-text-muted hover:text-white bg-dark-card border border-dark-border rounded-xl transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Account Settings</h1>
            <p className="text-sm text-text-muted">
              Manage your profile and security preferences.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Stats */}
          <div className="col-span-1 space-y-6">
            <div className="glass-panel p-6 flex flex-col items-center text-center border border-dark-border">
              <div className="relative group mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-accent p-1">
                  <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center text-3xl font-bold text-white">
                    {name.charAt(0)}
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-dark-bg border border-dark-border rounded-full text-text-muted hover:text-white hover:border-primary transition-colors group-hover:scale-110">
                  <Camera size={14} />
                </button>
              </div>
              <h2 className="text-xl font-bold text-white">{name}</h2>
              <p className="text-sm text-text-muted capitalize mb-4 flex items-center gap-1 justify-center">
                <Shield size={14} className="text-accent" />{" "}
                {user?.role || "Contributor"}
              </p>
            </div>

            <div className="glass-panel p-6 border border-dark-border">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
                Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-text-main">
                    <FolderKanban size={16} className="text-primary" /> Projects
                  </div>
                  <span className="font-mono text-sm">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-text-main">
                    <Activity size={16} className="text-success" /> Commits
                  </div>
                  <span className="font-mono text-sm">348</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings Forms */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="glass-panel p-6 border border-dark-border">
              <h3 className="text-lg font-bold text-white mb-6">
                Personal Information
              </h3>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="profile-name"
                      className="block text-sm font-medium text-text-muted mb-1.5"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
                      <input
                        id="profile-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-xl focus:outline-none focus:border-primary text-sm text-white transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="profile-email"
                      className="block text-sm font-medium text-text-muted mb-1.5"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
                      <input
                        id="profile-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-xl focus:outline-none focus:border-primary text-sm text-white transition-colors"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className={`px-6 py-2 text-sm font-semibold text-white rounded-xl transition-all shadow-glow ${isSaving ? "bg-success" : "bg-primary hover:bg-primaryHover"}`}
                  >
                    {isSaving ? "Saved!" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
