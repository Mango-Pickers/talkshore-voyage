import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  ArrowRight,
  BookOpenCheck,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Globe2,
  Headphones,
  Menu,
  MessageCircleMore,
  Mic2,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";

import Logo from "@/components/Logo";

const navigation = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Experience", href: "#experience" },
  { label: "Guides", href: "#guides" },
  { label: "Pricing", href: "#pricing" },
];

const steps = [
  {
    number: "01",
    icon: Compass,
    title: "Choose your destination",
    body: "Tell us the language you want to speak, your current level, and what fluency means to you.",
  },
  {
    number: "02",
    icon: BookOpenCheck,
    title: "Prepare for the moment",
    body: "Build the vocabulary and confidence you need with short lessons shaped around real situations.",
  },
  {
    number: "03",
    icon: Mic2,
    title: "Speak on a live shore",
    body: "Join a small, guided conversation where every prompt is designed to help you participate.",
  },
];

const benefits = [
  {
    icon: MessageCircleMore,
    title: "Conversation before perfection",
    body: "Practice expressing real thoughts—not memorising isolated phrases you will never use.",
  },
  {
    icon: Users,
    title: "Small, guided groups",
    body: "Get enough room to speak, useful prompts when you need them, and support throughout the session.",
  },
  {
    icon: Headphones,
    title: "Practice beyond live sessions",
    body: "Reinforce each scenario through focused solo practice and a growing library of speaking examples.",
  },
  {
    icon: ShieldCheck,
    title: "A safer place to try",
    body: "Structured sessions, clear expectations, and guided participation reduce the fear of getting it wrong.",
  },
];

const faqs = [
  {
    question: "Do I need to know the language already?",
    answer:
      "No. TalkShore is designed to support learners from the beginning. Your level helps us shape the preparation and conversation experience around what you can do today.",
  },
  {
    question: "What happens in a live shore?",
    answer:
      "A guide leads a small group through a practical scenario, gives everyone space to speak, and keeps the conversation moving with prompts and helpful feedback.",
  },
  {
    question: "Can I practise before speaking live?",
    answer:
      "Yes. Voyage Prep and Solo Sail help you rehearse useful language privately before you join a live conversation.",
  },
  {
    question: "Is TalkShore only for travel language?",
    answer:
      "No. Scenarios can cover everyday life, travel, relationships, culture, and professional conversations, depending on your goals and level.",
  },
];

const Landing = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <a href="#top" aria-label="TalkShore home">
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 sm:flex">
            <Link
              to="/auth"
              state={{ mode: "login" }}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              to="/auth"
              state={{ mode: "signup" }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:brightness-105"
            >
              Start speaking
              <ArrowRight size={16} />
            </Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-xl border border-surface-2 p-2.5 text-foreground sm:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/[0.07] bg-background px-5 py-5 sm:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-surface hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-surface-2 pt-4">
                <Link
                  to="/auth"
                  state={{ mode: "login" }}
                  className="rounded-full border border-surface-2 px-4 py-3 text-center text-sm font-semibold"
                >
                  Sign in
                </Link>
                <Link
                  to="/auth"
                  state={{ mode: "signup" }}
                  className="rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
                >
                  Get started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pb-32 lg:pt-44">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_20%,hsl(var(--primary)/0.13),transparent_35%),radial-gradient(circle_at_15%_40%,hsl(var(--accent)/0.07),transparent_30%)]" />
          <div className="absolute inset-0 -z-10 opacity-[0.035] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px]" />

          <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.08] px-3.5 py-2 text-xs font-semibold tracking-wide text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Built for real-world conversation
              </div>

              <h1 className="max-w-3xl font-serif text-[3.35rem] leading-[0.98] tracking-[-0.035em] sm:text-7xl lg:text-[5.35rem]">
                Learn a language by
                <span className="block text-primary">actually speaking it.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                TalkShore turns language learning into guided, practical conversation. Prepare with focused lessons, speak in small live groups, and grow more confident every time you show up.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/auth"
                  state={{ mode: "signup" }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.65)] transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  Begin your first voyage
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-surface-2 bg-surface/40 px-7 py-4 text-sm font-semibold transition hover:border-primary/35 hover:bg-surface"
                >
                  <Play size={16} className="fill-current" />
                  See how it works
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                {["Free to begin", "No credit card", "Learn at your level"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl" />
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0e1d33] shadow-[0_30px_100px_-30px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Anchor size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Live Shore</p>
                      <p className="text-xs text-muted-foreground">Spanish · Everyday life</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Live
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 sm:gap-3 sm:p-4">
                  {[
                    ["EV", "Elena", "Guide"],
                    ["AK", "Amara", "Speaking"],
                    ["JM", "Jon", "Listening"],
                    ["YOU", "You", "Ready"],
                  ].map(([initials, name, status], index) => (
                    <div
                      key={name}
                      className={`relative flex aspect-[1.35] flex-col items-center justify-center rounded-2xl border bg-[#132640] ${index === 1 ? "border-accent/50 shadow-[inset_0_0_0_1px_hsl(var(--accent)/0.12)]" : "border-white/[0.06]"}`}
                    >
                      <div className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold sm:h-14 sm:w-14 ${index === 0 ? "bg-primary text-primary-foreground" : "bg-surface-2 text-foreground"}`}>
                        {initials}
                      </div>
                      <p className="mt-2 text-xs font-semibold sm:text-sm">{name}</p>
                      <p className={`mt-0.5 text-[10px] sm:text-xs ${index === 1 ? "text-accent" : "text-muted-foreground"}`}>{status}</p>
                      {index === 1 && <div className="absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground"><Mic2 size={12} /></div>}
                    </div>
                  ))}
                </div>

                <div className="mx-4 mb-4 rounded-2xl border border-white/[0.07] bg-background/50 p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles size={18} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Conversation prompt</p>
                      <p className="mt-1.5 text-sm leading-6 text-foreground/90">Tell the group about a place in your city you would recommend—and why.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-3 hidden w-48 rounded-2xl border border-white/10 bg-surface p-4 shadow-2xl sm:block lg:-left-12">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent"><Star size={18} className="fill-current" /></div>
                  <div><p className="text-sm font-semibold">Confidence grows</p><p className="mt-0.5 text-xs text-muted-foreground">One conversation at a time</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.07] bg-surface/25 py-7">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
            <p className="text-sm font-medium text-muted-foreground">Built for the moments when knowing the words is not enough.</p>
            <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-semibold text-foreground/80">
              <span className="inline-flex items-center gap-2"><Globe2 size={16} className="text-primary" /> Travel confidently</span>
              <span className="inline-flex items-center gap-2"><MessageCircleMore size={16} className="text-primary" /> Connect naturally</span>
              <span className="inline-flex items-center gap-2"><Compass size={16} className="text-primary" /> Speak at work</span>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Your learning journey</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">From hesitation to real conversation.</h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">Every voyage follows a simple rhythm: understand the situation, prepare what to say, then use it with real people.</p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {steps.map(({ number, icon: Icon, title, body }) => (
                <article key={number} className="group relative overflow-hidden rounded-3xl border border-surface-2 bg-surface/55 p-7 transition hover:-translate-y-1 hover:border-primary/30 sm:p-8">
                  <span className="absolute right-6 top-5 font-serif text-6xl text-white/[0.035]">{number}</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary"><Icon size={22} /></div>
                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Step {number}</p>
                  <h3 className="mt-3 font-serif text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-24 border-y border-white/[0.07] bg-surface/25 py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-[2rem] border border-white/10 bg-surface p-5 shadow-2xl sm:p-7">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Voyage Prep</p><h3 className="mt-2 font-serif text-2xl">Making plans with friends</h3></div>
                  <span className="rounded-full border border-surface-2 px-3 py-1.5 text-xs font-semibold text-muted-foreground">12 min</span>
                </div>
                <div className="mt-6 h-2 overflow-hidden rounded-full bg-background"><div className="h-full w-[68%] rounded-full bg-primary" /></div>
                <div className="mt-7 space-y-3">
                  {["Suggest a time and place", "Respond naturally", "Change a plan politely"].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-background/35 p-4">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full ${index < 2 ? "bg-accent/10 text-accent" : "bg-surface-2 text-muted-foreground"}`}>{index < 2 ? <Check size={15} /> : index + 1}</span>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <button type="button" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground">Continue preparation <ArrowRight size={16} /></button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Designed around speaking</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">A complete practice loop—not another vocabulary app.</h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">TalkShore connects the work you do alone with the conversations you want to have. Each part of the product prepares you for the next.</p>
              <div className="mt-9 grid gap-6 sm:grid-cols-2">
                {benefits.map(({ icon: Icon, title, body }) => (
                  <div key={title}>
                    <Icon size={22} className="text-primary" />
                    <h3 className="mt-4 text-base font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="guides" className="scroll-mt-24 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.7fr]">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Human guidance matters</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">A good guide makes speaking feel possible.</h2>
              </div>
              <p className="text-base leading-7 text-muted-foreground">TalkShore guides create structure, invite quieter voices in, and help the group stay in the language without turning every mistake into a lesson.</p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {[
                { initials: "EV", specialty: "Everyday Spanish", focus: "Warm, practical conversation" },
                { initials: "CL", specialty: "Natural French", focus: "Tone, culture, and confidence" },
                { initials: "HT", specialty: "Japanese foundations", focus: "Patient, structured practice" },
              ].map((guide, index) => (
                <article key={guide.initials} className="rounded-3xl border border-surface-2 bg-surface/55 p-6">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl font-serif text-xl ${index === 1 ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>{guide.initials}</div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1.5 text-[11px] font-bold text-accent"><ShieldCheck size={13} /> Verified guide</span>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl">{guide.specialty}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{guide.focus}</p>
                  <div className="mt-6 flex items-center gap-4 border-t border-surface-2 pt-5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Users size={14} /> Small groups</span>
                    <span className="inline-flex items-center gap-1.5"><Clock3 size={14} /> Live sessions</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 border-y border-white/[0.07] bg-surface/25 py-24 sm:py-32">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Start without pressure</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Your first step is free.</h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">Create your profile, choose your language and level, and explore the TalkShore experience before deciding how far you want to sail.</p>
            </div>

            <div className="rounded-[2rem] border border-primary/30 bg-surface p-7 shadow-[0_25px_80px_-35px_hsl(var(--primary)/0.5)] sm:p-9">
              <div className="flex flex-col justify-between gap-6 border-b border-surface-2 pb-7 sm:flex-row sm:items-center">
                <div><p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Explorer access</p><h3 className="mt-2 font-serif text-3xl">Begin your voyage</h3></div>
                <div className="sm:text-right"><p className="font-serif text-4xl">Free</p><p className="mt-1 text-xs text-muted-foreground">No credit card required</p></div>
              </div>
              <div className="grid gap-3 py-7 sm:grid-cols-2">
                {["Personal learner profile", "Level and goal onboarding", "Voyage preparation access", "Live shore discovery", "Solo speaking practice", "Progress overview"].map((feature) => (
                  <span key={feature} className="flex items-center gap-2.5 text-sm"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"><Check size={12} strokeWidth={3} /></span>{feature}</span>
                ))}
              </div>
              <Link to="/auth" state={{ mode: "signup" }} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition hover:brightness-105">Create your free account <ArrowRight size={17} /></Link>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Questions, answered</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">Know before you board.</h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">TalkShore is built to make the first conversation feel less intimidating, not more complicated.</p>
            </div>

            <div className="divide-y divide-surface-2 border-y border-surface-2">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.question}>
                    <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                      <span className="font-semibold">{faq.question}</span>
                      <ChevronDown size={19} className={`shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && <p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-muted-foreground">{faq.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-6 sm:pb-28 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-primary/25 bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12 sm:py-20">
            <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_10%,white_0,transparent_35%),radial-gradient(circle_at_85%_90%,white_0,transparent_30%)]" />
            <div className="relative mx-auto max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-70">The next word is yours</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">Stop waiting to feel ready. Start speaking.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 opacity-75 sm:text-base">Your confidence will not arrive before the conversation. It grows inside it—with the right preparation and the right people around you.</p>
              <Link to="/auth" state={{ mode: "signup" }} className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-background px-7 py-4 text-sm font-bold text-foreground transition hover:-translate-y-0.5">Begin your first voyage <ArrowRight size={17} /></Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-6 text-muted-foreground">Guided language practice for people who want to feel at home in real conversation.</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">Explore</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              {navigation.map((item) => <a key={item.href} href={item.href} className="transition hover:text-foreground">{item.label}</a>)}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">Account</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link to="/auth" state={{ mode: "login" }} className="transition hover:text-foreground">Sign in</Link>
              <Link to="/auth" state={{ mode: "signup" }} className="transition hover:text-foreground">Create account</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.07]">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>© {new Date().getFullYear()} TalkShore. All rights reserved.</p>
            <p>Learn with courage. Speak with confidence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
