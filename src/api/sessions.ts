import { supabase } from "@/lib/supabaseClient";

/* ================= TYPES ================= */

export type Guide = {
  id: string;
  name: string;
  initials: string;
  verified?: boolean;
};

export type Language = {
  id: string;
  code: string;
  name: string;
  flag?: string;
};

export type Scenario = {
  id: string;
  title: string;
};

export type Session = {
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

/* ================= API ================= */

export async function getSessions(): Promise<Session[]> {
  const { data, error } = await supabase
    .from("sessions")
    .select(`
      id,
      status,
      level,
      participants,
      max_participants,
      starts_at,

      guides (
        id,
        name,
        initials,
        verified
      ),

      languages (
        id,
        name,
        code,
        flag
      ),

      scenarios (
        id,
        title
      )
    `)
    .order("starts_at", {
      ascending: true,
    });

  if (error) {
    console.error("Supabase session error:", error);
    return [];
  }

  /* ================= SAFE TRANSFORM ================= */

  const sessions: Session[] = (data ?? []).map(
    (session) => ({
      id: session.id as string,

      status: session.status as
        | "live"
        | "upcoming",

      level: session.level as string,

      participants:
        session.participants as number,

      max_participants:
        session.max_participants as number,

      starts_at:
        session.starts_at as string,

      guides:
        (session.guides as Guide[]) ?? [],

      languages:
        (session.languages as Language[]) ??
        [],

      scenarios:
        (session.scenarios as Scenario[]) ??
        [],
    })
  );

  return sessions;
}