import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  Calendar,
  X,
} from "lucide-react";

import { getLessons } from "@/api/lessons";

/* ================= TYPES ================= */

type Scenario = {
  id: string;
  title: string;
};

type Session = {
  id: string;
  scenarios?: Scenario;
};

type Lesson = {
  id: string;
  duration_min: number;
  prepares_for: string | null;

  status:
    | "complete"
    | "ready"
    | "in_progress"
    | "scheduled"
    | "locked";

  progress?: number;
  scheduled_for?: string;

  description: string;
  topics: string[];

  scenarios?: Scenario;
  sessions?: Session;
};

/* ================= COMPONENT ================= */

const VoyagePrep = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  /* ================= LOAD LESSONS ================= */

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const data = await getLessons();

        if (data) {
          setLessons(data);
        }
      } catch (err) {
        console.error("Failed to load lessons:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, []);

  /* ================= ACTIVE MODAL ================= */

  const openLesson =
    lessons.find((lesson) => lesson.id === openId) || null;

  /* ================= HELPERS ================= */

  const statusBadge = (lesson: Lesson) => {
    switch (lesson.status) {
      case "complete":
        return (
          <span className="text-xs text-accent flex items-center gap-1">
            <CheckCircle2 size={14} />
            Completed
          </span>
        );

      case "ready":
        return (
          <span className="text-xs text-accent">
            Ready
          </span>
        );

      case "in_progress":
        return (
          <div className="w-32">
            <div className="text-xs text-primary mb-1">
              In Progress · {lesson.progress ?? 0}%
            </div>

            <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{
                  width: `${lesson.progress ?? 0}%`,
                }}
              />
            </div>
          </div>
        );

      case "scheduled":
        return (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar size={12} />
            {lesson.scheduled_for}
          </span>
        );

      default:
        return (
          <span className="text-xs text-muted-foreground italic">
            Locked
          </span>
        );
    }
  };

  const dotColor = (status: Lesson["status"]) => {
    switch (status) {
      case "complete":
        return "bg-accent";

      case "ready":
      case "in_progress":
        return "bg-primary";

      default:
        return "bg-surface-2";
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="animate-fade-in">
        <h1 className="font-serif text-4xl mb-4">
          Voyage Prep
        </h1>

        <p className="text-muted-foreground">
          Loading lessons...
        </p>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="animate-fade-in">
      {/* Header */}

      <h1 className="font-serif text-4xl mb-1">
        Voyage Prep
      </h1>

      <p className="text-muted-foreground mb-8">
        Practice before boarding live conversation sessions.
      </p>

      {/* Timeline */}

      <div className="relative pl-8">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-surface-2" />

        {lessons.map((lesson) => {
          const interactive =
            lesson.status === "complete" ||
            lesson.status === "ready" ||
            lesson.status === "in_progress";

          return (
            <div
              key={lesson.id}
              className="relative mb-4"
            >
              {/* Timeline Dot */}

              <div
                className={`absolute -left-[22px] top-5 w-3 h-3 rounded-full ${dotColor(
                  lesson.status
                )} ring-4 ring-background`}
              />

              {/* Card */}

              <button
                disabled={!interactive}
                onClick={() => setOpenId(lesson.id)}
                className={`ts-card w-full text-left p-5 transition ${
                  interactive
                    ? "ts-hover cursor-pointer"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-serif text-xl">
                    {lesson.scenarios?.title ||
                      "Untitled Lesson"}
                  </h3>

                  {statusBadge(lesson)}
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {lesson.duration_min} min
                  </span>

                  {lesson.prepares_for && (
                    <span>
                      · prepares for live session
                    </span>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* ================= MODAL ================= */}

      {openLesson && (
        <div
          onClick={() => setOpenId(null)}
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="ts-card w-full max-w-lg p-6 animate-slide-up"
          >
            {/* Top */}

            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs text-accent mb-1">
                  Voyage Prep
                </div>

                <h3 className="font-serif text-2xl">
                  {openLesson.scenarios?.title}
                </h3>
              </div>

              <button
                onClick={() => setOpenId(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X />
              </button>
            </div>

            {/* Description */}

            <p className="text-sm text-muted-foreground mb-4">
              {openLesson.description}
            </p>

            {/* Session */}

            {openLesson.sessions?.scenarios && (
              <p className="text-xs text-muted-foreground mb-4">
                Prepares you for{" "}
                <span className="text-foreground">
                  {openLesson.sessions.scenarios.title}
                </span>
              </p>
            )}

            {/* Topics */}

            <div className="space-y-2 mb-5">
              {openLesson.topics.map((topic, index) => (
                <div
                  key={topic}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-surface-2 flex items-center justify-center text-xs">
                    {index + 1}
                  </span>

                  {topic}
                </div>
              ))}
            </div>

            {/* CTA */}

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