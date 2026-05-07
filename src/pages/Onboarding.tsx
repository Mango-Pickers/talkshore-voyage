import { useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  Anchor,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { languages } from "@/data/mockData";

import { useApp } from "@/hooks/useApp";

import Logo from "@/components/Logo";

/* ================= LEVELS ================= */

const levels = [
  {
    id: "beginner",
    title: "Complete Beginner",
    desc: "Starting from the very first word.",
  },

  {
    id: "basics",
    title: "Some Basics",
    desc: "A few phrases, but freezing in conversation.",
  },

  {
    id: "stuck",
    title: "Conversational but Stuck",
    desc: "You can talk. You want to flow.",
  },

  {
    id: "rusty",
    title: "Advanced but Rusty",
    desc: "It is in there. It just needs a stage.",
  },
];

/* ================= GOALS ================= */

const goals = [
  "Hold casual conversations",

  "Travel confidently",

  "Use it for work",

  "Connect with family or culture",
];

/* ================= COMPONENT ================= */

const Onboarding = () => {
  const navigate = useNavigate();

  const {
    onboarding,
    setOnboarding,
    setIsOnboarded,
    setActiveLanguage,
  } = useApp();

  /* ================= LOCAL STATE ================= */

  const [step, setStep] =
    useState<number>(1);

  const [draft, setDraft] =
    useState(onboarding);

  const [name, setName] =
    useState<string>("");

  const [email, setEmail] =
    useState<string>("");

  /* ================= UPDATE ================= */

  const updateDraft = (
    patch: Partial<typeof draft>
  ) => {
    setDraft((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  /* ================= NAVIGATION ================= */

  const next = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  /* ================= FINISH ================= */

  const finish = () => {
    setOnboarding(draft);

    if (draft.language) {
      setActiveLanguage(
        draft.language
      );
    }

    setIsOnboarded(true);

    navigate("/app");
  };

  /* ================= VALIDATION ================= */

  const canContinue =
    (step === 1 && draft.language) ||
    (step === 2 && draft.level) ||
    (step === 3 && draft.goal) ||
    (step === 4 &&
      draft.daysPerWeek) ||
    (step === 5 && draft.role) ||
    (step === 6 &&
      name.trim().length > 0 &&
      email.trim().length > 0);

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ================= HEADER ================= */}

      <header className="px-6 py-5 border-b border-surface-2 flex items-center justify-between">
        <Logo />

        <button
          onClick={() => navigate("/")}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Exit
        </button>
      </header>

      {/* ================= PROGRESS ================= */}

      <div className="px-6 pt-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs text-muted-foreground mb-2">
            Step {Math.min(step, 5)} of 5
          </div>

          <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{
                width: `${
                  (Math.min(step, 5) / 5) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <main className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto animate-fade-in">
          {/* ================= STEP 1 ================= */}

          {step === 1 && (
            <>
              <h1 className="font-serif text-4xl mb-2">
                Which language are you
                learning?
              </h1>

              <p className="text-muted-foreground mb-8">
                Pick one to start. You
                can add more later.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {languages.map(
                  (language) => {
                    const active =
                      draft.language ===
                      language.code;

                    return (
                      <button
                        key={language.id}
                        onClick={() =>
                          updateDraft({
                            language:
                              language.code,
                          })
                        }
                        className={`ts-card p-5 text-left transition ${
                          active
                            ? "ring-2 ring-primary border-primary"
                            : "ts-hover"
                        }`}
                      >
                        <div className="text-3xl mb-2">
                          {language.flag}
                        </div>

                        <div className="font-medium">
                          {language.name}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </>
          )}

          {/* ================= STEP 2 ================= */}

          {step === 2 && (
            <>
              <h1 className="font-serif text-4xl mb-2">
                What is your current
                level?
              </h1>

              <p className="text-muted-foreground mb-8">
                Honest is best. We will
                adjust as you go.
              </p>

              <div className="grid gap-3">
                {levels.map((level) => {
                  const active =
                    draft.level ===
                    level.id;

                  return (
                    <button
                      key={level.id}
                      onClick={() =>
                        updateDraft({
                          level: level.id,
                        })
                      }
                      className={`ts-card p-5 text-left flex items-center justify-between transition ${
                        active
                          ? "ring-2 ring-primary"
                          : "ts-hover"
                      }`}
                    >
                      <div>
                        <div className="font-medium mb-1">
                          {level.title}
                        </div>

                        <div className="text-sm text-muted-foreground">
                          {level.desc}
                        </div>
                      </div>

                      {active && (
                        <Check className="text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ================= STEP 3 ================= */}

          {step === 3 && (
            <>
              <h1 className="font-serif text-4xl mb-2">
                What is your main goal?
              </h1>

              <p className="text-muted-foreground mb-8">
                Your goal shapes the
                scenarios we surface
                first.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {goals.map((goal) => {
                  const active =
                    draft.goal === goal;

                  return (
                    <button
                      key={goal}
                      onClick={() =>
                        updateDraft({
                          goal,
                        })
                      }
                      className={`ts-card p-5 text-left transition ${
                        active
                          ? "ring-2 ring-primary"
                          : "ts-hover"
                      }`}
                    >
                      <div className="font-medium">
                        {goal}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ================= STEP 4 ================= */}

          {step === 4 && (
            <>
              <h1 className="font-serif text-4xl mb-2">
                How many days per week
                can you commit?
              </h1>

              <p className="text-muted-foreground mb-8">
                Even small, consistent
                voyages get you there.
              </p>

              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5, 6, 7].map(
                  (day) => {
                    const active =
                      draft.daysPerWeek ===
                      day;

                    return (
                      <button
                        key={day}
                        onClick={() =>
                          updateDraft({
                            daysPerWeek:
                              day,
                          })
                        }
                        className={`px-5 py-3 rounded-full border transition font-medium ${
                          active
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-surface-2 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  }
                )}
              </div>
            </>
          )}

          {/* ================= STEP 5 ================= */}

          {step === 5 && (
            <>
              <h1 className="font-serif text-4xl mb-2">
                How are you joining
                TalkShore?
              </h1>

              <p className="text-muted-foreground mb-8">
                Both paths are welcome
                aboard.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    id: "learner",
                    icon: User,
                    title: "Learner",
                    desc: "Join live shores and practice with guides.",
                  },

                  {
                    id: "guide",
                    icon: Anchor,
                    title: "Guide",
                    desc: "Host conversation sessions and help learners grow.",
                  },
                ].map((option) => {
                  const active =
                    draft.role ===
                    option.id;

                  const Icon =
                    option.icon;

                  return (
                    <button
                      key={option.id}
                      onClick={() =>
                        updateDraft({
                          role:
                            option.id as
                              | "learner"
                              | "guide",
                        })
                      }
                      className={`ts-card p-6 text-left transition ${
                        active
                          ? "ring-2 ring-primary"
                          : "ts-hover"
                      }`}
                    >
                      <Icon className="text-primary mb-3" />

                      <div className="font-serif text-2xl mb-1">
                        {option.title}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {option.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ================= STEP 6 ================= */}

          {step === 6 && (
            <>
              <h1 className="font-serif text-4xl mb-2">
                Your voyage is ready.
              </h1>

              <p className="text-muted-foreground mb-8">
                A few last details and
                we will set sail.
              </p>

              <div className="grid gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Your name
                  </label>

                  <input
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    placeholder="Abraham"
                    className="w-full bg-surface border border-surface-2 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Email
                  </label>

                  <input
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    placeholder="you@example.com"
                    className="w-full bg-surface border border-surface-2 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="px-6 py-5 border-t border-surface-2">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 1}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            onClick={
              step === 6
                ? finish
                : next
            }
            disabled={!canContinue}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3 rounded-full hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {step === 6
              ? "Set sail"
              : "Continue"}

            <ArrowRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;