import { useEffect, useState } from "react";
import { X, Mic, MicOff, PhoneOff, ShieldCheck } from "lucide-react";
import { sessions, guides } from "@/data/mockData";

type Props = { sessionId: string | null; onClose: () => void };

const mockMessagesByLang: Record<string, string[]> = {
  es: ["¡Hola a todos!", "¿De dónde son?", "Estoy aprendiendo español hace seis meses.", "Buen acento, sigue así.", "¿Cuánto cuesta este pan?"],
  it: ["Ciao a tutti!", "Da dove venite?", "Penso che sia una buona idea.", "Non sono completamente d'accordo.", "Possiamo riprendere?"],
  fr: ["Bonjour tout le monde !", "D'où venez-vous ?", "Je suis ravi d'être ici.", "Pouvez-vous répéter ?", "À très vite."],
  jp: ["みなさん、こんにちは。", "出身はどちらですか？", "ゆっくりお願いします。", "なるほど、ありがとうございます。", "また今度。"],
};

const SessionModal = ({ sessionId, onClose }: Props) => {
  const [muted, setMuted] = useState(false);
  const [feed, setFeed] = useState<{ id: number; who: string; text: string }[]>([]);

  const session = sessions.find((s) => s.id === sessionId);
  const guide = session ? guides.find((g) => g.id === session.guide_id) : null;

  useEffect(() => {
    if (!session) return;
    setFeed([]);
    const msgs = mockMessagesByLang[session.language_code] || mockMessagesByLang.es;
    const speakers = ["Lucia", "Tomas", "Aiko", "Pierre", "You"];
    let i = 0;
    const interval = setInterval(() => {
      setFeed((f) => [
        ...f,
        { id: Date.now() + i, who: speakers[i % speakers.length], text: msgs[i % msgs.length] },
      ]);
      i++;
      if (i > 12) clearInterval(interval);
    }, 1600);
    return () => clearInterval(interval);
  }, [session]);

  if (!session || !guide) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-stretch justify-center animate-fade-in"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl flex flex-col">
        {/* header */}
        <div className="px-6 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-accent pulse-dot" /> Live · {session.participants} aboard
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-2">
            <X />
          </button>
        </div>

        {/* guide */}
        <div className="flex-1 px-6 flex flex-col items-center justify-start pt-6">
          <div className="w-24 h-24 rounded-full bg-surface border border-surface-2 flex items-center justify-center text-2xl font-serif mb-3">
            {guide.initials}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">{guide.name}</span>
            <span className="text-primary">⚓</span>
          </div>
          <h2 className="font-serif text-3xl mt-4 text-center">{session.scenario}</h2>
          <p className="text-sm text-muted-foreground mt-1">{session.language_code.toUpperCase()} · {session.level}</p>

          {/* participants row */}
          <div className="flex -space-x-2 mt-5">
            {Array.from({ length: Math.min(8, session.participants) }).map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-surface-2 text-xs flex items-center justify-center">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            {session.participants > 8 && (
              <div className="w-8 h-8 rounded-full border-2 border-background bg-surface text-[10px] flex items-center justify-center text-muted-foreground">
                +{session.participants - 8}
              </div>
            )}
          </div>

          {/* feed */}
          <div className="w-full mt-6 ts-card p-4 max-h-64 overflow-y-auto space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <ShieldCheck size={14} className="text-accent" /> AI-monitored conversation
            </div>
            {feed.length === 0 && <p className="text-sm text-muted-foreground italic">Waiting for the room to warm up…</p>}
            {feed.map((m) => (
              <div key={m.id} className="text-sm animate-fade-in">
                <span className="text-muted-foreground mr-2">{m.who}:</span>
                <span>{m.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* controls */}
        <div className="p-6 flex items-center justify-center gap-4">
          <button
            onClick={() => setMuted(!muted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center border transition ${
              muted ? "bg-surface-2 border-surface-2 text-muted-foreground" : "bg-surface border-surface-2 text-foreground"
            }`}
          >
            {muted ? <MicOff /> : <Mic />}
          </button>
          <button
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-90"
            aria-label="Leave shore"
          >
            <PhoneOff />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
