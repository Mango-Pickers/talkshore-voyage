import { Anchor } from "lucide-react";

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <Anchor className="text-primary" size={22} strokeWidth={2.2} />
    <span className="font-serif text-xl text-foreground tracking-tight">
      Talk<span className="text-primary">Shore</span>
    </span>
  </div>
);

export default Logo;
