import {
  Plus,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabaseClient";

import { useApp } from "@/hooks/useApp";

const Profile = () => {
  const {
    profile,
    setIsOnboarded,
  } = useApp();

  const nav = useNavigate();

  /* ================= FIRST NAME ================= */

  const firstName =
    profile?.full_name?.split(" ")[0]
      ?.split(" ")[0] || "Voyager";

  /* ================= INITIALS ================= */

  const initials = firstName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  /* ================= LOGOUT ================= */

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setIsOnboarded(false);

    nav("/");
  };

  /* ================= FALLBACKS ================= */

  const language =
    profile?.learning_language ||
    "Spanish";

  const level =
    profile?.level || "A1";

  const goal =
    profile?.goal ||
    "Conversational fluency";

  return (
    <div className="animate-fade-in">
      {/* ================= TITLE ================= */}

      <h1 className="font-serif text-4xl mb-6">
        Your Voyage
      </h1>

      {/* ================= PROFILE ================= */}

      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full bg-surface-2 border border-surface-2 flex items-center justify-center text-3xl font-serif">
            {initials}
          </div>

          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
            7 day streak
          </span>
        </div>

        <div className="font-serif text-2xl">
          {firstName}
        </div>

        <div className="text-sm text-muted-foreground">
          Sailing with TalkShore
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          {
            label: "Shores Joined",
            value: 12,
          },

          {
            label: "Hours Spoken",
            value: 24,
          },

          {
            label: "Guides",
            value: 6,
          },

          {
            label: "Languages",
            value: 1,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="ts-card p-4 text-center"
          >
            <div className="font-serif text-2xl text-primary">
              {s.value}
            </div>

            <div className="text-xs text-muted-foreground mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ================= LANGUAGE ================= */}

      <h2 className="font-serif text-xl mb-3">
        Active Language
      </h2>

      <div className="ts-card p-4 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-medium">
              {language}
            </div>

            <div className="text-xs text-muted-foreground">
              Goal: {goal}
            </div>
          </div>

          <span className="text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full">
            {level}
          </span>
        </div>

        <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-[45%]" />
        </div>
      </div>

      {/* ================= ADD LANGUAGE ================= */}

      <button className="w-full ts-card p-4 ts-hover text-sm text-muted-foreground flex items-center justify-center gap-2 mb-8">
        <Plus size={16} />
        Add a new language
      </button>

      {/* ================= LOG ================= */}

      <h2 className="font-serif text-xl mb-3">
        Your Activity
      </h2>

      <div className="ts-card divide-y divide-surface-2 mb-8">
        {[
          {
            id: 1,
            text: "Completed a live shore session.",
            when: "2 hours ago",
          },

          {
            id: 2,
            text: "Practiced speaking drills.",
            when: "Yesterday",
          },

          {
            id: 3,
            text: "Reached A1 milestone.",
            when: "3 days ago",
          },
        ].map((log) => (
          <div
            key={log.id}
            className="p-4 text-sm"
          >
            <div>{log.text}</div>

            <div className="text-xs text-muted-foreground mt-0.5">
              {log.when}
            </div>
          </div>
        ))}
      </div>

      {/* ================= SETTINGS ================= */}

      <h2 className="font-serif text-xl mb-3">
        Settings
      </h2>

      <div className="ts-card divide-y divide-surface-2 mb-6">
        {[
          "Account Settings",

          "Subscription and Billing",

          "Language Settings",

          "Notifications",

          "Privacy and Safety",
        ].map((s) => (
          <button
            key={s}
            className="w-full p-4 flex items-center justify-between text-sm hover:bg-surface-2/40 transition"
          >
            <span>{s}</span>

            <ChevronRight
              size={16}
              className="text-muted-foreground"
            />
          </button>
        ))}
      </div>

      {/* ================= LOGOUT ================= */}

      <button
        onClick={handleLogout}
        className="w-full ts-card p-4 text-destructive font-medium hover:bg-destructive/10 transition flex items-center justify-center gap-2"
      >
        <LogOut size={16} />
        Disembark
      </button>
    </div>
  );
};

export default Profile;