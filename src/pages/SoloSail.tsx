import { useEffect, useRef, useState } from "react";
import { Mic, Send, X } from "lucide-react";
import { useApp } from "@/context/AppContext";

type Msg = { id: number; from: "ai" | "user"; text: string };

const starters = ["Greet someone", "Order food", "Ask for directions", "Talk about your day"];
const aiOpener = "¡Hola! Soy tu guía para hoy. ¿De qué quieres hablar?";
const aiReplies = [
  "¡Muy bien! Cuéntame más.",
  "Perfecto. ¿Y cómo te sentiste?",
  "Buena frase. Intenta decirlo más rápido la próxima vez.",
  "Genial. Ahora hagamos un pequeño juego de roles.",
];

const SoloSail = () => {
  const { activeLanguage } = useApp();
  const [messages, setMessages] = useState<Msg[]>([{ id: 1, from: "ai", text: aiOpener }]);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: Date.now(), from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => {
        const next = [...m, { id: Date.now() + 1, from: "ai" as const, text: aiReplies[m.length % aiReplies.length] }];
        if (next.length >= 11) setTimeout(() => setShowSummary(true), 500);
        return next;
      });
    }, 700);
  };

  const handleMic = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      send("Hola, me llamo Abraham y aprendo español.");
    }, 1500);
  };

  return (
    <div className="animate-fade-in flex flex-col h-[calc(100vh-9rem)]">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="font-serif text-4xl">Solo Sail</h1>
          <p className="text-muted-foreground text-sm">AI conversation practice.</p>
        </div>
        <span className="text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full uppercase">{activeLanguage}</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
        {starters.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="px-3 py-1.5 rounded-full text-xs border border-surface-2 text-muted-foreground hover:text-foreground hover:bg-surface whitespace-nowrap transition"
          >
            {s}
          </button>
        ))}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 pb-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm animate-fade-in ${
                m.from === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-accent/15 text-foreground rounded-bl-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="ts-card p-2 flex items-center gap-2">
        <button
          onClick={handleMic}
          className={`w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 ${recording ? "recording-ring" : ""}`}
          aria-label="Voice input"
        >
          <Mic size={18} />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder={`Speak or type in ${activeLanguage === "es" ? "Spanish" : "your language"}`}
          className="flex-1 bg-transparent px-2 text-sm focus:outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={() => send(input)}
          className="w-10 h-10 rounded-full bg-surface-2 text-foreground flex items-center justify-center hover:bg-surface transition"
        >
          <Send size={16} />
        </button>
      </div>

      {/* Summary */}
      {showSummary && (
        <div onClick={() => setShowSummary(false)} className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end justify-center p-4 animate-fade-in">
          <div onClick={(e) => e.stopPropagation()} className="ts-card w-full max-w-lg p-6 animate-slide-up">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-serif text-2xl">Session summary</h3>
              <button onClick={() => setShowSummary(false)} className="text-muted-foreground hover:text-foreground"><X /></button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              You did well with greetings. Work on sentence speed. Your next shore: <span className="text-foreground">At the Market — Thursday 6PM.</span>
            </p>
            <button className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-full hover:opacity-90">
              Book my prep time
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoloSail;
