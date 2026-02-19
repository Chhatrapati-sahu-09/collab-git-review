import { Link } from "react-router-dom";
import { Code2, Zap, GitMerge, Shield, Users, Terminal } from "lucide-react";

const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-dark-bg text-text-main">
      {/* Subtle Animated Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Glowing Orbs for background ambiance */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
      <div
        className="absolute top-[20%] right-[-10%] w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between max-w-7xl px-6 py-6 mx-auto">
        <div className="flex items-center gap-2">
          <Terminal className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">SyncCode</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-sm font-medium transition-colors text-text-muted hover:text-text-main"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 text-sm font-semibold text-white transition-all rounded-xl bg-primary hover:bg-primaryHover hover:shadow-glow active:scale-95"
          >
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center px-6 pt-32 pb-24 mx-auto text-center max-w-7xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border rounded-full border-dark-border bg-dark-card/50 backdrop-blur-sm">
          <span className="flex w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span className="text-sm text-text-muted">
            Powered by CRDT Architecture
          </span>
        </div>

        <h1 className="max-w-4xl mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
          Collaborate on Code. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            In Real-Time.
          </span>
        </h1>

        <p className="max-w-2xl mb-10 text-lg leading-relaxed text-text-muted">
          Build faster together. An advanced conflict-free replicated data type
          engine ensures your code merges perfectly—every keystroke, every time.
          No locking, no conflicts.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/register"
            className="px-8 py-4 text-lg font-semibold text-white transition-all rounded-xl bg-primary hover:bg-primaryHover hover:shadow-glow active:scale-95"
          >
            Start Reviewing Free
          </Link>
          <a
            href="#features"
            className="px-8 py-4 text-lg font-semibold transition-all border glass-panel text-text-main hover:bg-dark-border"
          >
            View Demo
          </a>
        </div>

        {/* Abstract Mockup Area */}
        <div className="w-full max-w-5xl mt-24 border glass-panel h-96 relative overflow-hidden group">
          {/* Fake Editor Header */}
          <div className="flex items-center px-4 py-3 border-b border-dark-border bg-dark-bg/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-success"></div>
            </div>
            <div className="mx-auto text-sm font-mono text-text-muted">
              server.js — SyncCode
            </div>
          </div>
          {/* Fake Code Lines */}
          <div className="p-6 font-mono text-sm text-left text-text-muted">
            <p>
              <span className="text-primary">import</span> &#123; Server &#125;{" "}
              <span className="text-primary">from</span>{" "}
              <span className="text-accent">'socket.io'</span>;
            </p>
            <p className="mt-2">
              <span className="text-primary">const</span> io ={" "}
              <span className="text-primary">new</span> Server(server);
            </p>
            <p className="mt-6">// Active user typing simulation...</p>
            <div className="flex items-center mt-2">
              <span className="text-accent">io</span>.
              <span className="text-blue-400">on</span>(
              <span className="text-accent">'connection'</span>, (socket) =&gt;
              &#123;
              <span className="w-2 h-5 ml-1 bg-primary animate-pulse inline-block"></span>
            </div>
          </div>
        </div>
      </main>

      {/* Feature Grid */}
      <section
        id="features"
        className="relative z-10 px-6 py-24 mx-auto max-w-7xl"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<GitMerge className="w-6 h-6 text-accent" />}
            title="CRDT Sync"
            desc="Advanced conflict-free merging guarantees your edits never overwrite a teammate's work."
          />
          <FeatureCard
            icon={<Users className="w-6 h-6 text-primary" />}
            title="Live Presence"
            desc="See exactly where your team is typing with multi-colored cursors and selection highlights."
          />
          <FeatureCard
            icon={<Code2 className="w-6 h-6 text-success" />}
            title="Inline Reviews"
            desc="Attach threaded discussions to specific lines of code for precise, actionable feedback."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-amber-400" />}
            title="Optimistic UI"
            desc="Zero latency typing. Local changes are applied instantly and synced via WebSockets in the background."
          />
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 text-center border-t border-dark-border text-text-muted">
        <p>© 2026 SyncCode Platform. Engineered for high performance.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-6 transition-all duration-300 glass-panel hover:-translate-y-1 hover:shadow-card hover:border-primary/50">
    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-dark-bg border border-dark-border">
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-semibold text-text-main">{title}</h3>
    <p className="text-sm leading-relaxed text-text-muted">{desc}</p>
  </div>
);

export default Landing;
