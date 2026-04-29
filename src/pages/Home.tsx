import { useState } from "react";
import { Bell, CircleDot, Anchor, Mic, Compass, Users } from "lucide-react";
import { sessions, guides, lessons } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import SessionModal from "@/components/SessionModal";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

const Home = () => {
  const { profile, activeLanguage } = useApp();
  const [openSession, setOpenSession] = useState<string | null>(null);

  const liveSessions = sessions.filter((s) => s.status === "live");
  const nextLesson = lessons.find((l) => l.status === "in_progress") || lessons.find((l) => l.status === "ready");
  const nextSession = nextLesson ? sessions.find((s) => s.id === nextLesson.prepares_for) : null;
  const activeLang = profile.active_languages.find((l) => l.code === activeLanguage) || profile.active_languages[0];

  return (
    <div className="animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Logo />
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-muted-foreground hover:text-foreground">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
          </button>
          <div className="w-9 h-9 rounded-full bg-surface-2 border border-surface-2 flex items-center justify-center text-sm font-medium">
            {profile.avatar_initials}
          </div>
        </div>
      </div>

      {/* Greeting */}
      <h1 className="font-serif text-4xl mb-1">Good evening, {profile.name}.</h1>
      <p className="text-muted-foreground mb-6">Your next shore boards in 2 hours.</p>

      {/* Voyage card */}
      <div className="ts-card p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{activeLang.flag}</span>
            <span className="font-medium">{activeLang.name}</span>
          </div>
          <span className="text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full">{activeLang.level}</span>
        </div>
        <p className="text-sm mb-3">Leg 3 of 7 — Expressing Opinions</p>
        <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: "42%" }} />
        </div>
      </div>

      {/* Boarding now */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
          <h2 className="font-serif text-2xl">Boarding Now</h2>
        </div>
        <Link to="/app/shore" className="text-sm text-muted-foreground hover:text-foreground">All shores</Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 mb-8 snap-x">
        {liveSessions.map((s) => {
          const g = guides.find((x) => x.id === s.guide_id)!;
          return (
            <div key={s.id} className="ts-card p-4 min-w-[260px] snap-start ts-hover">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-xs font-medium">{g.initials}</div>
                <div className="flex items-center gap-1 text-sm">
                  {g.name} <Anchor size={12} className="text-primary" />
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-1">{s.language_code.toUpperCase()} · {s.level}</div>
              <p className="font-medium mb-3">{s.scenario}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users size={12} /> {s.participants} aboard
                </span>
                <button
                  onClick={() => setOpenSession(s.id)}
                  className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full hover:opacity-90 transition"
                >
                  Board
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next port */}
      {nextLesson && (
        <>
          <h2 className="font-serif text-2xl mb-3">Your Next Port</h2>
          <div className="ts-card p-5 mb-8">
            <div className="text-xs text-accent mb-1">Voyage Prep</div>
            <h3 className="font-serif text-xl mb-1">{nextLesson.scenario}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {nextLesson.duration_min} min · prepares you for{" "}
              <span className="text-foreground">{nextSession?.scenario || "an upcoming shore"}</span>
            </p>
            <Link
              to="/app/prep"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition"
            >
              Start Preparation
            </Link>
          </div>
        </>
      )}

      {/* Quick actions */}
      <h2 className="font-serif text-2xl mb-3">Quick actions</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { to: "/app/sail", icon: Mic, label: "Solo Sail" },
          { to: "/app/ports", icon: Compass, label: "Ports of Call" },
          { to: "/app/profile", icon: Anchor, label: "My Voyage" },
          { to: "/app/shore", icon: Users, label: "Guides" },
        ].map(({ to, icon: Icon, label }) => (
          <Link key={label} to={to} className="ts-card p-4 ts-hover flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center">
              <Icon size={18} className="text-primary" />
            </div>
            <span className="font-medium text-sm">{label}</span>
          </Link>
        ))}
      </div>

      <SessionModal sessionId={openSession} onClose={() => setOpenSession(null)} />
    </div>
  );
};

export default Home;
