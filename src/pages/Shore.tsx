import { useState } from "react";
import { ShieldCheck, Users, BellRing, Anchor } from "lucide-react";
import { sessions, guides, languages } from "@/data/mockData";
import SessionModal from "@/components/SessionModal";

const Shore = () => {
  const [filter, setFilter] = useState<string>("all");
  const [openSession, setOpenSession] = useState<string | null>(null);

  const filtered = sessions.filter((s) => filter === "all" || s.language_code === filter);
  const liveCount = sessions.filter((s) => s.status === "live").length;

  return (
    <div className="animate-fade-in">
      <h1 className="font-serif text-4xl mb-1">Live Shores</h1>
      <p className="text-accent text-sm mb-5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent pulse-dot" /> 61 live right now
      </p>

      <div className="ts-card p-3 flex items-center gap-2 text-xs text-muted-foreground mb-5">
        <ShieldCheck size={16} className="text-accent shrink-0" />
        All shores are AI-monitored. No external links. No contact sharing.
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {[{ code: "all", name: "All", flag: "" }, ...languages.slice(0, 4)].map((l: any) => {
          const active = filter === l.code;
          return (
            <button
              key={l.code}
              onClick={() => setFilter(l.code)}
              className={`px-4 py-1.5 rounded-full text-sm border whitespace-nowrap transition ${
                active ? "bg-primary text-primary-foreground border-primary" : "border-surface-2 text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.flag} {l.name}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.map((s) => {
          const g = guides.find((x) => x.id === s.guide_id)!;
          const isLive = s.status === "live";
          return (
            <div key={s.id} className="ts-card p-5 ts-hover">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center font-medium">{g.initials}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-medium">{g.name}</span>
                    <Anchor size={12} className="text-primary" />
                  </div>
                  <div className="text-xs text-muted-foreground">{s.language_code.toUpperCase()} · {s.level}</div>
                </div>
                {isLive ? (
                  <span className="flex items-center gap-1 text-xs text-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" /> Live
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">{s.starts_at}</span>
                )}
              </div>
              <h3 className="font-serif text-xl mb-2">{s.scenario}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users size={12} /> {s.participants} aboard
                </span>
              </div>
              <div className="mt-4">
                {isLive ? (
                  <button
                    onClick={() => setOpenSession(s.id)}
                    className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-full hover:opacity-90 transition"
                  >
                    Board This Shore
                  </button>
                ) : (
                  <button className="w-full border border-surface-2 text-foreground font-medium py-3 rounded-full hover:bg-surface transition inline-flex items-center justify-center gap-2">
                    <BellRing size={16} /> Set Reminder
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <SessionModal sessionId={openSession} onClose={() => setOpenSession(null)} />
    </div>
  );
};

export default Shore;
