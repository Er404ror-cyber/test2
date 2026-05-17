import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Tap { id: number; litersPerMin: number; }
const TAPS: Tap[] = [
  { id: 1, litersPerMin: 12 },
  { id: 2, litersPerMin: 15 },
  { id: 3, litersPerMin: 10 },
];

const WaterKid = React.memo(({ happy, openCount }: { happy: boolean; openCount: number }) => {
  return (
    <svg viewBox="0 0 64 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="will-change-transform transform-gpu">
      <ellipse cx="32" cy="14" rx="16" ry="14" fill="#0284c7" />
      <circle cx="32" cy="18" r="14" fill="#fbbf24" />
      <circle cx="26" cy="15" r="3" fill="#1e1b4b" />
      <circle cx="38" cy="15" r="3" fill="#1e1b4b" />
      <circle cx="27" cy="14" r="1" fill="white" />
      <circle cx="39" cy="14" r="1" fill="white" />
      {happy
        ? <path d="M25 22 Q32 28 39 22" fill="none" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round"/>
        : <path d="M27 24 Q32 20 37 24" fill="none" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round"/>}
      <rect x="18" y="32" width="28" height="34" rx="9" fill="#0ea5e9" />
      
      {/* Braço esquerdo indica preocupação se houver muita água a correr */}
      {openCount > 0 
        ? <path d="M18 38 Q6 45 4 32" fill="none" stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
        : <line x1="18" y1="38" x2="4" y2="24" stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
      }
      <circle cx="3" cy="21" r="5" fill="#fbbf24" />
      <line x1="46" y1="38" x2="59" y2="52" stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
      <line x1="25" y1="66" x2="20" y2="94" stroke="#0284c7" strokeWidth="10" strokeLinecap="round" />
      <line x1="39" y1="66" x2="44" y2="94" stroke="#0284c7" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="17" cy="97" rx="8" ry="4.5" fill="#1e1b4b" />
      <ellipse cx="47" cy="97" rx="8" ry="4.5" fill="#1e1b4b" />
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
  const [activeFact, setFact] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const openCount = TAPS.length - closed.size;
  const allClosed = closed.size === TAPS.length;
  
  const litersSaved = useMemo(() => 
    TAPS.filter(tp => closed.has(tp.id)).reduce((s, tp) => s + tp.litersPerMin, 0)
  , [closed]);

  // Limpeza preventiva de timers em background
  useEffect(() => {
    return () => {
      for (let i = setTimeout(() => {}, 0); i >= 0; i--) {
        clearTimeout(i);
      }
    };
  }, []);

  const closeTap = useCallback((tap: Tap) => {
    if (closed.has(tap.id) || showSuccess) return;
    
    setClosed(prev => {
      const next = new Set(prev);
      next.add(tap.id);
      return next;
    });

    setFact(t.tapsMicroFacts[(tap.id - 1) % t.tapsMicroFacts.length]);
    
    setTimeout(() => {
      setFact(null);
    }, 2800);
  }, [closed, showSuccess, t.tapsMicroFacts]);

  useEffect(() => {
    if (!allClosed) return;
    setShowSuccess(true);
    setTimeout(() => onComplete(80, t.tapsSuccess), 2200);
  }, [allClosed, onComplete, t.tapsSuccess]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none"
      style={{ fontFamily: "Outfit, sans-serif", background: "linear-gradient(180deg, #e0f2fe 0%, #bae6fd 45%, #e2e8f0 100%)" }}>

      {/* Parede de Azulejos Realista */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <defs>
            <pattern id="wt" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="38" height="38" fill="none" stroke="#0ea5e9" strokeWidth="1" rx="2"/>
            </pattern>
          </defs>
          <rect width="100%" height="72%" fill="url(#wt)" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-[28%]" style={{ background: "linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%)" }}>
          <svg className="absolute inset-0 w-full h-full opacity-15">
            <pattern id="ft" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="50" height="50" fill="none" stroke="#64748b" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#ft)"/>
          </svg>
        </div>
        <div className="absolute left-0 right-0 h-2.5 bg-white/40 shadow-xs" style={{ bottom: "28%" }} />
      </div>

      {/* Painel HUD Superior */}
      <div className="absolute top-3 left-3 right-3 flex justify-between z-40 items-center gap-2">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl px-3 py-1.5 shadow-xs border border-white/40">
          <span className="font-black text-red-600 tracking-tight" style={{ fontSize: "clamp(10px, 2.4vw, 13px)" }}>
            ⚠️ {openCount} {openCount === 1 ? (lang === "pt" ? "Torneira a Desperdiçar" : "Tap Wasting") : (lang === "pt" ? "Torneiras a Desperdiçar" : "Taps Wasting")}
          </span>
        </div>
        <motion.div key={litersSaved} initial={{ scale: 1.15 }} animate={{ scale: 1 }}
          className="bg-emerald-500 text-white rounded-2xl px-3 py-1.5 shadow-sm font-black tracking-tight" style={{ fontSize: "clamp(10px, 2.4vw, 13px)" }}>
          {t.tapsSaved(litersSaved)}
        </motion.div>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl px-3 py-1.5 shadow-xs border border-white/40 font-black text-amber-600" style={{ fontSize: "clamp(10px, 2.4vw, 13px)" }}>
          ⭐ {totalPoints}
        </div>
      </div>

      {/* Zona Central de Lavatórios e Desperdiço Dinâmico */}
      <div className="absolute z-10 flex items-stretch gap-3 px-2" style={{ left: 0, right: 0, bottom: "26%", height: "48%" }}>
        {TAPS.map(tap => {
          const dangers = ["#38bdf8", "#3b82f6", "#ef4444"];
          const isClosed = closed.has(tap.id);
          
          return (
            <div key={tap.id} className="flex-1 flex flex-col items-center justify-end relative">
              
              {/* Elementos da Torneira e Corrente Hidráulica */}
              <div className="flex flex-col items-center flex-grow justify-end w-full relative pb-1">
                <div className="rounded-t-full relative z-10" style={{ width: "14px", height: "30px", background: "linear-gradient(90deg, #f1f5f9, #cbd5e1, #94a3b8)" }} />
                <div className="rounded-full shadow-xs relative z-10" style={{ width: "22px", height: "10px", background: "#475569" }} />

                {/* Efeito Fluido de Água Viva */}
                {!isClosed && (
                  <div className="absolute top-[36px] bottom-0 flex flex-col items-center justify-end pointer-events-none z-0">
                    <div className="water-fall-stream"
                      style={{
                        width: "12px",
                        height: "100%",
                        maxHeight: "105px",
                        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(56,189,248,0.9) 30%, rgba(29,78,216,0.8) 70%, rgba(255,255,255,0.4) 100%)",
                        boxShadow: "0 0 10px rgba(56,189,248,0.6)",
                        borderRadius: "0 0 4px 4px"
                      }} 
                    />
                    {/* Respingos na Base do Ralo */}
                    <motion.div 
                      animate={{ scale: [0.7, 1.3, 0.8], opacity: [0.9, 0.4, 0.9] }} 
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="bg-sky-300/60 filter blur-xs rounded-full"
                      style={{ width: "28px", height: "8px", marginTop: "-4px" }} 
                    />
                  </div>
                )}
              </div>

              {/* Balcão Superior */}
              <div className="w-full rounded-t-xl z-10" style={{ height: "14px", background: "linear-gradient(180deg, #ffffff, #e2e8f0)", border: "1px solid #cbd5e1" }} />
              
              {/* Cuba do Lavatório com Nível de Transbordo Real */}
              <div className="w-full flex flex-col items-center rounded-b-2xl p-1 relative z-10"
                style={{ background: "linear-gradient(180deg, #f1f5f9, #cbd5e1)", border: "1px solid #cbd5e1", borderTop: "none" }}>
                
                {/* Ralo Interno */}
                <div className="rounded-b-full overflow-hidden mt-0.5 relative"
                  style={{ width: "85%", height: "24px", background: "linear-gradient(180deg, #cbd5e1, #94a3b8)", border: "1px solid #94a3b8" }}>
                  
                  {/* Água Física Acumulada no interior do Lavatório */}
                  {!isClosed && (
                    <motion.div 
                      animate={{ height: ["45%", "85%", "45%"], background: ["#60a5fa", "#ef4444", "#60a5fa"] }} 
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-0 left-0 right-0 transform-gpu" 
                    />
                  )}
                </div>

                {/* Botão de Válvula / Acção de Estancamento */}
                <button 
                  onClick={() => closeTap(tap)}
                  disabled={isClosed}
                  className="rounded-xl flex items-center justify-center font-black focus:outline-none mt-2 mb-1.5 transition-all transform-gpu active:scale-90"
                  style={{
                    width: "100%",
                    maxWidth: "54px",
                    height: "36px",
                    background: isClosed ? "linear-gradient(135deg,#10b981,#047857)" : "linear-gradient(135deg,#f43f5e,#be123c)",
                    color: "#ffffff",
                    cursor: isClosed ? "default" : "pointer",
                    fontSize: "12px",
                    boxShadow: isClosed ? "0 2px 6px rgba(16,185,129,0.3)" : "0 4px 12px rgba(244,63,94,0.45)",
                    border: `1px solid ${isClosed ? "#34d399" : "#fb7185"}`
                  }}
                >
                  {isClosed ? "✓" : "STOP"}
                </button>

                <div className="text-[9px] font-black uppercase tracking-wider text-center pb-0.5">
                  {isClosed ? <span className="text-emerald-600">{t.tapClosed}</span> : <span className="text-rose-500 animate-pulse">{tap.litersPerMin}L/min</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monitor de Alerta Emocional (WaterKid) */}
      <motion.div className="absolute z-30 pointer-events-none"
        style={{ right: "4%", bottom: "26%", width: "clamp(50px, 11vw, 72px)", height: "clamp(76px, 16vw, 110px)" }}
        animate={allClosed ? { y: [0, -8, 0, -8, 0] } : {}}
        transition={{ duration: 0.6, repeat: allClosed ? 3 : 0 }}
      >
        <WaterKid happy={allClosed} openCount={openCount} />
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-black px-2 py-0.5 rounded-lg shadow-md tracking-wide whitespace-nowrap text-[9px]">
          {allClosed ? "SALVO! 🎉" : `${openCount} ${lang === "pt" ? "ABERTA!" : "OPEN!"}`}
        </div>
      </motion.div>

      {/* Balão de Informação de Impacto Ecológico Real */}
      <AnimatePresence>
        {activeFact && (
          <motion.div key="fact" initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }}
            className="absolute left-4 right-4 z-50 transform-gpu" style={{ bottom: "31%" }}>
            <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-3.5 shadow-xl border border-slate-800">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-emerald-400 text-sm">🛡️</span>
                <p className="font-black text-xs uppercase tracking-wider text-emerald-400">{lang === "pt" ? "Desperdício Travado!" : "Waste Stopped!"}</p>
              </div>
              <p className="font-medium text-slate-200 leading-relaxed text-xs">
                {activeFact}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guia Técnico Inferior */}
      <div className="absolute bottom-2 left-4 right-4 z-30">
        <div className="bg-white/70 backdrop-blur-md rounded-xl py-2 px-3 text-center border border-white/50 shadow-2xs">
          <p className="font-bold text-slate-700 text-xs tracking-tight">{t.tapsHint}</p>
        </div>
      </div>

      {/* Ecrã de Vitória e Balanço Crítico */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs" style={{ background: "rgba(15, 23, 42, 0.75)" }}>
            <motion.div initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.25 }}
              className="bg-white rounded-[2.2rem] p-6 text-center shadow-2xl max-w-sm w-full border border-slate-100 transform-gpu">
              
              <div className="text-5xl mb-2.5 animate-bounce">🌊💧</div>
              <h3 className="font-black text-blue-600 mb-1 tracking-tight text-xl">{t.tapsSuccess}</h3>
              <p className="text-slate-800 font-extrabold text-sm mb-1">{t.tapsSub(litersSaved)}</p>
              
              <div className="bg-blue-50/70 border border-blue-100/60 rounded-2xl p-3 my-3 text-left">
                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  {lang === "pt" 
                    ? "Excelente intervenção. Ao fechar estas torneiras de imediato, evitou que centenas de litros de água potável fossem perdidos diretamente para o esgoto sem qualquer utilidade." 
                    : "Great intervention! By closing these taps immediately, you prevented hundreds of liters of clean water from going directly down the drain wasted."}
                </p>
              </div>

              <p className="text-emerald-500 font-black text-lg tracking-tight">+80 ⭐</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .water-fall-stream {
          background-size: 100% 30px;
          animation: fluidFlow 0.35s infinite linear;
          will-change: background-position;
        }
        @keyframes fluidFlow {
          0% { background-position-y: 0px; }
          100% { background-position-y: 30px; }
        }
      `}</style>
    </div>
  );
}