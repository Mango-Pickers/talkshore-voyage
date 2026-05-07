import {
  Users,
  BellRing,
  Anchor,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

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

export type Session = {
  id: string;

  status: "live" | "upcoming";

  level: string;

  participants: number;

  max_participants: number;

  starts_at: string | null;

  guides: Guide[];

  languages: Language[];

  scenarios: Scenario[];
};

/* =========================================================
   PROPS
========================================================= */

type Props = {
  session: Session;

  onBoard?: (id: string) => void;
};

/* =========================================================
   COMPONENT
========================================================= */

const SessionCard = ({
  session,
  onBoard,
}: Props) => {
  const guide =
    session.guides?.[0];

  const language =
    session.languages?.[0];

  const scenario =
    session.scenarios?.[0];

  const isLive =
    session.status === "live";

  return (
    <div className="ts-card p-5 ts-hover">
      {/* TOP */}

      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center font-medium">
          {guide?.initials || "G"}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-1 text-sm">
            <span className="font-medium">
              {guide?.name || "Guide"}
            </span>

            <Anchor
              size={12}
              className="text-primary"
            />
          </div>

          <div className="text-xs text-muted-foreground">
            {language?.code?.toUpperCase()} ·{" "}
            {session.level}
          </div>
        </div>

        {isLive ? (
          <span className="flex items-center gap-1 text-xs text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />

            Live
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">
            {session.starts_at ||
              "Upcoming"}
          </span>
        )}
      </div>

      {/* TITLE */}

      <h3 className="font-serif text-xl mb-2">
        {scenario?.title ||
          "Conversation Session"}
      </h3>

      {/* FOOTER */}

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Users size={12} />

          {session.participants}/
          {session.max_participants} aboard
        </span>
      </div>

      {/* CTA */}

      <div className="mt-4">
        {isLive ? (
          <button
            onClick={() =>
              onBoard?.(session.id)
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
};

export default SessionCard;