import { supabase } from "./supabaseClient";

/* ================= TYPES ================= */

export interface Session {
  id: string;

  title?: string;

  level: string;

  participants: number;

  max_participants: number;

  starts_at: string;

  status: string;

  room_url?: string;
}

/* ================= API ================= */

export const getSessions =
  async (): Promise<
    Session[]
  > => {
    const {
      data,
      error,
    } = await supabase
      .from("sessions")
      .select("*")
      .order(
        "starts_at",
        {
          ascending: true,
        }
      );

    if (error) {
      console.error(
        "Error fetching sessions:",
        error
      );

      return [];
    }

    return (
      (data as Session[]) ??
      []
    );
  };