import { useState, useEffect } from "react";
import { Bell, Anchor, Users } from "lucide-react";
import { getSessions } from "@/api/sessions";
import { bookSession, hasBooking } from "@/api/bookings";
import { useApp } from "@/context/AppContext";
import SessionModal from "@/components/SessionModal";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

// TEMP (until lessons API is connected)
import { lessons } from "@/data/mockData";

/* ================= TYPES ================= */

type Guide = {
  name: string;
  initials: string;
};

type Language = {
  code: string;
  name: string;
};

type Scenario = {
  title: string;
};

type Session = {
  id: string;
  status: string;
  level: string;
  participants: number;

  guides: Guide[];
  languages: Language[];
  scenarios: Scenario[];
};

/* ================= COMPONENT ================= */

const Home = () => {
  const { profile, activeLanguage } = useApp();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [openSession, setOpenSession] = useState<string | null>(null);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await getSessions();
        setSessions(data || []);
      } catch (error) {
        console.error("Failed to load sessions:", error);
      }
    };

    loadSessions();
  }, []);

  /* ================= BOOKINGS ================= */

  const handleBoard = async (sessionId: string) => {
    try {
      const booked = await hasBooking(sessionId);

      if (!booked) {
        await bookSession(sessionId);
      }

      setOpenSession(sessionId);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Could not join session.");
    }
  };

  /* ================= DERIVED ================= */

  const liveSessions = sessions.filter(
    (s) => s.status === "live"
  );

  const nextLesson =
    lessons.find((l) => l.status === "in_progress") ||
    lessons.find((l) => l.status === "ready");

  const nextSession = nextLesson
    ? sessions.find((s) => s.id === nextLesson.prepares_for)
    : null;

  const activeLang =
    profile?.active_languages?.find(
      (l) => l.code === activeLanguage
    ) || profile?.active_languages?.[0];

  /* ================= UI ================= */

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

          <div className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center text-sm font-medium">
            {profile?.avatar_initials}
          </div>
        </div>
      </div>

      {/* Greeting */}
      <h1 className="font-serif text-4xl mb-1">
        Good evening, {profile?.name}
      </h1>

      <p className="text-muted-foreground mb-6">
        Your next shore boards soon.
      </p>

      {/* Voyage card */}
      <div className="ts-card p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {activeLang?.flag}
            </span>

            <span className="font-medium">
              {activeLang?.name}
            </span>
          </div>

          <span className="text-xs bg-accent/10 px-2 py-1 rounded-full">
            {activeLang?.level}
          </span>
        </div>
      </div>

      {/* Boarding Now */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-serif text-2xl">
          Boarding Now
        </h2>

        <Link
          to="/app/shore"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          All shores
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
        {liveSessions.map((s) => {
          const guide = s.guides?.[0];
          const language = s.languages?.[0];
          const scenario = s.scenarios?.[0];

          return (
            <div
              key={s.id}
              className="ts-card p-4 min-w-[260px]"
            >
              {/* Guide */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-xs">
                  {guide?.initials}
                </div>

                <div className="flex items-center gap-1 text-sm">
                  {guide?.name}

                  <Anchor
                    size={12}
                    className="text-primary"
                  />
                </div>
              </div>

              {/* Language */}
              <div className="text-xs text-muted-foreground mb-1">
                {language?.code?.toUpperCase()} · {s.level}
              </div>

              {/* Scenario */}
              <p className="font-medium mb-3">
                {scenario?.title}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-xs flex items-center gap-1">
                  <Users size={12} />
                  {s.participants}
                </span>

                <button
                  onClick={() => handleBoard(s.id)}
                  className="bg-primary text-primary-foreground text-sm px-4 py-1.5 rounded-full hover:opacity-90 transition"
                >
                  Board
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Port */}
      {nextLesson && (
        <>
          <h2 className="font-serif text-2xl mb-3">
            Your Next Port
          </h2>

          <div className="ts-card p-5 mb-8">
            <h3 className="font-serif text-xl mb-1">
              {nextLesson.scenario}
            </h3>

            <p className="text-sm text-muted-foreground mb-4">
              {nextLesson.duration_min} min · prepares you for{" "}
              <span className="text-foreground">
                {nextSession?.scenarios?.[0]?.title ||
                  "an upcoming shore"}
              </span>
            </p>

            <Link
              to="/app/prep"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm"
            >
              Start Preparation
            </Link>
          </div>
        </>
      )}

      {/* Session Modal */}
      <SessionModal
        sessionId={openSession}
        onClose={() => setOpenSession(null)}
      />
    </div>
  );
};

export default Home;