import { supabase } from "./supabaseClient";

export interface Session {
  id: string;
  level: string;
  participants: number;
  max_participants: number;
  starts_at: string;
  status: string;

  guides: {
    name: string;
    initials: string;
    verified: boolean;
  }[];

  languages: {
    name: string;
    flag: string;
    code: string;
  }[];

  scenarios: {
    title: string;
  }[];
}

export const getSessions = async (): Promise<Session[]> => {
  const { data, error } = await supabase
    .from("sessions")
    .select(`
      id,
      level,
      participants,
      max_participants,
      starts_at,
      status,

      guides (
        name,
        initials,
        verified
      ),

      languages (
        name,
        flag,
        code
      ),

      scenarios (
        title
      )
    `);

  if (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }

  return data as Session[];
};