import { X, Clock, RotateCcw, Eye, GitCommit } from "lucide-react";

// Mock data to visualize the UI before we wire up the Automerge history extraction
const mockHistory = [
  {
    id: "v4",
    user: "Chhatrapati Sahu",
    time: "Just now",
    summary: "Added WebSocket listeners",
    current: true,
  },
  {
    id: "v3",
    user: "Alex Team",
    time: "2 hours ago",
    summary: "Updated CodeMirror theme",
    current: false,
  },
  {
    id: "v2",
    user: "Chhatrapati Sahu",
    time: "Yesterday, 4:30 PM",
    summary: "Initial CRDT setup",
    current: false,
  },
  {
    id: "v1",
    user: "System",
    time: "Yesterday, 10:00 AM",
    summary: "Document created",
    current: false,
  },
];

const VersionHistoryPanel = ({ isOpen, onClose, onRestore }) => {
  return (
    <>
      {/* Backdrop for when the drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-dark-bg/40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-in Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-dark-card border-l border-dark-border shadow-[0_0_40px_rgba(0,0,0,0.5)] z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border bg-dark-bg/50">
          <div>
            <h2 className="text-lg font-bold text-white">Version History</h2>
            <p className="text-xs text-text-muted">
              Track and restore past states.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-white hover:bg-dark-border rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="relative border-l-2 border-dark-border ml-3 space-y-8 pb-10">
            {mockHistory.map((version) => (
              <div key={version.id} className="relative pl-6 group">
                {/* Timeline Node */}
                <div
                  className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-dark-card flex items-center justify-center ${version.current ? "bg-primary" : "bg-dark-border group-hover:bg-accent transition-colors"}`}
                >
                  {version.current && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  )}
                </div>

                {/* Content Card */}
                <div
                  className={`p-4 rounded-xl border transition-all ${version.current ? "bg-primary/5 border-primary/30" : "bg-dark-bg/50 border-dark-border hover:border-dark-border/80"}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-[10px] font-bold text-white shadow-glow">
                        {version.user.charAt(0)}
                      </div>
                      <span
                        className={`text-sm font-semibold ${version.current ? "text-primary" : "text-text-main"}`}
                      >
                        {version.user}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-text-muted flex items-center gap-1">
                      <Clock size={10} /> {version.time}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-text-muted flex items-center gap-2">
                      <GitCommit size={14} className="opacity-50" />
                      {version.summary}
                    </p>
                  </div>

                  {/* Actions (Hide for current version) */}
                  {!version.current && (
                    <div className="flex gap-2 pt-3 border-t border-dark-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-white bg-dark-border rounded-lg hover:bg-dark-border/80 transition-colors">
                        <Eye size={14} /> Preview Diff
                      </button>
                      <button
                        onClick={() => onRestore(version.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primaryHover hover:shadow-glow transition-all active:scale-95"
                      >
                        <RotateCcw size={14} /> Restore
                      </button>
                    </div>
                  )}

                  {version.current && (
                    <div className="pt-2">
                      <span className="inline-block px-2 py-1 text-[10px] font-semibold tracking-wider text-primary bg-primary/10 rounded uppercase">
                        Current Version
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VersionHistoryPanel;
