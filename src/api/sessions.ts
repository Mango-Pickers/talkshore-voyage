import { supabase } from "@/lib/supabaseClient";

/* ================= TYPES ================= */

export type Session = {
  id: string;

  status: "live" | "upcoming";

  level: string;

  participants: number;

  max_participants: number;

  starts_at: string;

  room_url?: string;

  title?: string;
};

/* ================= API ================= */

export async function getSessions(): Promise<
  Session[]
> {
  const { data, error } =
    await supabase
      .from("sessions")
      .select("*")
      .order("starts_at", {
        ascending: true,
      });

  if (error) {
    console.error(
      "Supabase session error:",
      error
    );

    return [];
  }

  return (
    (data as Session[]) ??
    []
  );
}