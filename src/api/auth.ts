import { supabase } from "@/lib/supabaseClient";

/* ================= TYPES ================= */

export type SignUpData = {
  first_name: string;

  email: string;

  password: string;

  role: "learner" | "guide";
};

/* ================= SIGN UP ================= */

export const signUp = async ({
  first_name,
  email,
  password,
  role,
}: SignUpData) => {
  const { data, error } =
    await supabase.auth.signUp({
      email,

      password,

      options: {
        data: {
          /*
           Store ONLY full_name in Supabase
           so it aligns with your profiles table
          */

          full_name: first_name,

          role,
        },
      },
    });

  if (error) {
    throw error;
  }

  return data;
};

/* ================= SIGN IN ================= */

export const signIn = async (
  email: string,
  password: string
) => {
  const { data, error } =
    await supabase.auth.signInWithPassword(
      {
        email,
        password,
      }
    );

  if (error) {
    throw error;
  }

  return data;
};

/* ================= SIGN OUT ================= */

export const signOut = async () => {
  const { error } =
    await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};
