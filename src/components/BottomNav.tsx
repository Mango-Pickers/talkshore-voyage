import { NavLink, useLocation } from "react-router-dom";
import { Home, BookOpen, Anchor, Mic, User } from "lucide-react";

const items = [
  { to: "/app", icon: Home, label: "Home", end: true },
  { to: "/app/prep", icon: BookOpen, label: "Prep" },
  { to: "/app/shore", icon: Anchor, label: "Shore" },
  { to: "/app/sail", icon: Mic, label: "Sail" },
  { to: "/app/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const loc = useLocation();
  // hide on landing/onboarding
  if (!loc.pathname.startsWith("/app")) return null;

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-surface border border-surface-2 rounded-[32px] px-3 py-2 shadow-nav backdrop-blur"
    >
      <ul className="flex items-center gap-1">
        {items.map(({ to, icon: Icon, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center px-4 py-2 rounded-2xl transition-colors text-[11px] font-medium ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} fill={isActive ? "currentColor" : "none"} strokeWidth={isActive ? 1.5 : 2} />
                  <span className="mt-0.5">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
