import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Tap { 
  id: number; 
  litersPerMin: number; 
  name: { pt: string; en: string }; 
  icon: string;
}

// Configuração ordenada por gravidade para criar a lógica de prioridade
const TAPS_CONFIG: Tap[] = [
  { id: 2, litersPerMin: 18, name: { pt: "Chuveiro (Fuga Crítica)", en: "Shower (Critical Leak)" }, icon: "🚿" },
  { id: 1, litersPerMin: 12, name: { pt: "Torneira Principal", en: "Main Tap" }, icon: "🚰" },
  { id: 3, litersPerMin: 8,  name: { pt: "Filtro de Água", en: "Water Filter" }, icon: "💧" },
];

const WaterKid = React.memo(({ state }: { state: "sad" | "happy" | "celebrating" }) => {
  return (
    <svg viewBox="0 0 64 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="will-change-transform">
      <ellipse cx="32" cy="14" rx="16" ry="14" fill="#0284c7" />
      <circle cx="32" cy="18" r="14" fill="#fbbf24" />
      <circle cx="26" cy="15" r="3" fill="#1e1b4b" />
      <circle cx="38" cy="15" r="3" fill="#1e1b4b" />
      <circle cx="27" cy="14" r="1" fill="white" />
      <circle cx="39" cy="14" r="1" fill="white" />
      {state !== "sad"
        ? <path d="M25 22 Q32 28 39 22" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round"/>
        : <path d="M27 24 Q32 19 37 24" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round"/>}
      <rect x="18" y="32" width="28" height="34" rx="9" fill="#0ea5e9" />
      <line x1="18" y1="38" x2="4" y2={state === "celebrating" ? 18 : 24} stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
      <line x1="46" y1="38" x2="59" y2={state === "celebrating" ? 18 : 52} stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
      <line x1="25" y1="66" x2="20" y2="94" stroke="#0284c7" strokeWidth="10" strokeLinecap="round" />
      <line x1="39" y1="66" x2="44" y2="94" stroke="#0284c7" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
});
WaterKid.displayName = "WaterKid";

interface Props {
  onComplete: (points: number, message: string) => void;
  totalPoints: number;
  lang: Lang;
}

export default function TapsScene({ onComplete, totalPoints, lang }: Props) {
  const t = TRANSLATIONS[lang];
  const [closed, setClosed] = useState<Set<number>>(new Set());
  const [wrongTargetId, setWrongTargetId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const allClosed = closed.size === TAPS_CONFIG.length;

  // Encontra a torneira ativa com maior desperdício (Alvo correto atual)
  const currentTarget = useMemo(() => {
    const activeTaps = TAPS_CONFIG.filter(tap => !closed.has(tap.id));
    if (activeTaps.length === 0) return null;
    return activeTaps.reduce((max, tap) => tap.litersPerMin > max.litersPerMin ? tap : max, activeTaps[0]);
  }, [closed]);
  
  const litersSaved = useMemo(() => 
    TAPS_CONFIG.filter(tp => closed.has(tp.id)).reduce((s, tp) => s + tp.litersPerMin, 0)
  , [closed]);

  const activeWasteRate = useMemo(() => 
    TAPS_CONFIG.filter(tp => !closed.has(tp.id)).reduce((s, tp) => s + tp.litersPerMin, 0)
  , [closed]);

  const toggleTap = useCallback((tapId: number) => {
    if (closed.has(tapId) || showSuccess) return;
    
    // Validar prioridade ecológica inteligente
    if (currentTarget && tapId !== currentTarget.id) {
      setWrongTargetId(tapId);
      setTimeout(() => setWrongTargetId(null), 800);
      return;
    }
    
    setClosed(prev => {
      const next = new Set(prev);
      next.add(tapId);
      return next;
    });
  }, [closed, showSuccess, currentTarget]);

  useEffect(() => {
    if (!allClosed) return;
    setShowSuccess(true);
    const timer = setTimeout(() => onComplete(80, t.tapsSuccess), 3500);
    return () => clearTimeout(timer);
  }, [allClosed, onComplete, t.tapsSuccess]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none flex flex-col justify-between p-4 transform-gpu"
      style={{ fontFamily: "Outfit, sans-serif", background: "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)" }}>
      
      {/* Fundo Minimalista Otimizado */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
        <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(#0ea5e9 1.2px, transparent 1.2px)", backgroundSize: "32px 32px" }} />
      </div>

      {/* ── TOPO: DASHBOARD DE IMPACTO SIMPLIFICADO ── */}
      <header className="relative z-20 w-full bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-blue-100/50 shadow-xs flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className={`text-[9px] font-black px-2 py-0.5 rounded-md tracking-wider uppercase self-start ${allClosed ? "bg-emerald-500 text-white" : "bg-rose-500 text-white animate-pulse"}`}>
              {allClosed ? "✓ Estabilizado" : "⚠️ Fuga Crítica Detetada"}
            </span>
            <h2 className="text-slate-800 font-black text-xs md:text-sm mt-1">
              {lang === "pt" ? "Prioridade: Fecha o maior fluxo primeiro" : "Priority: Secure the largest flow first"}
            </h2>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-xl text-amber-600 font-black text-xs shadow-2xs">
            ⭐ {totalPoints}
          </div>
        </div>

        {/* Métrica de Eficiência Linear */}
        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-2.5 text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">{lang === "pt" ? "Desperdício Atual:" : "Current Waste:"}</span>
            <span className={`font-black tracking-tight text-sm ${activeWasteRate > 0 ? "text-rose-500" : "text-slate-400"}`}>
              {activeWasteRate} L<span className="text-[10px] font-medium opacity-80">/min</span>
            </span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">{lang === "pt" ? "Água Preservada:" : "Water Saved:"}</span>
            <span className="text-emerald-600 font-black text-sm tracking-tight">
              {litersSaved} Litros
            </span>
          </div>
        </div>
      </header>

      {/* ── ZONA CENTRAL: COMPONENTES INTERATIVOS DE DESIGN COMPACTO ── */}
      <main className="relative z-10 flex-grow flex items-center justify-center gap-3 max-w-2xl mx-auto w-full px-2">
        {TAPS_CONFIG.map(tap => {
          const isClosed = closed.has(tap.id);
          const isWrong = wrongTargetId === tap.id;
          const isTarget = currentTarget?.id === tap.id;
          const streamWidth = Math.max(10, Math.min(tap.litersPerMin * 1.2, 22));

          return (
            <motion.div
              key={tap.id}
              onClick={() => toggleTap(tap.id)}
              animate={isWrong ? { x: [-6, 6, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`flex-1 rounded-3xl p-3 flex flex-col items-center justify-between border transition-all duration-300 relative h-[48vh] max-h-[340px] ${
                isClosed 
                  ? "bg-white/40 border-emerald-200/60 shadow-2xs cursor-default" 
                  : isWrong 
                    ? "bg-rose-50 border-rose-300 shadow-md cursor-pointer"
                    : isTarget 
                      ? "bg-white border-blue-400 shadow-md ring-2 ring-blue-400/20 cursor-pointer pulse-target"
                      : "bg-white/80 border-slate-200/60 shadow-xs cursor-pointer opacity-75 hover:opacity-100"
              }`}
            >
              {/* Info Header do Card */}
              <div className="w-full text-center flex flex-col items-center">
                <span className="text-2xl mb-1">{tap.icon}</span>
                <h4 className="text-slate-700 font-black text-[10px] md:text-xs leading-tight tracking-tight px-1">
                  {tap.name[lang]}
                </h4>
                <span className={`text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full ${isClosed ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                  {isClosed ? "0 L/min" : `-${tap.litersPerMin} L/min`}
                </span>
              </div>

              {/* Área do Fluxo Físico de Água Integrado */}
              <div className="flex-1 w-full flex flex-col items-center justify-end relative my-3 min-h-[100px]">
                {/* Boca de Saída */}
                <div className={`h-2 rounded-full z-10 ${isClosed ? "bg-slate-400" : "bg-blue-500"}`} style={{ width: streamWidth + 6 }} />
                
                <AnimatePresence>
                  {!isClosed && (
                    <motion.div 
                      initial={{ scaleY: 0 }} 
                      animate={{ scaleY: 1 }} 
                      exit={{ scaleY: 0, opacity: 0 }}
                      className="absolute bottom-0 top-2 transform-gpu will-change-transform origin-top flex flex-col items-center"
                    >
                      <div 
                        className="water-stream"
                        style={{
                          width: streamWidth,
                          height: "100%",
                          backgroundImage: "repeating-linear-gradient(180deg, #3b82f6 0px, #60a5fa 6px, #93c5fd 12px, #3b82f6 18px)",
                          backgroundSize: "100% 18px",
                          borderRadius: "0 0 6px 6px",
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                        }} 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Indicador de Status Base do Card (Substitui botões pesados) */}
              <div className={`w-full py-2 rounded-xl text-center font-black text-[10px] tracking-wider uppercase border ${
                isClosed 
                  ? "bg-emerald-500 border-emerald-400 text-white" 
                  : isWrong
                    ? "bg-rose-500 border-rose-400 text-white"
                    : isTarget
                      ? "bg-blue-600 border-blue-500 text-white animate-pulse"
                      : "bg-slate-100 border-slate-200 text-slate-500"
              }`}>
                {isClosed ? t.tapClosed : isWrong ? "Foca no Chuveiro!" : "Tocar p/ Fechar"}
              </div>
            </motion.div>
          );
        })}
      </main>

      {/* Avatar Reativo Lateral Embutido */}
      <div className="absolute right-4 bottom-4 z-20 pointer-events-none hidden md:flex flex-col items-center w-10 h-16 opacity-80">
        <WaterKid state={allClosed ? "celebrating" : closed.size > 0 ? "happy" : "sad"} />
      </div>

      {/* Dica de Instrução de Rodapé */}
      <footer className="relative z-20 w-full bg-white/50 border border-white/80 backdrop-blur-xs rounded-xl py-2 px-3 text-center max-w-xl mx-auto">
        <p className="text-blue-950 font-bold text-[11px]">
          {lang === "pt" 
            ? "💡 Fechar primeiro as fugas de maior débito poupa mais volume de água por segundo de reação." 
            : "💡 Securing higher-flow leaks first preserves more volume of water per second of reaction."}
        </p>
      </footer>

      {/* ── MODAL COMPACTO DE SUCESSO COGNITIVO ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ type: "spring", bounce: 0.2 }}
              className="bg-white rounded-[2rem] p-6 text-center shadow-2xl max-w-xs w-full transform-gpu flex flex-col gap-3"
            >
              <div className="text-5xl my-1">💧✨🛡️</div>
              <div>
                <h3 className="font-black text-blue-700 text-base">{t.tapsSuccess}</h3>
                <p className="text-slate-500 text-xs font-bold mt-1">{t.tapsSub(litersSaved)}</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 text-left rounded-xl p-3 text-[11px] text-slate-600 font-medium leading-relaxed">
                {lang === "pt" 
                  ? "Sequência perfeita! Ao focar a tua energia na fonte crítica (18 L/min) antes das pequenas torneiras, mitigaste a maior parte do impacto ambiental de imediato." 
                  : "Perfect sequence! By targeting the critical source (18 L/min) before smaller taps, you mitigated the bulk of the environmental strain instantly."}
              </div>

              <p className="text-emerald-500 font-black text-lg animate-bounce">+80 ⭐</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .water-stream {
          animation: waterFlow 0.2s linear infinite;
        }
        @keyframes waterFlow {
          from { background-position-y: 0px; }
          to { background-position-y: 18px; }
        }
        @keyframes targetGlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.015); box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.25); }
        }
        .pulse-target {
          animation: targetGlow 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}