import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn, signUp } from "@/api/auth";

const Auth = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<
    "login" | "signup"
  >("signup");

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "learner" as
      | "learner"
      | "guide",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

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
    } catch (error) {
      console.error(error);

      alert("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-xl ts-card p-10">
        <h1 className="font-serif text-5xl mb-3">
          {mode === "signup"
            ? "Begin your voyage."
            : "Welcome back."}
        </h1>

        <p className="text-muted-foreground mb-8">
          Join TalkShore and start
          speaking from shore one.
        </p>

        <div className="space-y-5">
          {mode === "signup" && (
            <input
              placeholder="Your name"
              value={form.full_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  full_name:
                    e.target.value,
                })
              }
              className="w-full bg-surface-2 rounded-2xl p-4"
            />
          )}

          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full bg-surface-2 rounded-2xl p-4"
          />

          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
            className="w-full bg-surface-2 rounded-2xl p-4"
          />

          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() =>
                  setForm({
                    ...form,
                    role: "learner",
                  })
                }
                className={`p-5 rounded-2xl border ${
                  form.role ===
                  "learner"
                    ? "border-primary bg-surface-2"
                    : "border-surface"
                }`}
              >
                Learner
              </button>

              <button
                onClick={() =>
                  setForm({
                    ...form,
                    role: "guide",
                  })
                }
                className={`p-5 rounded-2xl border ${
                  form.role ===
                  "guide"
                    ? "border-primary bg-surface-2"
                    : "border-surface"
                }`}
              >
                Guide
              </button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-primary text-primary-foreground rounded-full py-4 font-medium"
          >
            {loading
              ? "Loading..."
              : mode === "signup"
              ? "Set Sail"
              : "Continue"}
          </button>

          <button
            onClick={() =>
              setMode(
                mode === "signup"
                  ? "login"
                  : "signup"
              )
            }
            className="w-full text-sm text-muted-foreground"
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