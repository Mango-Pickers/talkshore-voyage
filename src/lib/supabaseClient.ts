import { createClient } from "@supabase/supabase-js";

/* =========================================================
   ENV VARIABLES
========================================================= */

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL;

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY;

/* =========================================================
   VALIDATION
========================================================= */

if (!supabaseUrl) {
  throw new Error(
    "Missing VITE_SUPABASE_URL"
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_ANON_KEY"
  );
}

/* =========================================================
   CLIENT
========================================================= */

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);