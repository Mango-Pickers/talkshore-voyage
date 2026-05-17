import {
  useEffect,
  useState,
} from "react";

import {
  ShieldCheck,
  Users,
  BellRing,
  Radio,
  Clock3,
} from "lucide-react";

import { getSessions } from "@/api/sessions";

import SessionModal from "@/components/SessionModal";

/* =========================================================
   TYPES
========================================================= */

export type Session = {
  id: string;

  title?: string;

  language?: string;

  status: "live" | "upcoming";

  level: string;

  participants: number;

  max_participants: number;

  starts_at: string | null;

  room_url?: string;
};

/* =========================================================
   COMPONENT
========================================================= */

const Shore = () => {
  const [sessions, setSessions] =
    useState<Session[]>([]);

  const [filter, setFilter] =
    useState("all");

  const [openSession, setOpenSession] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  /* =========================================================
     LOAD SESSIONS
  ========================================================= */

  useEffect(() => {
    const loadSessions =
      async () => {
        try {
          setLoading(true);

          const data =
            await getSessions();

          setSessions(
            data || []
          );
        } catch (error) {
          console.error(
            "Failed to load sessions:",
            error
          );

          setSessions([]);
        } finally {
          setLoading(false);
        }
      };

    loadSessions();
  }, []);

  /* =========================================================
     FILTERED SESSIONS
  ========================================================= */

  const filteredSessions =
    sessions.filter(
      (session) => {
        if (filter === "all")
          return true;

        return (
          session.language ===
          filter
        );
      }
    );

  /* =========================================================
     LIVE COUNT
  ========================================================= */

  const liveCount =
    sessions.filter(
      (session) =>
        session.status ===
        "live"
    ).length;

  /* =========================================================
     LANGUAGE FILTERS
  ========================================================= */

  const languages =
    Array.from(
      new Set(
        sessions
          .map(
            (s) =>
              s.language
          )
          .filter(Boolean)
      )
    );

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="animate-fade-in">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <h1 className="font-serif text-4xl mb-1">
        Live Shores
      </h1>

      <p className="text-accent text-sm mb-5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />

        {liveCount} live right now
      </p>

      {/* =====================================================
          SAFETY
      ===================================================== */}

      <div className="ts-card p-3 flex items-center gap-2 text-xs text-muted-foreground mb-5">
        <ShieldCheck
          size={16}
          className="text-accent shrink-0"
        />

        <span>
          All shores are
          AI-monitored.
          No external links.
          No contact sharing.
        </span>
      </div>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        <button
          onClick={() =>
            setFilter("all")
          }
          className={`px-4 py-1.5 rounded-full text-sm border whitespace-nowrap transition ${
            filter === "all"
              ? "bg-primary text-primary-foreground border-primary"
              : "border-surface-2 text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>

        {languages.map(
          (language) => (
            <button
              key={language}
              onClick={() =>
                setFilter(
                  language || ""
                )
              }
              className={`px-4 py-1.5 rounded-full text-sm border whitespace-nowrap transition ${
                filter ===
                language
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-surface-2 text-muted-foreground hover:text-foreground"
              }`}
            >
              {language}
            </button>
          )
        )}
      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <div className="ts-card p-6 text-center text-muted-foreground">
          Loading shores...
        </div>
      )}

      {/* =====================================================
          SESSIONS
      ===================================================== */}

      {!loading && (
        <div className="space-y-4">
          {filteredSessions.map(
            (session) => {
              const isLive =
                session.status ===
                "live";

              return (
                <div
                  key={
                    session.id
                  }
                  className="ts-card p-5 ts-hover"
                >
                  {/* TOP */}

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-2">
                        <Radio
                          size={
                            12
                          }
                        />

                        {isLive
                          ? "Live Shore"
                          : "Upcoming Shore"}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {
                          session.language
                        }{" "}
                        ·{" "}
                        {
                          session.level
                        }
                      </div>
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-xs ${
                        isLive
                          ? "bg-primary/10 text-primary"
                          : "bg-surface text-muted-foreground"
                      }`}
                    >
                      {
                        session.status
                      }
                    </div>
                  </div>

                  {/* TITLE */}

                  <h3 className="font-serif text-2xl mb-3">
                    {session.title ||
                      "TalkShore Conversation Shore"}
                  </h3>

                  {/* TIME */}

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                    <Clock3
                      size={14}
                    />

                    {session.starts_at
                      ? new Date(
                          session.starts_at
                        ).toLocaleString()
                      : "Schedule pending"}
                  </div>

                  {/* PARTICIPANTS */}

                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users
                        size={
                          12
                        }
                      />

                      {
                        session.participants
                      }
                      /
                      {
                        session.max_participants
                      }{" "}
                      aboard
                    </span>
                  </div>

                  {/* CTA */}

                  {isLive ? (
                    <button
                      onClick={() =>
                        setOpenSession(
                          session.id
                        )
                      }
                      className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-full hover:opacity-90 transition"
                    >
                      Board This Shore
                    </button>
                  ) : (
                    <button className="w-full border border-surface-2 text-foreground font-medium py-3 rounded-full hover:bg-surface transition inline-flex items-center justify-center gap-2">
                      <BellRing
                        size={
                          16
                        }
                      />

                      Set Reminder
                    </button>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {!loading &&
        filteredSessions.length ===
          0 && (
          <div className="ts-card p-6 text-center text-muted-foreground">
            No shores available yet.
          </div>
        )}

      {/* =====================================================
          SESSION MODAL
      ===================================================== */}

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

export default Shore;