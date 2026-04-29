import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

const AppShell = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pb-32">
      <div className="mx-auto max-w-2xl px-5 pt-6">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default AppShell;
