import { supabase } from "@/lib/supabaseClient";

export const getLessons = async () => {
  const { data, error } = await supabase
    .from("lessons")
    .select(`
      *,
      scenarios (
        id,
        title
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("LESSONS ERROR:", error);
    return [];
  }

  return data;
};