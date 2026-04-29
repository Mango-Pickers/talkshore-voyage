import { Plus, ChevronRight, LogOut } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { profile, setIsOnboarded } = useApp();
  const nav = useNavigate();

  const handleLogout = () => {
    setIsOnboarded(false);
    nav("/");
  };

  return (
    <div className="animate-fade-in">
      <h1 className="font-serif text-4xl mb-6">The Captain's Log</h1>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full bg-surface-2 border border-surface-2 flex items-center justify-center text-3xl font-serif">
            {profile.avatar_initials}
          </div>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
            {profile.streak_days}d streak
          </span>
        </div>
        <div className="font-serif text-2xl">{profile.name}</div>
        <div className="text-sm text-muted-foreground">Sailing since November 2024</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Shores Joined", value: profile.stats.shores_joined },
          { label: "Hours Spoken", value: profile.stats.hours_spoken },
          { label: "Guides", value: profile.stats.guides_sailed_with },
          { label: "Languages", value: profile.stats.languages_active },
        ].map((s) => (
          <div key={s.label} className="ts-card p-4 text-center">
            <div className="font-serif text-2xl text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Active languages */}
      <h2 className="font-serif text-xl mb-3">Active Languages</h2>
      <div className="space-y-3 mb-3">
        {profile.active_languages.map((l) => {
          const total = l.sessions_completed + l.sessions_to_next;
          const pct = (l.sessions_completed / total) * 100;
          return (
            <div key={l.code} className="ts-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{l.flag}</span>
                  <div>
                    <div className="font-medium">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.sessions_completed} of {total} sessions to next level</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full">{l.level}</span>
              </div>
              <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      {profile.resting_languages.map((l) => (
        <div key={l.code} className="flex items-center justify-between py-3 px-4 mb-2 text-sm text-muted-foreground italic">
          <span>{l.flag} {l.name} — resting in port</span>
        </div>
      ))}
      <button className="w-full ts-card p-4 ts-hover text-sm text-muted-foreground flex items-center justify-center gap-2 mb-8">
        <Plus size={16} /> Add a new language
      </button>

      {/* Log */}
      <h2 className="font-serif text-xl mb-3">The Log</h2>
      <div className="ts-card divide-y divide-surface-2 mb-8">
        {profile.log.map((l) => (
          <div key={l.id} className="p-4 text-sm">
            <div>{l.text}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {l.when}{l.guide ? ` · Guided by ${l.guide}` : ""}
            </div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <h2 className="font-serif text-xl mb-3">Settings</h2>
      <div className="ts-card divide-y divide-surface-2 mb-6">
        {["Account Settings", "Subscription and Billing", "Language Settings", "Notifications", "Privacy and Safety"].map((s) => (
          <button key={s} className="w-full p-4 flex items-center justify-between text-sm hover:bg-surface-2/40 transition">
            <span>{s}</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="w-full ts-card p-4 text-destructive font-medium hover:bg-destructive/10 transition flex items-center justify-center gap-2"
      >
        <LogOut size={16} /> Disembark
      </button>
    </div>
  );
};

export default Profile;
