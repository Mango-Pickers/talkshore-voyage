import { supabase } from "@/lib/supabaseClient";

type SignUpData = {
  email: string;
  password: string;
  full_name: string;
  role: "learner" | "guide";
};

export const signUp = async ({
  email,
  password,
  full_name,
  role,
}: SignUpData) => {
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (error) {
    throw error;
  }

  const user = data.user;

  if (!user) {
    throw new Error("User not created");
  }

  const { error: profileError } =
    await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email,
        full_name,
        role,
      });

  if (profileError) {
    throw profileError;
  }

  return data;
};

export const signIn = async (
  email: string,
  password: string
) => {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw error;
  }

  return data;
};

export const signOut = async () => {
  const { error } =
    await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};