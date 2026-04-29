import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, User, Anchor } from "lucide-react";
import { languages } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import Logo from "@/components/Logo";

const levels = [
  { id: "beginner", title: "Complete Beginner", desc: "Starting from the very first word." },
  { id: "basics", title: "Some Basics", desc: "A few phrases, but freezing in conversation." },
  { id: "stuck", title: "Conversational but Stuck", desc: "You can talk. You want to flow." },
  { id: "rusty", title: "Advanced but Rusty", desc: "It is in there. It just needs a stage." },
];
const goals = ["Hold casual conversations", "Travel confidently", "Use it for work", "Connect with family or culture"];

const Onboarding = () => {
  const nav = useNavigate();
  const { onboarding, setOnboarding, setIsOnboarded, setActiveLanguage, setProfile, profile } = useApp();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState(onboarding);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const update = (patch: any) => setDraft({ ...draft, ...patch });

  const next = () => {
    if (step < 5) setStep(step + 1);
    else if (step === 5 && draft.role) setStep(6);
  };
  const back = () => step > 1 && setStep(step - 1);
  const finish = () => {
    setOnboarding(draft);
    if (draft.language) setActiveLanguage(draft.language);
    setProfile({ ...profile, name: name || profile.name, email: email || profile.email });
    setIsOnboarded(true);
    nav("/app");
  };

  const canContinue =
    (step === 1 && draft.language) ||
    (step === 2 && draft.level) ||
    (step === 3 && draft.goal) ||
    (step === 4 && draft.daysPerWeek) ||
    (step === 5 && draft.role) ||
    (step === 6 && name.trim().length > 0 && email.trim().length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between border-b border-surface-2">
        <Logo />
        <button onClick={() => nav("/")} className="text-sm text-muted-foreground hover:text-foreground">Exit</button>
      </header>

      <div className="px-6 pt-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
            <span>Step {Math.min(step, 5)} of 5</span>
          </div>
          <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${(Math.min(step, 5) / 5) * 100}%` }} />
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto animate-fade-in">
          {step === 1 && (
            <>
              <h2 className="font-serif text-4xl mb-2">Which language are you learning?</h2>
              <p className="text-muted-foreground mb-8">Pick one to start. You can add more later.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {languages.map((l) => {
                  const active = draft.language === l.code;
                  return (
                    <button
                      key={l.id}
                      onClick={() => update({ language: l.code })}
                      className={`ts-card p-5 text-left transition ${active ? "ring-2 ring-primary border-primary" : "ts-hover"}`}
                    >
                      <div className="text-3xl mb-2">{l.flag}</div>
                      <div className="font-medium">{l.name}</div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="font-serif text-4xl mb-2">What is your current level?</h2>
              <p className="text-muted-foreground mb-8">Honest is best. We will adjust as you go.</p>
              <div className="grid gap-3">
                {levels.map((l) => {
                  const active = draft.level === l.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => update({ level: l.id })}
                      className={`ts-card p-5 text-left transition flex items-center justify-between ${active ? "ring-2 ring-primary" : "ts-hover"}`}
                    >
                      <div>
                        <div className="font-medium mb-1">{l.title}</div>
                        <div className="text-sm text-muted-foreground">{l.desc}</div>
                      </div>
                      {active && <Check className="text-primary" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="font-serif text-4xl mb-2">What is your main goal?</h2>
              <p className="text-muted-foreground mb-8">Your goal shapes the scenarios we surface first.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {goals.map((g) => {
                  const active = draft.goal === g;
                  return (
                    <button
                      key={g}
                      onClick={() => update({ goal: g })}
                      className={`ts-card p-5 text-left transition ${active ? "ring-2 ring-primary" : "ts-hover"}`}
                    >
                      <div className="font-medium">{g}</div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <h2 className="font-serif text-4xl mb-2">How many days per week can you commit?</h2>
              <p className="text-muted-foreground mb-8">Even small, consistent voyages get you there.</p>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((n) => {
                  const active = draft.daysPerWeek === n;
                  return (
                    <button
                      key={n}
                      onClick={() => update({ daysPerWeek: n })}
                      className={`px-5 py-3 rounded-full border transition font-medium ${
                        active ? "bg-primary text-primary-foreground border-primary" : "border-surface-2 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {step === 5 && (
            <>
              <h2 className="font-serif text-4xl mb-2">How are you joining TalkShore?</h2>
              <p className="text-muted-foreground mb-8">Both paths are welcome aboard.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: "learner", icon: User, t: "Learner", d: "Joins as a passenger and boards live shores." },
                  { id: "guide", icon: Anchor, t: "Guide", d: "Verified guide with a 1000+ day streak from any language app." },
                ].map((opt) => {
                  const active = draft.role === opt.id;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => update({ role: opt.id as any })}
                      className={`ts-card p-6 text-left transition ${active ? "ring-2 ring-primary" : "ts-hover"}`}
                    >
                      <Icon className="text-primary mb-3" />
                      <div className="font-serif text-2xl mb-1">{opt.t}</div>
                      <div className="text-sm text-muted-foreground">{opt.d}</div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {step === 6 && (
            <>
              <h2 className="font-serif text-4xl mb-2">Your voyage is ready.</h2>
              <p className="text-muted-foreground mb-8">A few last details and we will set sail.</p>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Your name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Abraham"
                    className="w-full bg-surface border border-surface-2 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-surface border border-surface-2 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="px-6 py-5 border-t border-surface-2">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 1}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button
            onClick={step === 6 ? finish : next}
            disabled={!canContinue}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3 rounded-full hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {step === 6 ? "Set sail" : "Continue"} <ArrowRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
