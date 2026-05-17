import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Tap { id: number; litersPerMin: number; name: string; }
const TAPS: Tap[] = [
  { id: 1, litersPerMin: 12, name: "Torneira Principal" },
  { id: 2, litersPerMin: 15, name: "Chuveiro/Mangueira" },
  { id: 3, litersPerMin: 10, name: "Torneira Secundária" },
];

const WaterKid = React.memo(({ openCount }: { openCount: number }) => {
  return (
    <svg viewBox="0 0 64 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="will-change-transform transform-gpu">
      <ellipse cx="32" cy="14" rx="16" ry="14" fill="#0284c7" />
      <circle cx="32" cy="18" r="14" fill="#fbbf24" />
      <circle cx="26" cy="15" r="3" fill="#1e1b4b" />
      <circle cx="38" cy="15" r="3" fill="#1e1b4b" />
      <path d={openCount > 0 ? "M26 25 Q32 20 38 25" : "M25 22 Q32 28 39 22"} fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="18" y="32" width="28" height="34" rx="9" fill="#0ea5e9" />
      {openCount > 0 ? (
        <path d="M18 38 Q6 32 4 42" fill="none" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" />
      ) : (
        <line x1="18" y1="38" x2="4" y2="24" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" />
      )}
      <line x1="46" y1="38" x2="58" y2="44" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" />
      <line x1="25" y1="66" x2="20" y2="94" stroke="#0284c7" strokeWidth="9" strokeLinecap="round" />
      <line x1="39" y1="66" x2="44" y2="94" stroke="#0284c7" strokeWidth="9" strokeLinecap="round" />
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

  const closeTap = useCallback((tapId: number) => {
    if (closed.has(tapId) || showSuccess) return;
    
    setClosed(prev => {
      const next = new Set(prev);
      next.add(tapId);
      return next;
    });

    setFact(t.tapsMicroFacts[(tapId - 1) % t.tapsMicroFacts.length]);
    setTimeout(() => setFact(null), 3000);
  }, [closed, showSuccess, t.tapsMicroFacts]);

  useEffect(() => {
    if (!allClosed) return;
    setShowSuccess(true);
    setTimeout(() => onComplete(80, t.tapsSuccess), 2500);
  }, [allClosed, onComplete, t.tapsSuccess]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none flex flex-col justify-between"
      style={{ fontFamily: "Outfit, sans-serif", background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 40%, #cbd5e1 100%)" }}>
      
      {/* HUD de Alerta e Pontuação */}
      <div className="relative z-40 p-3 flex flex-col gap-2 bg-white/40 backdrop-blur-xs border-b border-slate-200">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1.5 bg-red-50 px-2.5 py-1 rounded-xl border border-red-100">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-black text-red-600 text-xs uppercase tracking-wide">
              {openCount} {lang === "pt" ? "Fuga Ativa" : "Active Leak"}
            </span>
          </div>
          <div className="bg-emerald-500 text-white font-black text-xs px-3 py-1 rounded-xl shadow-xs">
            {t.tapsSaved(litersSaved)}
          </div>
          <div className="font-black text-amber-600 text-xs">⭐ {totalPoints}</div>
        </div>

        {/* Barra de Perigo Dinâmica Baseada no Desperdício Crítico */}
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden flex">
          <motion.div 
            className="h-full rounded-full transform-gpu" 
            animate={{ width: `${(openCount / TAPS.length) * 100}%`, backgroundColor: openCount > 1 ? "#ef4444" : "#f59e0b" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Cenário Central de Canalização Metálica e Pias */}
      <div className="relative flex-1 flex items-stretch justify-center gap-4 px-3 pt-6 pb-20">
        {TAPS.map(tap => {
          const isClosed = closed.has(tap.id);
          
          return (
            <div key={tap.id} className="flex-1 flex flex-col items-center justify-start relative">
              
              {/* CANO METÁLICO (Sai da parede superior e dobra para baixo) */}
              <div className="absolute top-0 flex flex-col items-center w-full" style={{ height: "100px" }}>
                {/* Cano Principal Superior */}
                <div className="w-6 h-12 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 rounded-b-md shadow-inner relative z-10">
                  {/* Junta de fixação */}
                  <div className="w-8 h-2 bg-slate-600 absolute top-0 left-1/2 -translate-x-1/2" />
                </div>
                
                {/* Registro/Válvula de Fechamento (O ponto crítico de interação) */}
                <motion.button
                  onClick={() => closeTap(tap.id)}
                  disabled={isClosed}
                  whileHover={!isClosed ? { scale: 1.1 } : {}}
                  whileTap={!isClosed ? { scale: 0.9 } : {}}
                  className={`w-10 h-10 rounded-full border-4 flex items-center justify-center font-black text-white text-xs shadow-md z-30 -mt-4 transition-colors duration-300 ${
                    isClosed 
                      ? "bg-emerald-500 border-emerald-200 cursor-default" 
                      : "bg-red-500 border-red-200 cursor-pointer animate-pulse"
                  }`}
                >
                  {isClosed ? "✓" : "OFF"}
                </motion.button>

                {/* Bocal de saída da água */}
                <div className="w-4 h-4 bg-gradient-to-r from-slate-400 to-slate-600 rounded-b-xs -mt-1 z-10" />
              </div>

              {/* JATO DE ÁGUA VOLUMOSO EM QUEDA LIVRE */}
              {!isClosed && (
                <div className="absolute top-[52px] bottom-[56px] w-5 left-1/2 -translate-x-1/2 z-0 pointer-events-none flex flex-col items-center">
                  <div className="water-drop-stream w-full h-full"
                    style={{
                      backgroundImage: "linear-gradient(90deg, rgba(186,230,253,0.5) 0%, rgba(56,189,248,0.9) 25%, rgba(14,165,233,0.9) 75%, rgba(186,230,253,0.5) 100%)",
                      boxShadow: "0 0 12px rgba(56,189,248,0.7)",
                      borderRadius: "2px 2px 6px 6px"
                    }} 
                  />
                  {/* Partículas de Impacto / Salpicos reais na bacia */}
                  <motion.div 
                    animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.3, 0.8] }} 
                    transition={{ duration: 0.4, repeat: Infinity }}
                    className="w-10 h-3 bg-sky-300/70 filter blur-xs rounded-full -mt-1.5"
                  />
                </div>
              )}

              {/* BACIA DA PIA (Onde a água colide) */}
              <div className="absolute bottom-0 w-full rounded-2xl p-2 flex flex-col items-center shadow-lg border border-slate-300 z-10"
                style={{ 
                  height: "75px", 
                  background: "linear-gradient(180deg, #f1f5f9 0%, #cbd5e1 100%)",
                  boxShadow: "inset 0 4px 6px -1px rgba(0,0,0,0.05)"
                }}>
                
                {/* Interior Escavado da Pia com Alerta de Transbordo */}
                <div className="w-full h-8 rounded-xl bg-slate-300/80 border border-slate-400 relative overflow-hidden">
                  {!isClosed && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 transform-gpu bg-sky-400/80"
                      animate={{ 
                        height: ["40%", "90%", "40%"],
                        backgroundColor: ["#38bdf8", "#ef4444", "#38bdf8"]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                  {/* Ralo central */}
                  <div className="w-4 h-2 bg-slate-600 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2 opacity-60" />
                </div>

                {/* Métricas de fluxo em tempo real */}
                <div className="text-[10px] font-bold mt-1.5 tracking-tight uppercase">
                  {isClosed ? (
                    <span className="text-emerald-600 font-black">{t.tapClosed}</span>
                  ) : (
                    <span className="text-red-500 font-extrabold animate-pulse">{tap.litersPerMin} L / MIN</span>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Personagem Observador (WaterKid) à direita */}
      <div className="absolute z-30 pointer-events-none right-2 bottom-16" style={{ width: "60px", height: "90px" }}>
        <WaterKid openCount={openCount} />
      </div>

      {/* Toast Pedagógico Interativo de Desperdício Concreto */}
      <AnimatePresence>
        {activeFact && (
          <motion.div key="fact" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute left-4 right-4 bottom-16 z-50 transform-gpu">
            <div className="bg-slate-950/95 text-white rounded-xl p-3 shadow-xl border border-slate-800">
              <p className="text-[10px] font-black tracking-wider text-emerald-400 uppercase mb-0.5">✓ Impacto Direto:</p>
              <p className="font-medium text-slate-200 text-xs leading-normal">{activeFact}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rodapé Informativo */}
      <div className="p-3 bg-white border-t border-slate-200 relative z-30">
        <p className="text-center font-semibold text-slate-600 text-xs">{t.tapsHint}</p>
      </div>

      {/* Modal de Finalização do Desafio */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(15, 23, 42, 0.8)" }}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
              className="bg-white rounded-[2rem] p-6 text-center shadow-2xl max-w-sm w-full border border-slate-100 transform-gpu">
              <div className="text-5xl mb-2">💧🛡️</div>
              <h3 className="font-black text-blue-600 text-lg tracking-tight mb-1">{t.tapsSuccess}</h3>
              <p className="text-slate-800 font-bold text-sm">{t.tapsSub(litersSaved)}</p>
              
              <div className="bg-emerald-50 rounded-xl p-3 my-3 text-left border border-emerald-100">
                <p className="text-emerald-900 text-xs font-medium leading-relaxed">
                  {lang === "pt" 
                    ? "Cada segundo conta! Torneiras abertas sem uso geram uma pressão crítica sobre as reservas locais de água potável." 
                    : "Every second counts! Leaving taps running puts a major critical strain on our clean local water reserves."}
                </p>
              </div>
              <p className="text-emerald-500 font-black text-base">+80 ⭐</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .water-drop-stream {
          background-size: 100% 40px;
          animation: waterSlide 0.25s infinite linear;
          will-change: background-position;
        }
        @keyframes waterSlide {
          0% { background-position-y: 0px; }
          100% { background-position-y: 40px; }
        }
      `}</style>
    </div>
  );
}