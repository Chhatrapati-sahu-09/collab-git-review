import { Link } from "react-router-dom";
import { Home, Terminal } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-bg text-text-main relative overflow-hidden">
      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          animation: "pan 20s linear infinite",
        }}
      ></div>
      <style>{`@keyframes pan { 0% { background-position: 0 0; } 100% { background-position: 40px 40px; } }`}</style>

      {/* Glowing Orbs */}
      <div className="absolute w-[600px] h-[600px] bg-primary rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center text-center p-8 max-w-lg">
        <Terminal className="w-16 h-16 text-primary mb-6 opacity-80" />

        <h1 className="text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-dark-border drop-shadow-lg mb-4">
          404
        </h1>

        <h2 className="text-2xl font-bold text-white mb-2">Page not found</h2>
        <p className="text-text-muted mb-8 leading-relaxed">
          The code you're looking for doesn't exist. It might have been deleted,
          moved, or you just mistyped the URL.
        </p>

        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-dark-card border border-dark-border rounded-xl hover:border-primary hover:text-primary transition-all group"
        >
          <Home
            size={18}
            className="group-hover:-translate-y-0.5 transition-transform"
          />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
