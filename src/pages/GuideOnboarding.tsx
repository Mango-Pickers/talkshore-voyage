import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabaseClient";

import { useApp } from "@/hooks/useApp";

const GuideOnboarding = () => {
  const navigate = useNavigate();

  const { user } = useApp();

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    guide_language: "",
    guide_days_per_week: "",
    guide_streak_years: "",
  });

  /* ================= NEXT ================= */

  const next = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  /* ================= BACK ================= */

  const back = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  /* ================= FINISH ================= */

  const finishOnboarding =
    async () => {
      try {
        setLoading(true);

        if (!user) return;

        const { error } =
          await supabase
            .from("profiles")
            .update({
              guide_language:
                form.guide_language,

              guide_days_per_week:
                Number(
                  form.guide_days_per_week
                ),

              guide_streak_years:
                Number(
                  form.guide_streak_years
                ),

              is_guide_onboarded:
                true,
            })
            .eq("id", user.id);

        if (error) {
          throw error;
        }

        navigate(
          "/guide-dashboard"
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-2xl rounded-[32px] border border-[#1e293b] bg-[#06122b]/95 p-10 shadow-2xl shadow-blue-950/40">
        {/* HEADER */}

        <div className="mb-10">
          <h1 className="font-serif text-5xl text-[#f3b64c] mb-3">
            Guide Setup
          </h1>

          <p className="text-slate-400 text-lg">
            Configure your guide
            profile before hosting
            live shores.
          </p>
        </div>

        {/* STEP INDICATOR */}

        <div className="flex gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full ${
                step >= s
                  ? "bg-[#f3b64c]"
                  : "bg-[#1e293b]"
              }`}
            />
          ))}
        </div>

        {/* STEP 1 */}

        {step === 1 && (
          <div>
            <h2 className="font-serif text-3xl mb-3">
              Which language will
              you guide?
            </h2>

            <p className="text-slate-400 mb-6">
              Select your primary
              teaching language.
            </p>

            <select
              value={
                form.guide_language
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  guide_language:
                    e.target.value,
                })
              }
              className="w-full rounded-2xl border border-[#1e3a5f] bg-[#0b1d3a] p-5 text-white outline-none"
            >
              <option value="">
                Select language
              </option>

              <option value="Spanish">
                Spanish
              </option>

              <option value="French">
                French
              </option>

              <option value="German">
                German
              </option>

              <option value="Italian">
                Italian
              </option>
            </select>
          </div>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <div>
            <h2 className="font-serif text-3xl mb-3">
              Weekly Commitment
            </h2>

            <p className="text-slate-400 mb-6">
              How many days per week
              can you host learners?
            </p>

            <div className="grid grid-cols-3 gap-4">
              {["2", "4", "6"].map(
                (days) => (
                  <button
                    key={days}
                    onClick={() =>
                      setForm({
                        ...form,
                        guide_days_per_week:
                          days,
                      })
                    }
                    className={`rounded-2xl border p-6 transition ${
                      form.guide_days_per_week ===
                      days
                        ? "border-[#f3b64c] bg-[#0b1d3a]"
                        : "border-[#1e3a5f]"
                    }`}
                  >
                    {days} Days
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <div>
            <h2 className="font-serif text-3xl mb-3">
              Speaking Experience
            </h2>

            <p className="text-slate-400 mb-6">
              How many years have
              you actively practiced
              this language outside
              the platform?
            </p>

            <input
              type="number"
              placeholder="e.g 5"
              value={
                form.guide_streak_years
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  guide_streak_years:
                    e.target.value,
                })
              }
              className="w-full rounded-2xl border border-[#1e3a5f] bg-[#0b1d3a] p-5 text-white outline-none"
            />
          </div>
        )}

        {/* ACTIONS */}

        <div className="flex items-center justify-between mt-10">
          <button
            onClick={back}
            disabled={step === 1}
            className="px-6 py-3 rounded-full border border-[#1e3a5f] disabled:opacity-30"
          >
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={next}
              className="px-8 py-3 rounded-full bg-[#f3b64c] text-black font-semibold"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={
                finishOnboarding
              }
              disabled={loading}
              className="px-8 py-3 rounded-full bg-[#f3b64c] text-black font-semibold disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : "Launch Dashboard"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideOnboarding;