import {
  Users,
  BellRing,
  Radio,
  Clock3,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

export type Session = {
  id: string;

  title?: string;

  status: "live" | "upcoming";

  level: string;

  participants: number;

  max_participants: number;

  starts_at: string | null;

  room_url?: string;
};

/* =========================================================
   PROPS
========================================================= */

type Props = {
  session: Session;

  onBoard?: (
    id: string
  ) => void;
};

/* =========================================================
   COMPONENT
========================================================= */

const SessionCard = ({
  session,
  onBoard,
}: Props) => {
  const isLive =
    session.status ===
    "live";

  return (
    <div className="ts-card p-5 ts-hover">
      {/* =====================================================
          TOP
      ===================================================== */}

      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-2">
            <Radio
              size={12}
            />

            {isLive
              ? "Live Shore"
              : "Upcoming Shore"}
          </div>

          <div className="text-xs text-muted-foreground">
            {session.level}
          </div>
        </div>

        <div
          className={`px-3 py-1 rounded-full text-xs ${
            isLive
              ? "bg-primary/10 text-primary"
              : "bg-surface text-muted-foreground"
          }`}
        >
          {session.status}
        </div>
      </div>

      {/* =====================================================
          TITLE
      ===================================================== */}

      <h3 className="font-serif text-2xl mb-3">
        {session.title ||
          "TalkShore Live Session"}
      </h3>

      {/* =====================================================
          DATE / TIME
      ===================================================== */}

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

      {/* =====================================================
          PARTICIPANTS
      ===================================================== */}

      <div className="flex items-center justify-between mb-5">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
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
          {" "}
          aboard
        </span>
      </div>

      {/* =====================================================
          CTA
      ===================================================== */}

      {isLive ? (
        <button
          onClick={() =>
            onBoard?.(
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
            size={16}
          />

          Set Reminder
        </button>
      )}
    </div>
  );
};

export default SessionCard;
