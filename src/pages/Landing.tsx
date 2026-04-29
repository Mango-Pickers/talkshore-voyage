import { Link } from "react-router-dom";
import { Anchor, Compass, Shield, Play, ArrowRight, CircleDot } from "lucide-react";
import Logo from "@/components/Logo";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-30 backdrop-blur bg-background/80 border-b border-surface-2">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#guides" className="hover:text-foreground transition-colors">Guides</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground">Login</button>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-sm px-4 py-2 rounded-full hover:opacity-90 transition"
            >
              Begin Your Journey
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-surface-2 bg-surface rounded-full px-3 py-1 mb-6">
              <CircleDot size={12} className="text-accent" /> Live shores boarding right now
            </div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
              Arrive <span className="text-primary">fluent.</span>
              <br />
              Start speaking from shore one.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              TalkShore guides adult learners into real conversation through live guided sessions,
              scenario-based preparation, and AI practice — structured like a voyage, built for fluency.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3 rounded-full hover:opacity-90 transition"
              >
                Board Now <ArrowRight size={18} />
              </Link>
              <button className="inline-flex items-center gap-2 border border-surface-2 text-foreground px-5 py-3 rounded-full hover:bg-surface transition">
                <Play size={16} /> Watch how it works
              </button>
            </div>
          </div>

          {/* Mockup */}
          <div className="relative">
            <div className="ts-card p-5 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <Logo />
                <span className="text-xs text-muted-foreground">The Dock</span>
              </div>
              <p className="text-sm text-muted-foreground">Good evening,</p>
              <h3 className="font-serif text-2xl mb-1">Abraham.</h3>
              <p className="text-sm text-muted-foreground mb-5">Your next shore boards in 2 hours.</p>

              <div className="bg-surface-2 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">🇪🇸 Spanish</span>
                  <span className="text-accent font-medium">B1</span>
                </div>
                <p className="text-sm mb-2">Leg 3 of 7 — Expressing Opinions</p>
                <div className="h-1 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[42%]" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs mb-3">
                <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
                <span className="text-muted-foreground">Boarding now</span>
              </div>

              {[
                { name: "Elena V.", scenario: "At the Market", count: 8 },
                { name: "Marco B.", scenario: "Sharing Opinions", count: 14 },
              ].map((s) => (
                <div key={s.name} className="bg-surface-2 rounded-xl p-3 mb-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{s.scenario}</div>
                    <div className="text-xs text-muted-foreground">{s.name} · {s.count} aboard</div>
                  </div>
                  <button className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full">Board</button>
                </div>
              ))}
            </div>
            <div className="absolute -inset-4 bg-primary/10 blur-3xl -z-10 rounded-full" />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="features" className="py-16 border-t border-surface-2">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Anchor, title: "Guided by verified Guides", body: "Every shore is led by a Guide with proven fluency and 1000+ day language streaks." },
              { icon: Compass, title: "Every lesson leads to a live shore", body: "Voyage Prep is never theoretical. It is the warm-up to a real conversation booked on your calendar." },
              { icon: Shield, title: "AI-monitored, always safe", body: "Live sessions are watched. No external links. No contact sharing. Just conversation." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="ts-card p-6 ts-hover">
                <Icon className="text-primary mb-4" size={28} />
                <h3 className="font-serif text-xl mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-t border-surface-2">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-serif text-4xl mb-12 text-center">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Choose your language and level", d: "A short onboarding sets your course." },
              { n: "02", t: "Prepare with scenario lessons", d: "Each prep ties to a real upcoming live session." },
              { n: "03", t: "Board a Shore and speak", d: "Live, with a verified Guide and other learners." },
            ].map((s) => (
              <div key={s.n} className="ts-card p-6">
                <div className="text-primary font-serif text-3xl mb-3">{s.n}</div>
                <h3 className="font-serif text-xl mb-2">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social strip */}
      <section className="py-12 border-t border-surface-2 bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="font-serif text-2xl md:text-3xl text-muted-foreground">
            Learners across <span className="text-foreground">14 languages</span>. Live shores every hour.
            <span className="text-foreground"> Zero drills.</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-surface-2">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground font-serif">Where fluency finally arrives.</p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">About</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
