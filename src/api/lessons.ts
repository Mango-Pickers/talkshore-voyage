import { supabase } from "@/lib/supabaseClient";

export const getLessons = async () => {
  const { data, error } = await supabase
    .from("lessons")
    .select(`
      *,
      scenarios (*)
    `);

  if (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }

  return data;
};