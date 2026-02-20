import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Terminal, Github, Chrome, Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-dark-bg text-text-main p-6">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-pulse"></div>

      <div className="w-full max-w-4xl glass-panel flex flex-col md:flex-row overflow-hidden relative z-10">
        {/* Left Side: Brand/Illustration */}
        <div className="md:w-5/12 hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-dark-bg to-dark-card border-r border-dark-border relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMGYxNzJhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMzM0MTU1IiBzdHJva2Utd2lkdGg9IjAuNSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8 text-primary">
              <Terminal className="w-8 h-8" />
              <span className="text-xl font-bold tracking-tight text-text-main">
                SyncForge
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-white mb-4">
              Welcome back to the future of code review.
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Log in to continue building, syncing, and shipping conflict-free
              code in real-time.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-8 md:p-12 bg-dark-card/50">
          <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
          <p className="text-text-muted text-sm mb-8">
            Enter your credentials to access your workspace.
          </p>

          {error && (
            <div className="p-3 mb-6 text-sm text-error bg-error/10 border border-error/20 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="block mb-1.5 text-sm font-medium text-text-muted"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-muted/50" />
                </div>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-dark-border text-text-main rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-text-muted"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-primary hover:text-primaryHover transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-muted/50" />
                </div>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-dark-border text-text-main rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="w-4 h-4 rounded border-dark-border bg-dark-bg text-primary focus:ring-primary focus:ring-offset-dark-bg"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-text-muted"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white bg-primary rounded-xl hover:bg-primaryHover hover:shadow-glow transition-all active:scale-[0.98]"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-card text-text-muted">
                  Or continue with
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
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
