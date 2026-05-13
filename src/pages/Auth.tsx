import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signIn,
  signUp,
} from "@/api/auth";

const Auth = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<
    "login" | "signup"
  >("signup");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "learner" as
      | "learner"
      | "guide",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      setError("");

      if (mode === "signup") {
        await signUp(form);

        navigate("/onboarding");
      } else {
        await signIn(
          form.email,
          form.password
        );

        navigate("/");
      }
    } catch (err: unknown) {
      console.error(err);

      if (
        err instanceof Error
      ) {
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
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-[32px] border border-[#1e293b] bg-[#06122b]/95 p-10 shadow-2xl shadow-blue-950/40">
        {/* LOGO */}

        <div className="mb-10">
          <h1 className="font-serif text-5xl text-[#f3b64c]">
            TalkShore
          </h1>

          <p className="mt-2 text-sm tracking-[0.4em] text-slate-400 uppercase">
            Voyage Portal
          </p>
        </div>

        {/* TITLE */}

        <h2 className="font-serif text-5xl mb-3">
          {mode === "signup"
            ? "Begin your voyage"
            : "Welcome back"}
        </h2>

        <p className="text-slate-400 mb-8 text-lg">
          Learn languages through
          immersive conversation.
        </p>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {/* FORM */}

        <div className="space-y-5">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username:
                    e.target.value,
                })
              }
              className="w-full rounded-2xl border border-[#1e3a5f] bg-[#0b1d3a] p-5 text-white outline-none transition focus:border-[#f3b64c]"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
            className="w-full rounded-2xl border border-[#1e3a5f] bg-[#0b1d3a] p-5 text-white outline-none transition focus:border-[#f3b64c]"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
            className="w-full rounded-2xl border border-[#1e3a5f] bg-[#0b1d3a] p-5 text-white outline-none transition focus:border-[#f3b64c]"
          />

          {/* ROLE */}

          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    role:
                      "learner",
                  })
                }
                className={`rounded-2xl border p-5 text-lg transition ${
                  form.role ===
                  "learner"
                    ? "border-[#f3b64c] bg-[#0b1d3a]"
                    : "border-[#1e3a5f] bg-transparent"
                }`}
              >
                Learner
              </button>

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    role: "guide",
                  })
                }
                className={`rounded-2xl border p-5 text-lg transition ${
                  form.role ===
                  "guide"
                    ? "border-[#f3b64c] bg-[#0b1d3a]"
                    : "border-[#1e3a5f] bg-transparent"
                }`}
              >
                Guide
              </button>
            </div>
          )}

          {/* SUBMIT */}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-full bg-[#f3b64c] py-5 text-xl font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : mode === "signup"
              ? "Set Sail"
              : "Continue"}
          </button>

          {/* TOGGLE */}

          <button
            type="button"
            onClick={() =>
              setMode(
                mode === "signup"
                  ? "login"
                  : "signup"
              )
            }
            className="w-full text-center text-sm text-slate-400 transition hover:text-white"
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