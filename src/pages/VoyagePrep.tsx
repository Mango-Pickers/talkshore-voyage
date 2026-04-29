import { useState } from "react";
import { CheckCircle2, Clock, Calendar, X } from "lucide-react";
import { lessons, sessions } from "@/data/mockData";

const VoyagePrep = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = lessons.find((l) => l.id === openId);
  const openSession = open?.prepares_for ? sessions.find((s) => s.id === open.prepares_for) : null;

  const statusBadge = (l: any) => {
    if (l.status === "complete") return <span className="text-xs text-accent flex items-center gap-1"><CheckCircle2 size={14} /> Completed</span>;
    if (l.status === "ready") return <span className="text-xs text-accent">Session Ready</span>;
    if (l.status === "in_progress") return (
      <div className="w-32">
        <div className="text-xs text-primary mb-1">In Progress · {l.progress}%</div>
        <div className="h-1 bg-surface-2 rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: `${l.progress}%` }} /></div>
      </div>
    );
    if (l.status === "scheduled") return <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={12} /> Boards {l.scheduled_for}</span>;
    return <span className="text-xs text-muted-foreground italic">Resting in port</span>;
  };

  const dotColor = (status: string) => {
    if (status === "complete") return "bg-accent";
    if (status === "ready" || status === "in_progress") return "bg-primary";
    return "bg-surface-2";
  };

  return (
    <div className="animate-fade-in">
      <h1 className="font-serif text-4xl mb-1">Voyage Prep</h1>
      <p className="text-muted-foreground mb-8">Your itinerary for real-world conversations.</p>

      <div className="relative pl-8">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-surface-2" />
        {lessons.map((l) => {
          const interactive = l.status === "in_progress" || l.status === "ready" || l.status === "complete";
          return (
            <div key={l.id} className="relative mb-4">
              <div className={`absolute -left-[22px] top-5 w-3 h-3 rounded-full ${dotColor(l.status)} ring-4 ring-background`} />
              <button
                disabled={!interactive}
                onClick={() => setOpenId(l.id)}
                className={`ts-card w-full text-left p-5 transition ${interactive ? "ts-hover cursor-pointer" : "opacity-60 cursor-not-allowed"}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-serif text-xl">{l.scenario}</h3>
                  {statusBadge(l)}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> {l.duration_min} min</span>
                  {l.prepares_for && <span>· prepares for an upcoming shore</span>}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Lesson modal */}
      {open && (
        <div onClick={() => setOpenId(null)} className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in p-4">
          <div onClick={(e) => e.stopPropagation()} className="ts-card w-full max-w-lg p-6 animate-slide-up">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs text-accent mb-1">Voyage Prep</div>
                <h3 className="font-serif text-2xl">{open.scenario}</h3>
              </div>
              <button onClick={() => setOpenId(null)} className="text-muted-foreground hover:text-foreground"><X /></button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{open.description}</p>
            {openSession && (
              <p className="text-xs text-muted-foreground mb-4">Prepares you for: <span className="text-foreground">{openSession.scenario}</span></p>
            )}
            <div className="space-y-2 mb-5">
              {open.topics.map((t: string, i: number) => (
                <div key={t} className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-surface-2 flex items-center justify-center text-xs">{i + 1}</span>
                  {t}
                </div>
              ))}
            </div>
            <button className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-full hover:opacity-90 transition">
              Continue Prep
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoyagePrep;
