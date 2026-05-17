import {
  Link,
} from "react-router-dom";

import {
  Anchor,
  Compass,
  Shield,
  Play,
  ArrowRight,
  CircleDot,
} from "lucide-react";

import Logo from "@/components/Logo";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}

      <header className="fixed top-0 inset-x-0 z-30 backdrop-blur bg-background/80 border-b border-surface-2">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </a>

            <a
              href="#guides"
              className="hover:text-foreground transition-colors"
            >
              Guides
            </a>

            <a
              href="#pricing"
              className="hover:text-foreground transition-colors"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {/* LOGIN */}

            <Link
              to="/auth"
              state={{
                mode: "login",
              }}
              className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>

            {/* SIGNUP */}

            <Link
              to="/auth"
              state={{
                mode: "signup",
              }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-sm px-4 py-2 rounded-full hover:opacity-90 transition"
            >
              Begin Your Journey

              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}

      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-surface-2 bg-surface rounded-full px-3 py-1 mb-6">
              <CircleDot
                size={12}
                className="text-accent"
              />

              Live shores boarding
              right now
            </div>

            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
              Arrive{" "}
              <span className="text-primary">
                fluent.
              </span>

              <br />

              Start speaking from
              shore one.
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              TalkShore guides adult
              learners into real
              conversation through
              immersive voyage-based
              learning.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/auth"
                state={{
                  mode: "signup",
                }}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3 rounded-full hover:opacity-90 transition"
              >
                Board Now

                <ArrowRight
                  size={18}
                />
              </Link>

              <button className="inline-flex items-center gap-2 border border-surface-2 text-foreground px-5 py-3 rounded-full hover:bg-surface transition">
                <Play size={16} />

                Watch how it works
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}

          <div className="relative">
            <div className="ts-card p-5">
              <div className="flex items-center justify-between mb-4">
                <Logo />

                <span className="text-xs text-muted-foreground">
                  The Dock
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                Good evening,
              </p>

              <h3 className="font-serif text-2xl mb-1">
                Voyager.
              </h3>

              <p className="text-sm text-muted-foreground mb-5">
                Your next shore
                boards in 2 hours.
              </p>

              <div className="bg-surface-2 rounded-xl p-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">
                    🇪🇸 Spanish
                  </span>

                  <span className="text-accent font-medium">
                    B1
                  </span>
                </div>

                <div className="h-1 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[42%]" />
                </div>
              </div>
            </div>

            <div className="absolute -inset-4 bg-primary/10 blur-3xl -z-10 rounded-full" />
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="py-16 border-t border-surface-2"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Anchor,
                title:
                  "Guided by verified Guides",
                body: "Every shore is led by experienced fluent speakers.",
              },

              {
                icon: Compass,
                title:
                  "Scenario-based learning",
                body: "Every lesson prepares you for real conversation.",
              },

              {
                icon: Shield,
                title:
                  "Safe and structured",
                body: "Protected live conversation environments.",
              },
            ].map(
              ({
                icon: Icon,
                title,
                body,
              }) => (
                <div
                  key={title}
                  className="ts-card p-6"
                >
                  <Icon
                    className="text-primary mb-4"
                    size={28}
                  />

                  <h3 className="font-serif text-xl mb-2">
                    {title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {body}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;