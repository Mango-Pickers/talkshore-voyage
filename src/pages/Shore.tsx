import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Users,
  BellRing,
  Anchor,
} from "lucide-react";

import { getSessions } from "@/api/sessions";
import SessionModal from "@/components/SessionModal";

/* ================= TYPES ================= */

type Guide = {
  id: string;
  name: string;
  initials: string;
};

type Language = {
  id: string;
  code: string;
  name: string;
  flag?: string;
};

type Scenario = {
  id: string;
  title: string;
};

type Session = {
  id: string;
  status: "live" | "upcoming";
  level: string;
  participants: number;
  max_participants: number;
  starts_at: string;

  guides: Guide[];
  languages: Language[];
  scenarios: Scenario[];
};

/* ================= COMPONENT ================= */

const Shore = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [openSession, setOpenSession] =
    useState<string | null>(null);
  const [loading, setLoading] =
    useState<boolean>(true);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const loadSessions = async () => {
      setLoading(true);

      try {
        const data = await getSessions();

        setSessions((data as Session[]) || []);
      } catch (error) {
        console.error("Failed to load sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, []);

  /* ================= FILTER ================= */

  const filteredSessions = sessions.filter(
    (session) => {
      if (filter === "all") return true;

      return (
        session.languages?.[0]?.code === filter
      );
    }
  );

  /* ================= LIVE COUNT ================= */

  const liveCount = sessions.filter(
    (session) => session.status === "live"
  ).length;

  /* ================= LANGUAGE FILTERS ================= */

  const languageMap = new Map<
    string,
    Language
  >();

  sessions.forEach((session) => {
    const language =
      session.languages?.[0];

    if (
      language &&
      !languageMap.has(language.code)
    ) {
      languageMap.set(
        language.code,
        language
      );
    }
  });

  const languageFilters = [
    {
      code: "all",
      name: "All",
      flag: "",
    },
    ...Array.from(languageMap.values()),
  ];

  /* ================= UI ================= */

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <h1 className="font-serif text-4xl mb-1">
        Live Shores
      </h1>

      <p className="text-accent text-sm mb-5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
        {liveCount} live right now
      </p>

      {/* Safety Banner */}
      <div className="ts-card p-3 flex items-center gap-2 text-xs text-muted-foreground mb-5">
        <ShieldCheck
          size={16}
          className="text-accent shrink-0"
        />

        <span>
          All shores are AI-monitored. No
          external links. No contact
          sharing.
        </span>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {languageFilters.map((language) => {
          const active =
            filter === language.code;

          return (
            <button
              key={language.code}
              onClick={() =>
                setFilter(language.code)
              }
              className={`px-4 py-1.5 rounded-full text-sm border whitespace-nowrap transition ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-surface-2 text-muted-foreground hover:text-foreground"
              }`}
            >
              {language.flag}{" "}
              {language.name}
            </button>
          );
        })}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="ts-card p-6 text-center text-muted-foreground">
          Loading shores...
        </div>
      )}

      {/* Sessions */}
      {!loading && (
        <div className="space-y-3">
          {filteredSessions.map((session) => {
            const guide =
              session.guides?.[0];

            const language =
              session.languages?.[0];

            const scenario =
              session.scenarios?.[0];

            const isLive =
              session.status === "live";

            return (
              <div
                key={session.id}
                className="ts-card p-5 ts-hover"
              >
                {/* Top */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center font-medium">
                    {guide?.initials || "G"}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="font-medium">
                        {guide?.name ||
                          "Guide"}
                      </span>

                      <Anchor
                        size={12}
                        className="text-primary"
                      />
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {language?.code?.toUpperCase()}{" "}
                      · {session.level}
                    </div>
                  </div>

                  {isLive ? (
                    <span className="flex items-center gap-1 text-xs text-accent">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
                      Live
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {session.starts_at}
                    </span>
                  )}
                </div>

                {/* Scenario */}
                <h3 className="font-serif text-xl mb-2">
                  {scenario?.title ||
                    "Conversation Session"}
                </h3>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users size={12} />
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
                <div className="mt-4">
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
                      <BellRing size={16} />
                      Set Reminder
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading &&
        filteredSessions.length === 0 && (
          <div className="ts-card p-6 text-center text-muted-foreground">
            No shores available yet.
          </div>
        )}

      {/* Session Modal */}
      <SessionModal
        sessionId={openSession}
        onClose={() =>
          setOpenSession(null)
        }
      />
    </div>
  );
};

export default Shore;