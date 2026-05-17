import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useMemo, useCallback } from "react";
import { TRASH_ITEMS, TrashItem } from "@/data/game-data";
import { Lang, TRANSLATIONS } from "@/i18n";

const ThrowingChild = React.memo(({ throwing }: { throwing: boolean }) => {
  return (
    <svg viewBox="0 0 64 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="will-change-transform">
      <ellipse cx="32" cy="14" rx="16" ry="14" fill="#059669" />
      <circle cx="32" cy="18" r="14" fill="#fbbf24" />
      <circle cx="26" cy="15" r="3" fill="#1e1b4b" />
      <circle cx="38" cy="15" r="3" fill="#1e1b4b" />
      <circle cx="27" cy="14" r="1" fill="white" />
      <circle cx="39" cy="14" r="1" fill="white" />
      <path d="M25 22 Q32 28 39 22" fill="none" stroke="#1e1b4b" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="18" y="32" width="28" height="34" rx="9" fill="#10b981" />
      <line x1="18" y1="42" x2="5" y2="56" stroke="#fbbf24" strokeWidth="9" strokeLinecap="round" />
      {throwing
        ? <line x1="50" y1="36" x2="62" y2="20" stroke="#fbbf24" strokeWidth="9" strokeLinecap="round" />
        : <line x1="50" y1="44" x2="63" y2="58" stroke="#fbbf24" strokeWidth="9" strokeLinecap="round" />}
      <line x1="25" y1="66" x2="20" y2="94" stroke="#059669" strokeWidth="11" strokeLinecap="round" />
      <line x1="39" y1="66" x2="44" y2="94" stroke="#059669" strokeWidth="11" strokeLinecap="round" />
    </svg>
  );
});
ThrowingChild.displayName = "ThrowingChild";

interface Props {
  onComplete: (points: number, message: string) => void;
  totalPoints: number;
  lang: Lang;
}

const BINS_CONFIG = [
  { id: "blue"  as const, bg: "linear-gradient(135deg, #3b82f6, #1d4ed8)", ring: "#93c5fd", text: "#eff6ff", icon: "♻️" },
  { id: "brown" as const, bg: "linear-gradient(135deg, #d97706, #78350f)", ring: "#fde68a", text: "#fefdf0", icon: "🌿" },
  { id: "gray"  as const, bg: "linear-gradient(135deg, #6b7280, #374151)", ring: "#d1d5db", text: "#f9fafb", icon: "🗑️" },
];

export default function TrashScene({ onComplete, totalPoints, lang }: Props) {
  const t = TRANSLATIONS[lang];

  const [items] = useState<TrashItem[]>(() => 
    [...TRASH_ITEMS].sort(() => Math.random() - 0.5).slice(0, 6)
  );
  
  const [idx, setIdx]           = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [throwing, setThrowing] = useState(false);
  const [activeBin, setActiveBin] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Guardamos as listas separadas para renderizar o sumário final detalhado
  const [correctItems, setCorrectItems] = useState<TrashItem[]>([]);
  const [wrongItems, setWrongItems]     = useState<TrashItem[]>([]);

  const current = items[idx];
  const isInteracting = throwing || feedback !== null || showSuccess;

  const handleBin = useCallback((binId: "blue" | "brown" | "gray") => {
    if (isInteracting || !current) return;
    
    const ok = current.bin === binId;
    setThrowing(true); 
    setActiveBin(binId);
    
    // Feedback estrito e limpo de acção no ecrã sem travar a jogabilidade
    setFeedback({ ok, msg: ok ? "✨" : "❌" });

    setTimeout(() => {
      if (ok) {
        setCorrectItems(prev => [...prev, current]);
        setCorrectCount(c => c + 1);
      } else {
        setWrongItems(prev => [...prev, current]);
      }

      setFeedback(null); 
      setThrowing(false); 
      setActiveBin(null);
      
      const ni = idx + 1;
      if (ni >= items.length) {
        setShowSuccess(true);
        const finalScore = Math.round(((ok ? correctCount + 1 : correctCount) / items.length) * 100);
        // Tempo extra de tolerância no ecrã final para leitura completa da lista de aprendizagem
        setTimeout(() => onComplete(finalScore, t.trashScore(ok ? correctCount + 1 : correctCount, items.length)), wrongItems.length > 0 ? 8500 : 3000);
      } else { 
        setIdx(ni); 
      }
    }, 750);
  }, [isInteracting, current, idx, correctCount, items.length, onComplete, t, wrongItems.length]);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden transform-gpu select-none p-4"
      style={{ 
        fontFamily: "Outfit, sans-serif",
        background: "linear-gradient(180deg, #e0f2fe 0%, #f0fdf4 60%, #dcfce7 100%)",
      }}>

      {/* Elementos de Decoração Orgânica S subtis */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <div className="absolute rounded-full bg-emerald-200/50 filter blur-3xl w-72 h-72 -top-10 -left-10" />
        <div className="absolute rounded-full bg-blue-200/40 filter blur-3xl w-80 h-80 bottom-10 -right-10" />
      </div>

      {/* HUD Superior Premium */}
      <header className="relative z-20 flex items-center gap-3 bg-white/70 backdrop-blur-md rounded-2xl p-2.5 shadow-xs border border-white/50">
        <div className="bg-emerald-600 text-white font-black text-[11px] px-2.5 py-1 rounded-xl tracking-wider">
          {idx}/{items.length}
        </div>
        <div className="flex-1 bg-slate-200/70 rounded-full h-2.5 overflow-hidden relative">
          <motion.div 
            className="h-full rounded-full transform-gpu will-change-transform" 
            animate={{ width: `${(idx / items.length) * 100}%` }} 
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ background: "linear-gradient(90deg, #10b981, #059669)" }} 
          />
        </div>
        <div className="bg-amber-500/10 text-amber-700 border border-amber-500/20 rounded-xl px-2.5 py-1 font-black text-xs">
          ⭐ {totalPoints}
        </div>
      </header>

      {/* Zona Central: Visual de Galeria Limpa */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-grow min-h-0 py-4">
        <div className="flex items-center justify-center gap-6 max-w-sm w-full">
          
          {/* Avatar Animado */}
          <motion.div 
            className="transform-gpu will-change-transform filter drop-shadow-sm"
            style={{ width: 64, height: 100, flexShrink: 0 }}
            animate={throwing ? { rotate: [0, -10, 15, 0], scale: 1.05 } : {}}
            transition={{ duration: 0.4 }}
          >
            <ThrowingChild throwing={throwing} />
          </motion.div>

          {/* Card Flutuante Principal */}
          <div className="relative flex-1 flex items-center justify-center min-h-[180px]">
            <AnimatePresence mode="wait">
              {current && !feedback && (
                <motion.div 
                  key={current.id}
                  initial={{ scale: 0.85, opacity: 0, y: 15 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0, x: throwing ? 80 : 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  className="bg-white rounded-[2rem] shadow-xl border border-slate-100 flex flex-col items-center justify-center p-5 gap-2 text-center w-full pulse-card transform-gpu"
                >
                  <span className="floating-emoji" style={{ fontSize: "64px", lineHeight: 1 }}>
                    {current.emoji}
                  </span>
                  <div>
                    <h3 className="font-black text-slate-800 text-base tracking-tight leading-tight">
                      {current.name}
                    </h3>
                    <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mt-1">
                      {t.trashQuestion}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Alerta de Feedback Rápido */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  className={`absolute font-black text-4xl w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg ${feedback.ok ? "bg-emerald-500/20 text-emerald-600" : "bg-rose-500/20 text-rose-600"}`}
                >
                  {feedback.msg}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Zona Inferior: Contentores de Visual Limpo */}
      <footer 
        className="relative z-20 flex gap-3 max-w-xl mx-auto w-full transition-opacity"
        style={{ pointerEvents: isInteracting ? "none" : "auto" }}
      >
        {BINS_CONFIG.map(bin => {
          const isActive = activeBin === bin.id;
          const isAnyActive = activeBin !== null;
          
          return (
            <motion.button 
              key={bin.id} 
              onClick={() => handleBin(bin.id)}
              whileTap={{ scale: 0.94 }}
              animate={{ 
                scale: isActive ? 1.05 : isAnyActive ? 0.95 : 1,
                opacity: isActive ? 1 : isAnyActive ? 0.5 : 1
              }}
              className="flex-1 rounded-2xl overflow-hidden shadow-md flex flex-col border-2 transform-gpu focus:outline-none cursor-pointer"
              style={{ borderColor: bin.ring, background: bin.bg }}
              disabled={isInteracting}
            >
              <div className="w-full py-4 flex flex-col items-center justify-center gap-1">
                <span className="text-3xl filter drop-shadow-xs">{bin.icon}</span>
                <span className="font-black tracking-wide text-xs uppercase" style={{ color: bin.text }}>
                  {t.bins[bin.id]}
                </span>
              </div>
            </motion.button>
          );
        })}
      </footer>

      {/* ── PAINEL DE METRICAS E APRENDIZADO FINAL (ESTILO CANVA) ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-slate-950/40 p-4"
          >
            <motion.div 
              initial={{ scale: 0.94, opacity: 0, y: 15 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              className="bg-white rounded-[2.5rem] p-6 text-center shadow-2xl max-w-md w-full transform-gpu flex flex-col gap-4 max-h-[90vh] overflow-hidden border border-slate-50"
            >
              {/* Título */}
              <div>
                <span className="text-4xl">🌱</span>
                <h3 className="font-black text-slate-800 tracking-tight text-xl mt-1">
                  {lang === "pt" ? "Sessão Terminada!" : "Sorting Complete!"}
                </h3>
                <p className="text-emerald-600 font-black text-sm tracking-wide mt-0.5">
                  {t.trashScore(correctItems.length, items.length)}
                </p>
              </div>

              {/* Bloco 1: Itens que Acertou (Apenas Emojis Compactos) */}
              {correctItems.length > 0 && (
                <div className="text-left bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
                  <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase block mb-1.5">
                    {lang === "pt" ? "✓ Separados Corretamente:" : "✓ Successfully Sorted:"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {correctItems.map(item => (
                      <span key={item.id} className="text-xl bg-white p-1.5 rounded-xl shadow-2xs border border-slate-100" title={item.name}>
                        {item.emoji}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bloco 2: Itens que Errou + Explicações Pedagógicas */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-2 text-left pr-1 custom-scrollbar">
                {wrongItems.length > 0 ? (
                  <>
                    <span className="text-[10px] font-black tracking-wider text-rose-400 uppercase block mb-0.5">
                      {lang === "pt" ? "💡 Aprende com os erros:" : "💡 Review and Learn:"}
                    </span>
                    {wrongItems.map((item) => {
                      const matchedBin = BINS_CONFIG.find(b => b.id === item.bin);
                      return (
                        <div key={item.id} className="bg-rose-50/50 border border-rose-100 rounded-2xl p-3 flex gap-3 items-start">
                          <span className="text-2xl bg-white p-2 rounded-xl shadow-2xs shrink-0">{item.emoji}</span>
                          <div className="flex flex-col gap-0.5">
                            <h4 className="font-black text-slate-800 text-xs">
                              {item.name} ➔ <span className="underline" style={{ color: matchedBin?.bg.split(",")[1]?.trim()?.substring(0,7) || "#2563eb" }}>
                                {t.bins[item.bin]}
                              </span>
                            </h4>
                            <p className="text-slate-500 text-[11px] font-medium leading-relaxed mt-0.5">
                              {item.explanation[lang]}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-center text-white shadow-xs">
                    <p className="text-xs font-black tracking-wide">
                      {lang === "pt" 
                        ? "Excelente! Nível de separação perfeito sem qualquer erro." 
                        : "Flawless score! Perfectly sorted with zero errors."}
                    </p>
                  </div>
                )}
              </div>

              <div className="font-black text-emerald-500 text-xl tracking-tight">
                +{Math.round((correctItems.length / items.length) * 100)} ⭐
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .pulse-card { animation: cardSoftEffect 3.5s infinite ease-in-out; }
        .floating-emoji { display: inline-block; animation: emojiFloat 2.5s infinite ease-in-out; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }

        @keyframes cardSoftEffect {
          0%, 100% { transform: translateY(0px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); }
          50% { transform: translateY(-4px); box-shadow: 0 25px 30px -5px rgba(0,0,0,0.08); }
        }
        @keyframes emojiFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}