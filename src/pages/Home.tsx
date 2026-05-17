import {
  useState,
  useEffect,
} from "react";

import {
  Bell,
  Users,
  Radio,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  getSessions,
} from "@/api/sessions";

import {
  bookSession,
  hasBooking,
} from "@/api/bookings";

import { useApp } from "@/hooks/useApp";

import SessionModal from "@/components/SessionModal";

import Logo from "@/components/Logo";

import { lessons } from "@/data/mockData";

/* ================= TYPES ================= */

type Session = {
  id: string;

  title?: string;

  status: string;

  level: string;

  participants: number;

  max_participants: number;

  starts_at: string;

  room_url?: string;
};

/* ================= COMPONENT ================= */

const Home = () => {
  const {
    profile,
    user,
    activeLanguage,
  } = useApp();

  const [sessions, setSessions] =
    useState<Session[]>([]);

  const [
    openSession,
    setOpenSession,
  ] = useState<string | null>(
    null
  );

  /* ================= LOAD SESSIONS ================= */

  useEffect(() => {
    const loadSessions =
      async () => {
        try {
          const data =
            await getSessions();

          setSessions(data || []);
        } catch (error) {
          console.error(
            "Failed to load sessions:",
            error
          );
        }
      };

    loadSessions();
  }, []);

  /* ================= BOOK SESSION ================= */

  const handleBoard =
    async (
      sessionId: string
    ) => {
      try {
        const booked =
          await hasBooking(
            sessionId
          );

        if (!booked) {
          await bookSession(
            sessionId
          );
        }

        setOpenSession(
          sessionId
        );
      } catch (error) {
        console.error(
          "Booking error:",
          error
        );

        alert(
          "Could not join session."
        );
      }
    };

  /* ================= DERIVED ================= */

  const liveSessions =
    sessions.filter(
      (session) =>
        session.status ===
          "live" ||
        session.status ===
          "upcoming"
    );

  const nextLesson =
    lessons.find(
      (lesson) =>
        lesson.status ===
        "in_progress"
    ) ||
    lessons.find(
      (lesson) =>
        lesson.status ===
        "ready"
    );

  /* ================= USER DISPLAY ================= */

  const firstName =
    profile?.full_name
      ?.split(" ")[0] ||
    user?.user_metadata
      ?.full_name
      ?.split(" ")[0] ||
    "Voyager";

  const userInitial =
    firstName.charAt(0);

  /* ================= UI ================= */

  return (
    <div className="animate-fade-in">
      {/* ================= TOP BAR ================= */}

      <div className="flex items-center justify-between mb-6">
        <Logo />

        <div className="flex items-center gap-3">
          <button className="relative p-2 text-muted-foreground hover:text-foreground">
            <Bell size={20} />

            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
          </button>

          <div className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center text-sm font-medium">
            {userInitial}
          </div>
        </div>
      </div>

      {/* ================= GREETING ================= */}

      <h1 className="font-serif text-4xl mb-1">
        Welcome Aboard,
        {" "}
        {firstName}
      </h1>

      <p className="text-muted-foreground mb-6">
        Your next shore boards soon.
      </p>

      {/* ================= ACTIVE LANGUAGE ================= */}

      <div className="ts-card p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium">
            Learning Language
          </span>

          <span className="text-xs bg-accent/10 px-2 py-1 rounded-full uppercase">
            {activeLanguage}
          </span>
        </div>

        <div className="text-sm text-muted-foreground">
          Current level:
          {" "}
          <span className="text-foreground">
            {profile?.level ||
              "A1"}
          </span>
        </div>
      </div>

      {/* ================= LIVE SHORES ================= */}

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-serif text-2xl">
          Live Shores
        </h2>

        <Link
          to="/app/shore"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          View all
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
        {liveSessions.map(
          (session) => (
            <div
              key={session.id}
              className="ts-card p-5 min-w-[280px]"
            >
              {/* STATUS */}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary">
                  <Radio
                    size={12}
                  />

                  {session.status}
                </div>

                <span className="text-xs text-muted-foreground">
                  {
                    session.level
                  }
                </span>
              </div>

              {/* TITLE */}

              <h3 className="font-serif text-xl mb-2">
                {session.title ||
                  "TalkShore Live Session"}
              </h3>

              {/* TIME */}

              <p className="text-sm text-muted-foreground mb-5">
                {new Date(
                  session.starts_at
                ).toLocaleString()}
              </p>

              {/* FOOTER */}

              <div className="flex items-center justify-between">
                <span className="text-xs flex items-center gap-1">
                  <Users
                    size={12}
                  />

                  {
                    session.participants
                  }
                  /
                  {
                    session.max_participants
                  }
                </span>

                <button
                  onClick={() =>
                    handleBoard(
                      session.id
                    )
                  }
                  className="bg-primary text-primary-foreground text-sm px-4 py-2 rounded-full hover:opacity-90 transition"
                >
                  Board
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* ================= NEXT PORT ================= */}

      {nextLesson && (
        <>
          <h2 className="font-serif text-2xl mb-3">
            Your Next Port
          </h2>

          <div className="ts-card p-5 mb-8">
            <h3 className="font-serif text-xl mb-1">
              {
                nextLesson.scenario
              }
            </h3>

            <p className="text-sm text-muted-foreground mb-4">
              {
                nextLesson.duration_min
              }
              {" "}
              min preparation session.
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

      {/* ================= SESSION MODAL ================= */}

      <SessionModal
        sessionId={
          openSession
        }
        onClose={() =>
          setOpenSession(
            null
          )
        }
      />
    </div>
  );
};

export default Home;