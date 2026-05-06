import { supabase } from "@/lib/supabaseClient";

export const bookSession = async (sessionId: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        session_id: sessionId,
        user_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const hasBooking = async (sessionId: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data, error } = await supabase
    .from("bookings")
    .select("id")
    .eq("session_id", sessionId)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }

  return data.length > 0;
};