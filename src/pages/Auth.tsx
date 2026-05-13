import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabaseClient";

type AuthMode =
  | "login"
  | "signup";

type UserRole =
  | "learner"
  | "guide";

const Auth = () => {
  const navigate = useNavigate();

  const [mode, setMode] =
    useState<AuthMode>("signup");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "learner" as UserRole,
  });

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      if (session) {
        navigate("/");
      }
    };

    checkSession();
  }, [navigate]);

  const updateField = (
    key: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      /* LOGIN */

      if (mode === "login") {
        const { data, error } =
          await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
          });

        if (error) {
          throw error;
        }

        if (!data.user) {
          throw new Error(
            "Unable to login"
          );
        }

        const { data: profile } =
          await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user.id)
            .single();

        if (
          profile?.role === "guide"
        ) {
          navigate("/guide");
        } else {
          navigate("/");
        }

        return;
      }

      /* SIGNUP */

      const { data, error } =
        await supabase.auth.signUp({
          email: form.email,
          password: form.password,

          options: {
            data: {
              full_name:
                form.full_name,

              role: form.role,
            },
          },
        });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error(
          "Unable to create account"
        );
      }

      const { error: profileError } =
        await supabase
          .from("profiles")
          .insert({
            id: data.user.id,

            username:
              form.full_name,

            role: form.role,
          });

      if (profileError) {
        throw profileError;
      }

      if (form.role === "guide") {
        navigate("/guide");
      } else {
        navigate("/onboarding");
      }
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Authentication failed"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-xl rounded-[32px] border border-[#173056] bg-[#04152d]/95 backdrop-blur-xl p-10 shadow-[0_0_80px_rgba(37,99,235,0.15)]">
        <div className="mb-10">
          <h1 className="font-serif text-6xl text-[#f3b44e]">
            TalkShore
          </h1>

          <p className="tracking-[0.4em] text-sm text-gray-400 mt-2 uppercase">
            Voyage Portal
          </p>
        </div>

        <div className="mb-8">
          <h2 className="font-serif text-4xl mb-3">
            {mode === "signup"
              ? "Begin your voyage"
              : "Welcome back"}
          </h2>

          <p className="text-gray-400">
            Learn languages through
            immersive conversation.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-5">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Your name"
              value={form.full_name}
              onChange={(e) =>
                updateField(
                  "full_name",
                  e.target.value
                )
              }
              className="w-full rounded-2xl border border-[#173056] bg-[#0b1d3a] px-5 py-4 outline-none focus:border-[#f3b44e]"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              updateField(
                "email",
                e.target.value
              )
            }
            className="w-full rounded-2xl border border-[#173056] bg-[#0b1d3a] px-5 py-4 outline-none focus:border-[#f3b44e]"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              updateField(
                "password",
                e.target.value
              )
            }
            className="w-full rounded-2xl border border-[#173056] bg-[#0b1d3a] px-5 py-4 outline-none focus:border-[#f3b44e]"
          />

          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() =>
                  updateField(
                    "role",
                    "learner"
                  )
                }
                className={`rounded-2xl border px-5 py-5 ${
                  form.role ===
                  "learner"
                    ? "border-[#f3b44e] bg-[#0b1d3a]"
                    : "border-[#173056]"
                }`}
              >
                Learner
              </button>

              <button
                type="button"
                onClick={() =>
                  updateField(
                    "role",
                    "guide"
                  )
                }
                className={`rounded-2xl border px-5 py-5 ${
                  form.role ===
                  "guide"
                    ? "border-[#f3b44e] bg-[#0b1d3a]"
                    : "border-[#173056]"
                }`}
              >
                Guide
              </button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-full bg-[#f3b44e] py-4 text-lg font-semibold text-black hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : mode === "signup"
              ? "Set Sail"
              : "Continue"}
          </button>

          <button
            type="button"
            onClick={() =>
              setMode(
                mode === "signup"
                  ? "login"
                  : "signup"
              )
            }
            className="w-full text-sm text-gray-400 hover:text-white"
          >
            {mode === "signup"
              ? "Already have an account? Login"
              : "Create account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;