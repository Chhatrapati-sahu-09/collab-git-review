import { Link } from "react-router-dom";
import {
  Code2,
  Zap,
  GitMerge,
  Shield,
  Users,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Star,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MessageSquare,
  Clock,
  Globe,
  Lock,
  Layers,
  ChevronDown,
  Play,
} from "lucide-react";
import { useState } from "react";

const Landing = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
      <div
        className="absolute bottom-[10%] left-[30%] w-72 h-72 bg-success rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-dark-border/50 bg-dark-bg/80 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-7xl px-6 py-4 mx-auto">
          <div className="flex items-center gap-2">
            <Terminal className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">SyncForge</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium transition-colors text-text-muted hover:text-text-main"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium transition-colors text-text-muted hover:text-text-main"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium transition-colors text-text-muted hover:text-text-main"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-sm font-medium transition-colors text-text-muted hover:text-text-main"
            >
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-4">
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center px-6 pt-24 pb-20 mx-auto text-center max-w-7xl">
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
            className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-all rounded-xl bg-primary hover:bg-primaryHover hover:shadow-glow active:scale-95"
          >
            Start Reviewing Free <ArrowRight size={20} />
          </Link>
          <a
            href="#demo"
            className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold transition-all border glass-panel text-text-main hover:bg-dark-border"
          >
            <Play size={20} /> Watch Demo
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-text-muted">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-success" />
            <span className="text-sm">SOC2 Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock size={20} className="text-primary" />
            <span className="text-sm">End-to-End Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={20} className="text-accent" />
            <span className="text-sm">99.9% Uptime SLA</span>
          </div>
        </div>

        {/* Abstract Mockup Area */}
        <div
          id="demo"
          className="w-full max-w-5xl mt-20 border glass-panel relative overflow-hidden group"
        >
          {/* Fake Editor Header */}
          <div className="flex items-center px-4 py-3 border-b border-dark-border bg-dark-bg/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-success"></div>
            </div>
            <div className="mx-auto text-sm font-mono text-text-muted">
              server.js — SyncForge
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-xs text-primary">
                C
              </div>
              <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-xs text-accent">
                D
              </div>
            </div>
          </div>
          {/* Fake Code Lines */}
          <div className="p-6 font-mono text-sm text-left text-text-muted h-80 overflow-hidden">
            <p>
              <span className="text-text-muted/50 mr-4">1</span>
              <span className="text-primary">import</span> &#123; Server &#125;{" "}
              <span className="text-primary">from</span>{" "}
              <span className="text-accent">'socket.io'</span>;
            </p>
            <p className="mt-2">
              <span className="text-text-muted/50 mr-4">2</span>
              <span className="text-primary">import</span> &#123; createServer
              &#125; <span className="text-primary">from</span>{" "}
              <span className="text-accent">'http'</span>;
            </p>
            <p className="mt-2">
              <span className="text-text-muted/50 mr-4">3</span>
            </p>
            <p className="mt-2">
              <span className="text-text-muted/50 mr-4">4</span>
              <span className="text-primary">const</span> server ={" "}
              <span className="text-blue-400">createServer</span>();
            </p>
            <p className="mt-2">
              <span className="text-text-muted/50 mr-4">5</span>
              <span className="text-primary">const</span> io ={" "}
              <span className="text-primary">new</span>{" "}
              <span className="text-blue-400">Server</span>(server);
            </p>
            <p className="mt-2">
              <span className="text-text-muted/50 mr-4">6</span>
            </p>
            <p className="mt-2 bg-primary/10 -mx-6 px-6 py-1 border-l-2 border-primary">
              <span className="text-text-muted/50 mr-4">7</span>
              <span className="text-green-400">
                // Real-time collaboration handler
              </span>
            </p>
            <p className="mt-2">
              <span className="text-text-muted/50 mr-4">8</span>
              <span className="text-accent">io</span>.
              <span className="text-blue-400">on</span>(
              <span className="text-accent">'connection'</span>, (socket) =&gt;
              &#123;
              <span className="w-2 h-5 ml-1 bg-primary animate-pulse inline-block"></span>
            </p>
            <p className="mt-2">
              <span className="text-text-muted/50 mr-4">9</span>
              {"  "}console.<span className="text-blue-400">log</span>(
              <span className="text-accent">'User connected'</span>);
            </p>
            <p className="mt-2">
              <span className="text-text-muted/50 mr-4">10</span>&#125;);
            </p>
          </div>
          {/* Comment Overlay */}
          <div className="absolute right-4 top-32 w-64 glass-panel border border-dark-border p-3 text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs text-accent">
                D
              </div>
              <span className="text-sm font-medium text-white">Dev Team</span>
              <span className="text-xs text-text-muted ml-auto">2m ago</span>
            </div>
            <p className="text-sm text-text-muted">
              Great implementation! Should we add error handling here?
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 border-y border-dark-border bg-dark-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="50K+" label="Active Developers" />
            <StatItem value="2M+" label="Code Reviews" />
            <StatItem value="99.9%" label="Uptime" />
            <StatItem value="<50ms" label="Sync Latency" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 px-6 py-24 mx-auto max-w-7xl"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              seamless collaboration
            </span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Built for modern development teams who demand speed, reliability,
            and powerful collaboration tools.
          </p>
        </div>

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
            desc="Zero latency typing. Local changes are applied instantly and synced via WebSockets."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-error" />}
            title="Enterprise Security"
            desc="End-to-end encryption, SSO integration, and role-based access control for your team."
          />
          <FeatureCard
            icon={<Clock className="w-6 h-6 text-blue-400" />}
            title="Version History"
            desc="Travel back in time. Every change is tracked, allowing easy rollbacks and comparisons."
          />
          <FeatureCard
            icon={<Layers className="w-6 h-6 text-purple-400" />}
            title="Multi-Language"
            desc="Syntax highlighting for 100+ languages with intelligent code completion support."
          />
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6 text-pink-400" />}
            title="Team Chat"
            desc="Built-in communication channels to discuss code without leaving the editor."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative z-10 px-6 py-24 bg-dark-card/30 border-y border-dark-border"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get started in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-success">
                3 simple steps
              </span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              From sign-up to your first collaborative code review in under 5
              minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Create Your Workspace"
              desc="Sign up for free and create your first project. Invite team members with a simple link."
              icon={<Users className="w-8 h-8" />}
            />
            <StepCard
              number="02"
              title="Upload or Write Code"
              desc="Import existing files or start coding directly in our powerful cloud editor with full syntax support."
              icon={<Code2 className="w-8 h-8" />}
            />
            <StepCard
              number="03"
              title="Collaborate & Review"
              desc="Code together in real-time. Add inline comments, resolve discussions, and ship faster."
              icon={<MessageSquare className="w-8 h-8" />}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-6 py-24 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              developers worldwide
            </span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            See what engineering teams are saying about SyncForge.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard
            quote="SyncForge has transformed our code review process. The real-time collaboration is a game-changer for our remote team."
            author="Sarah Chen"
            role="Engineering Lead, TechCorp"
            avatar="S"
          />
          <TestimonialCard
            quote="The CRDT-based sync is incredible. No more merge conflicts when pair programming. It just works."
            author="Marcus Johnson"
            role="Senior Developer, StartupXYZ"
            avatar="M"
          />
          <TestimonialCard
            quote="We reduced our code review cycle time by 60%. The inline commenting feature is exactly what we needed."
            author="Priya Sharma"
            role="Tech Lead, InnovateLabs"
            avatar="P"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="relative z-10 px-6 py-24 bg-dark-card/30 border-y border-dark-border"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-success to-accent">
                transparent pricing
              </span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Starter"
              price="Free"
              period="forever"
              desc="Perfect for individual developers and small projects."
              features={[
                "Up to 3 projects",
                "Real-time collaboration",
                "Basic code review",
                "Community support",
              ]}
              buttonText="Get Started"
              buttonLink="/register"
            />
            <PricingCard
              name="Pro"
              price="$12"
              period="per user/month"
              desc="For growing teams that need more power and control."
              features={[
                "Unlimited projects",
                "Priority sync servers",
                "Advanced permissions",
                "Version history (30 days)",
                "Priority support",
              ]}
              buttonText="Start Free Trial"
              buttonLink="/register"
              popular
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              period="contact sales"
              desc="For organizations with advanced security and compliance needs."
              features={[
                "Everything in Pro",
                "SSO/SAML integration",
                "Audit logs",
                "Custom contracts",
                "Dedicated support",
                "On-premise option",
              ]}
              buttonText="Contact Sales"
              buttonLink="/register"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 px-6 py-24 mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Questions
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          <FaqItem
            question="What is CRDT and why does it matter?"
            answer="CRDT (Conflict-free Replicated Data Type) is a data structure that enables multiple users to edit the same document simultaneously without conflicts. Unlike traditional locking mechanisms, CRDT mathematically guarantees that all edits will merge correctly, no matter the order they arrive."
            isOpen={openFaq === 0}
            onClick={() => toggleFaq(0)}
          />
          <FaqItem
            question="Can I use SyncForge offline?"
            answer="Yes! SyncForge works offline using local storage. Your changes will automatically sync when you reconnect to the internet. The CRDT engine ensures your offline edits merge seamlessly with any changes made by teammates."
            isOpen={openFaq === 1}
            onClick={() => toggleFaq(1)}
          />
          <FaqItem
            question="Is my code secure?"
            answer="Absolutely. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We're SOC2 Type II compliant, and Enterprise plans include additional security features like SSO, audit logs, and on-premise deployment options."
            isOpen={openFaq === 2}
            onClick={() => toggleFaq(2)}
          />
          <FaqItem
            question="How many team members can collaborate at once?"
            answer="There's no hard limit! Our infrastructure is built to handle large teams. We've tested with 50+ simultaneous editors on a single document with no performance degradation."
            isOpen={openFaq === 3}
            onClick={() => toggleFaq(3)}
          />
          <FaqItem
            question="Can I integrate SyncForge with my existing tools?"
            answer="Yes, we offer integrations with GitHub, GitLab, Bitbucket, Slack, and Jira. Enterprise plans include API access for custom integrations with your internal tools."
            isOpen={openFaq === 4}
            onClick={() => toggleFaq(4)}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto text-center glass-panel border border-dark-border p-12 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to transform your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              code review workflow?
            </span>
          </h2>
          <p className="text-text-muted mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are shipping better code faster
            with SyncForge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-all rounded-xl bg-primary hover:bg-primaryHover hover:shadow-glow active:scale-95"
            >
              Start Free Today <ArrowRight size={20} />
            </Link>
            <a
              href="mailto:contact@syncforge.dev"
              className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold transition-all border border-dark-border rounded-xl text-text-main hover:bg-dark-border"
            >
              <Mail size={20} /> Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-dark-border bg-dark-card/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold tracking-tight">
                  SyncForge
                </span>
              </div>
              <p className="text-text-muted text-sm mb-6 max-w-xs">
                The modern platform for real-time collaborative code review.
                Built by developers, for developers.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center text-text-muted hover:text-white hover:border-primary transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center text-text-muted hover:text-white hover:border-primary transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center text-text-muted hover:text-white hover:border-primary transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Changelog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-dark-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-muted">
              © 2026 SyncForge Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-text-muted">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sub-components
const StatItem = ({ value, label }) => (
  <div className="text-center">
    <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
      {value}
    </p>
    <p className="text-text-muted text-sm mt-1">{label}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-6 transition-all duration-300 glass-panel hover:-translate-y-1 hover:shadow-card hover:border-primary/50">
    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-dark-bg border border-dark-border">
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-semibold text-text-main">{title}</h3>
    <p className="text-sm leading-relaxed text-text-muted">{desc}</p>
  </div>
);

const StepCard = ({ number, title, desc, icon }) => (
  <div className="relative p-8 glass-panel border border-dark-border text-center">
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-bold rounded-full">
      {number}
    </div>
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6 text-primary">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-text-muted text-sm">{desc}</p>
  </div>
);

const TestimonialCard = ({ quote, author, role, avatar }) => (
  <div className="p-6 glass-panel border border-dark-border">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
    <p className="text-text-muted mb-6 text-sm leading-relaxed">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
        {avatar}
      </div>
      <div>
        <p className="font-medium text-white text-sm">{author}</p>
        <p className="text-text-muted text-xs">{role}</p>
      </div>
    </div>
  </div>
);

const PricingCard = ({
  name,
  price,
  period,
  desc,
  features,
  buttonText,
  buttonLink,
  popular,
}) => (
  <div
    className={`p-8 glass-panel border ${popular ? "border-primary relative" : "border-dark-border"}`}
  >
    {popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full">
        MOST POPULAR
      </div>
    )}
    <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
    <div className="mb-4">
      <span className="text-4xl font-bold text-white">{price}</span>
      <span className="text-text-muted text-sm ml-2">{period}</span>
    </div>
    <p className="text-text-muted text-sm mb-6">{desc}</p>
    <ul className="space-y-3 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
          <CheckCircle2 size={16} className="text-success flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
    <Link
      to={buttonLink}
      className={`block w-full py-3 text-center font-semibold rounded-xl transition-all ${
        popular
          ? "bg-primary text-white hover:bg-primaryHover hover:shadow-glow"
          : "border border-dark-border text-text-main hover:bg-dark-border"
      }`}
    >
      {buttonText}
    </Link>
  </div>
);

const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="glass-panel border border-dark-border overflow-hidden">
    <button
      onClick={onClick}
      className="w-full px-6 py-4 flex items-center justify-between text-left"
    >
      <span className="font-medium text-white">{question}</span>
      <ChevronDown
        size={20}
        className={`text-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    {isOpen && (
      <div className="px-6 pb-4">
        <p className="text-text-muted text-sm leading-relaxed">{answer}</p>
      </div>
    )}
  </div>
);

export default Landing;
