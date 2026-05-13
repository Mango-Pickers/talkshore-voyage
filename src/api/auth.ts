import { supabase } from "@/lib/supabaseClient";

export type UserRole =
  | "learner"
  | "guide";

interface SignUpData {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

/* =========================================================
   SIGN UP
========================================================= */

export async function signUp(
  data: SignUpData
) {
  const {
    data: authData,
    error,
  } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw error;
  }

  const user = authData.user;

  if (!user) {
    throw new Error(
      "User creation failed"
    );
  }

  const {
    error: profileError,
  } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      username: data.username,
      role: data.role,
    });

  if (profileError) {
    throw profileError;
  }

  return user;
}

/* =========================================================
   SIGN IN
========================================================= */

export async function signIn(
  email: string,
  password: string
) {
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
}

/* =========================================================
   SIGN OUT
========================================================= */

export async function signOut() {
  const { error } =
    await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}