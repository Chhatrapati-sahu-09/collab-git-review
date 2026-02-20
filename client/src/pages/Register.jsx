import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Github, Chrome, Mail, Lock, User, ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, register } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, "contributor");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-dark-bg text-text-main p-6">
      {/* Background Orbs */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-pulse"></div>

      <div className="w-full max-w-4xl glass-panel flex flex-col md:flex-row overflow-hidden relative z-10 flex-row-reverse">
        {/* Left Side (Visually Right): Brand/Illustration */}
        <div className="md:w-5/12 hidden md:flex flex-col justify-between p-10 bg-gradient-to-bl from-dark-bg to-dark-card border-l border-dark-border relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMGYxNzJhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMzM0MTU1IiBzdHJva2Utd2lkdGg9IjAuNSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-end mb-8">
              <img src={logo} alt="SyncForge" className="h-16" />
            </div>
            <h2 className="text-3xl font-bold leading-tight text-white mb-4 text-right">
              Start collaborating without conflicts.
            </h2>
            <p className="text-text-muted text-sm leading-relaxed text-right">
              Join thousands of developers using CRDTs to build distributed
              software at the speed of thought.
            </p>
          </div>
        </div>

        {/* Right Side (Visually Left): Form */}
        <div className="md:w-7/12 p-8 md:p-12 bg-dark-card/50">
          <h2 className="text-2xl font-bold text-white mb-2">
            Create an Account
          </h2>
          <p className="text-text-muted text-sm mb-8">
            Set up your profile to start reviewing code.
          </p>

          {error && (
            <div className="p-3 mb-6 text-sm text-error bg-error/10 border border-error/20 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="register-name"
                className="block mb-1.5 text-sm font-medium text-text-muted"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-text-muted/50" />
                </div>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Chhatrapati Sahu"
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-dark-border text-text-main rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="block mb-1.5 text-sm font-medium text-text-muted"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-muted/50" />
                </div>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-dark-border text-text-main rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="block mb-1.5 text-sm font-medium text-text-muted"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-muted/50" />
                </div>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-dark-border text-text-main rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <p className="mt-2 text-xs text-text-muted/60">
                Must be at least 8 characters.
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold text-dark-bg bg-accent rounded-xl hover:opacity-90 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              Sign Up <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-card text-text-muted">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex justify-center items-center gap-2 w-full px-4 py-2.5 border border-dark-border rounded-xl hover:bg-dark-border/50 transition-colors text-sm font-medium text-text-main">
                <Github className="w-5 h-5" /> GitHub
              </button>
              <button className="flex justify-center items-center gap-2 w-full px-4 py-2.5 border border-dark-border rounded-xl hover:bg-dark-border/50 transition-colors text-sm font-medium text-text-main">
                <Chrome className="w-5 h-5" /> Google
              </button>
            </div>
          </div>

          <p className="mt-8 text-sm text-center text-text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-accent hover:text-white transition-colors font-medium"
            >
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
