import { useState } from "react";
import { Play, X, Eye } from "lucide-react";
import { videos, guides, languages } from "@/data/mockData";

const PortsOfCall = () => {
  const [filter, setFilter] = useState("all");
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  const featured = videos.find((v) => v.featured);
  const list = videos.filter((v) => !v.featured && (filter === "all" || v.language_code === filter));
  const open = videos.find((v) => v.id === openVideo);

  const guideName = (id: string) => guides.find((g) => g.id === id)?.name || "Guide";

  return (
    <div className="animate-fade-in">
      <h1 className="font-serif text-4xl mb-1">Ports of Call</h1>
      <p className="text-muted-foreground mb-6">Watch how it's done before you do it.</p>

      {featured && (
        <button onClick={() => setOpenVideo(featured.id)} className="ts-card p-0 overflow-hidden w-full text-left ts-hover mb-6 group">
          <div className="relative aspect-video bg-gradient-to-br from-surface-2 to-surface flex items-center justify-center">
            <div className="absolute inset-0 bg-background/30" />
            <div className="relative w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:scale-105 transition">
              <Play size={24} fill="currentColor" />
            </div>
            <span className="absolute top-3 left-3 text-xs bg-background/70 backdrop-blur px-2 py-1 rounded-full">{featured.scenario}</span>
            <span className="absolute bottom-3 right-3 text-xs bg-background/70 backdrop-blur px-2 py-1 rounded-full">{featured.duration}</span>
          </div>
          <div className="p-4">
            <h3 className="font-serif text-xl mb-1">{featured.title}</h3>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span>{guideName(featured.guide_id)}</span>
              <span>·</span>
              <span className="uppercase">{featured.language_code}</span>
              <span className="text-accent ml-1">{featured.level}</span>
            </div>
          </div>
        </button>
      )}

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {[{ code: "all", name: "All", flag: "" }, ...languages.slice(0, 4)].map((l: any) => {
          const active = filter === l.code;
          return (
            <button
              key={l.code}
              onClick={() => setFilter(l.code)}
              className={`px-4 py-1.5 rounded-full text-sm border whitespace-nowrap transition ${
                active ? "bg-primary text-primary-foreground border-primary" : "border-surface-2 text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.flag} {l.name}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {list.map((v) => (
          <button key={v.id} onClick={() => setOpenVideo(v.id)} className="ts-card overflow-hidden text-left ts-hover group">
            <div className="relative aspect-video bg-gradient-to-br from-surface-2 to-surface flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center group-hover:scale-110 transition">
                <Play size={16} fill="currentColor" />
              </div>
              <span className="absolute bottom-2 right-2 text-[10px] bg-background/70 px-1.5 py-0.5 rounded">{v.duration}</span>
            </div>
            <div className="p-3">
              <div className="text-[10px] text-accent mb-1 uppercase tracking-wide">{v.scenario}</div>
              <h3 className="text-sm font-medium leading-snug mb-2 line-clamp-2">{v.title}</h3>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>{guideName(v.guide_id)} · {v.level}</span>
                <span className="flex items-center gap-1"><Eye size={10} /> {v.views.toLocaleString()}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div onClick={() => setOpenVideo(null)} className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl">
            <div className="flex justify-end mb-3">
              <button onClick={() => setOpenVideo(null)} className="text-muted-foreground hover:text-foreground p-2"><X /></button>
            </div>
            <div className="ts-card overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-surface-2 to-surface flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Play size={28} fill="currentColor" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                  <div className="h-1 bg-surface-2 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-primary w-1/3" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>02:48</span>
                    <span>{open.duration}</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-2xl mb-1">{open.title}</h3>
                <div className="text-sm text-muted-foreground">{guideName(open.guide_id)} · {open.scenario} · {open.level}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortsOfCall;
