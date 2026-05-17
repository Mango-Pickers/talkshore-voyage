import {
  Bell,
  Video,
  Upload,
  User,
  Home,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useApp } from "@/hooks/useApp";

import Logo from "@/components/Logo";

/* ================= COMPONENT ================= */

const GuideDashboard = () => {
  const {
    profile,
    user,
  } = useApp();

  /* ================= USER DISPLAY ================= */

  const firstName =
    profile?.full_name?.split(
      " "
    )[0] ||
    user?.user_metadata
      ?.first_name ||
    "Guide";

  const userInitial =
    firstName.charAt(0);

  /* ================= MOCK DATA ================= */

  const liveSessions = [
    {
      id: 1,

      title:
        "Spanish Market Conversations",

      learners: 12,

      level: "A2",
    },

    {
      id: 2,

      title:
        "French Travel Practice",

      learners: 8,

      level: "B1",
    },
  ];

  const uploadedResources = [
    {
      title:
        "Restaurant Vocabulary Pack",

      type:
        "Voyage Prep",
    },

    {
      title:
        "Airport Conversation Guide",

      type:
        "Ports of Call",
    },
  ];

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
        {/* ================= TOP BAR ================= */}

        <div className="flex items-center justify-between mb-8">
          <Logo />

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition">
              <Bell size={20} />

              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </button>

            <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center text-sm font-medium">
              {userInitial}
            </div>
          </div>
        </div>

        {/* ================= HERO ================= */}

        <div className="ts-card p-8 mb-8 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,#f3b64c,transparent_40%)]" />

          <div className="relative z-10">
            <h1 className="font-serif text-4xl md:text-5xl mb-3">
              Welcome Aboard,
              {" "}
              {firstName}
            </h1>

            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Guide learners through
              immersive language
              conversations, host
              live shores, and grow
              your TalkShore
              community.
            </p>
          </div>
        </div>

        {/* ================= QUICK ACTIONS ================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {[
            {
              icon: Home,

              label: "Home",
            },

            {
              icon: Video,

              label:
                "Live Shores",
            },

            {
              icon: Upload,

              label:
                "Upload Resources",
            },

            {
              icon: User,

              label:
                "Profile",
            },
          ].map(
            ({
              icon: Icon,
              label,
            }) => (
              <button
                key={label}
                className="ts-card p-6 flex flex-col items-center justify-center gap-4 ts-hover transition-all hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon
                    size={24}
                    className="text-primary"
                  />
                </div>

                <span className="text-sm font-medium">
                  {label}
                </span>
              </button>
            )
          )}
        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            {
              label:
                "Live Shores",

              value: 8,
            },

            {
              label:
                "Learners Guided",

              value: 124,
            },

            {
              label:
                "Resources Uploaded",

              value: 18,
            },

            {
              label:
                "Guide Rating",

              value: "4.9",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="ts-card p-6"
            >
              <div className="font-serif text-4xl text-primary mb-2">
                {stat.value}
              </div>

              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ================= LIVE SHORES ================= */}

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-3xl">
            Upcoming Shores
          </h2>

          <button className="text-sm text-muted-foreground hover:text-foreground transition">
            Create shore
          </button>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-3 mb-10">
          {liveSessions.map(
            (session) => (
              <div
                key={session.id}
                className="ts-card p-6 min-w-[320px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    Live Shore
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {
                      session.level
                    }
                  </span>
                </div>

                <p className="font-serif text-2xl mb-6 leading-snug">
                  {
                    session.title
                  }
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2 text-muted-foreground">
                    <Users size={14} />

                    {
                      session.learners
                    }
                    {" "}
                    learners
                  </span>

                  <button className="bg-primary text-primary-foreground text-sm px-5 py-2 rounded-full hover:opacity-90 transition">
                    Open
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* ================= RESOURCE UPLOADS ================= */}

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-3xl">
            Uploaded Resources
          </h2>

          <Link
            to="/app/ports"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            View learner side
          </Link>
        </div>

        <div className="space-y-4 mb-10">
          {uploadedResources.map(
            (resource) => (
              <div
                key={
                  resource.title
                }
                className="ts-card p-5 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-lg">
                    {
                      resource.title
                    }
                  </div>

                  <div className="text-sm text-muted-foreground mt-1">
                    {
                      resource.type
                    }
                  </div>
                </div>

                <button className="border border-surface-2 px-5 py-2 rounded-full text-sm hover:bg-surface transition">
                  Manage
                </button>
              </div>
            )
          )}
        </div>

        {/* ================= GUIDE PROFILE ================= */}

        <h2 className="font-serif text-3xl mb-4">
          Guide Profile
        </h2>

        <div className="ts-card p-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center text-xl font-medium">
              {userInitial}
            </div>

            <div>
              <div className="font-serif text-3xl">
                {firstName}
              </div>

              <div className="text-sm text-muted-foreground mt-1">
                Verified TalkShore
                Guide
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDashboard;