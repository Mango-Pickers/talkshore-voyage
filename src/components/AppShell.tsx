import { Outlet, NavLink } from "react-router-dom";

const AppShell = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* SIDEBAR */}

      <aside className="w-64 border-r border-surface-2 p-6">
        <h1 className="font-serif text-3xl text-primary mb-10">
          TalkShore
        </h1>

        <nav className="space-y-2">
          <NavLink
            to="/app"
            end
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/app/prep"
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface"
              }`
            }
          >
            Voyage Prep
          </NavLink>

          <NavLink
            to="/app/shore"
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface"
              }`
            }
          >
            Shore
          </NavLink>

          <NavLink
            to="/app/sail"
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface"
              }`
            }
          >
            Solo Sail
          </NavLink>

          <NavLink
            to="/app/ports"
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface"
              }`
            }
          >
            Ports
          </NavLink>

          <NavLink
            to="/app/profile"
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface"
              }`
            }
          >
            Profile
          </NavLink>
        </nav>
      </aside>

      {/* PAGE */}

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;