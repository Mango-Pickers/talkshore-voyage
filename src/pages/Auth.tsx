import { useState } from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  signIn,
  signUp,
} from "@/api/auth";

import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebaseClient";

const Auth = () => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  /* ================= MODE ================= */

  const [mode, setMode] =
    useState<
      "login" | "signup"
    >(
      location.state?.mode ===
        "login"
        ? "login"
        : "signup"
    );

  /* ================= STATE ================= */

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] =
    useState({
      first_name: "",

      email: "",

      password: "",

      role:
        "learner" as
          | "learner"
          | "guide",
    });

  /* ================= SUBMIT ================= */

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        setError("");

        /* ================= LOGIN ================= */

        if (
          mode === "login"
        ) {
          if (
            !form.email ||
            !form.password
          ) {
            setError(
              "Please enter your email and password."
            );

            return;
          }

          await signIn(
            form.email.trim(),
            form.password
          );

          /* ================= GET USER ================= */

          const user = auth.currentUser;

          if (!user) {
            setError(
              "Could not load user."
            );

            return;
          }

          /* ================= LOAD PROFILE ================= */

          const profileSnapshot = await getDoc(doc(db, "profiles", user.uid));
          const profile = profileSnapshot.data();

          /* ================= ROLE ROUTING ================= */

          if (
            profile?.role ===
            "guide"
          ) {
            navigate(
              "/guide-dashboard"
            );
          } else {
            navigate("/app");
          }

          return;
        }

        /* ================= SIGNUP ================= */

        if (
          !form.first_name ||
          !form.email ||
          !form.password
        ) {
          setError(
            "Please complete all fields."
          );

          return;
        }

        await signUp({
          first_name:
            form.first_name.trim(),

          email:
            form.email.trim(),

          password:
            form.password,

          role: form.role,
        });

        /* ================= SIGNUP ROUTING ================= */

        if (
          form.role ===
          "guide"
        ) {
          navigate(
            "/guide-onboarding"
          );
        } else {
          navigate(
            "/onboarding"
          );
        }
      } catch (
        err: unknown
      ) {
        console.error(err);

        if (
          err instanceof Error
        ) {
          setError(
            err.message
          );
        } else {
          setError(
            "Authentication failed"
          );
        }
      } finally {
        setLoading(false);
      }
    };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-[32px] border border-[#1e293b] bg-[#06122b]/95 p-10 shadow-2xl shadow-blue-950/40">
        {/* ================= BRAND ================= */}

        <div className="mb-10">
          <h1 className="font-serif text-5xl text-[#f3b64c]">
            TalkShore
          </h1>

          <p className="mt-2 text-sm tracking-[0.4em] text-slate-400 uppercase">
            Voyage Portal
          </p>
        </div>

        {/* ================= TITLE ================= */}

        <h2 className="font-serif text-5xl mb-3">
          {mode ===
          "signup"
            ? "Begin your voyage"
            : "Welcome back"}
        </h2>

        <p className="text-slate-400 mb-8 text-lg">
          Learn languages
          through immersive
          conversation.
        </p>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {/* ================= FORM ================= */}

        <div className="space-y-5">
          {/* FIRST NAME */}

          {mode ===
            "signup" && (
            <input
              type="text"
              placeholder="First name"
              value={
                form.first_name
              }
              onChange={(
                e
              ) =>
                setForm({
                  ...form,

                  first_name:
                    e.target
                      .value,
                })
              }
              className="w-full rounded-2xl border border-[#1e3a5f] bg-[#0b1d3a] p-5 text-white outline-none transition focus:border-[#f3b64c]"
            />
          )}

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Email"
            value={
              form.email
            }
            onChange={(e) =>
              setForm({
                ...form,

                email:
                  e.target
                    .value,
              })
            }
            className="w-full rounded-2xl border border-[#1e3a5f] bg-[#0b1d3a] p-5 text-white outline-none transition focus:border-[#f3b64c]"
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Password"
            value={
              form.password
            }
            onChange={(e) =>
              setForm({
                ...form,

                password:
                  e.target
                    .value,
              })
            }
            className="w-full rounded-2xl border border-[#1e3a5f] bg-[#0b1d3a] p-5 text-white outline-none transition focus:border-[#f3b64c]"
          />

          {/* ROLE */}

          {mode ===
            "signup" && (
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
                    : "border-[#1e3a5f]"
                }`}
              >
                Learner
              </button>

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,

                    role:
                      "guide",
                  })
                }
                className={`rounded-2xl border p-5 text-lg transition ${
                  form.role ===
                  "guide"
                    ? "border-[#f3b64c] bg-[#0b1d3a]"
                    : "border-[#1e3a5f]"
                }`}
              >
                Guide
              </button>
            </div>
          )}

          {/* SUBMIT */}

          <button
            onClick={
              handleSubmit
            }
            disabled={
              loading
            }
            className="w-full rounded-full bg-[#f3b64c] py-5 text-xl font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : mode ===
                "signup"
              ? "Set Sail"
              : "Continue"}
          </button>

          {/* TOGGLE */}

          <button
            type="button"
            onClick={() =>
              setMode(
                mode ===
                  "signup"
                  ? "login"
                  : "signup"
              )
            }
            className="w-full text-center text-sm text-slate-400 transition hover:text-white"
          >
            {mode ===
            "signup"
              ? "Already have an account? Login"
              : "Create account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
