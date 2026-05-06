import { supabase } from "../lib/supabaseClient";

export const getSessions = async () => {
  const { data, error } = await supabase
    .from("sessions")
    .select(`
      *,
      guides (*),
      languages (*),
      scenarios (*)
    `);

  if (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }

  return data;
};