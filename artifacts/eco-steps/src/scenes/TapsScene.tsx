import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Tap { id: number; litersPerMin: number; name: { pt: string; en: string }; }

// Configuração estática fora do componente para poupar memória e CPU
const TAPS_CONFIG: Tap[] = [
  { id: 1, litersPerMin: 12, name: { pt: "Torneira Principal", en: "Main Tap" } },
  { id: 2, litersPerMin: 18, name: { pt: "Chuveiro com Fuga", en: "Leaking Shower" } },
  { id: 3, litersPerMin: 8,  name: { pt: "Filtro de Água", en: "Water Filter" } },
];

const WaterKid = React.memo(({ happy }: { happy: boolean }) => {
  return (
    <svg viewBox="0 0 64 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="will-change-transform">
      <ellipse cx="32" cy="14" rx="16" ry="14" fill="#0284c7" />
      <circle cx="32" cy="18" r="14" fill="#fbbf24" />
      <circle cx="26" cy="15" r="3" fill="#1e1b4b" />
      <circle cx="38" cy="15" r="3" fill="#1e1b4b" />
      <circle cx="27" cy="14" r="1" fill="white" />
      <circle cx="39" cy="14" r="1" fill="white" />
      {happy
        ? <path d="M25 22 Q32 28 39 22" fill="none" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round"/>
        : <path d="M27 24 Q32 20 37 24" fill="none" stroke="#1e1b4b" strokeWidth="2.2" strokeLinecap="round"/>}
      <rect x="18" y="32" width="28" height="34" rx="9" fill="#0ea5e9" />
      <line x1="18" y1="38" x2="4" y2="24" stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
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

  const allClosed = closed.size === TAPS_CONFIG.length;
  
  // Cálculo otimizado de litros poupados e fluxo ativo restante
  const litersSaved = useMemo(() => 
    TAPS_CONFIG.filter(tp => closed.has(tp.id)).reduce((s, tp) => s + tp.litersPerMin, 0)
  , [closed]);

  const activeWasteRate = useMemo(() => 
    TAPS_CONFIG.filter(tp => !closed.has(tp.id)).reduce((s, tp) => s + tp.litersPerMin, 0)
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
    setTimeout(() => onComplete(80, t.tapsSuccess), 2000);
  }, [allClosed, onComplete, t.tapsSuccess]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none flex flex-col justify-between p-3 transform-gpu"
      style={{ fontFamily: "Outfit, sans-serif", background: "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 40%, #bae6fd 100%)" }}>
      
      {/* Fundo de Mosaico Sanitário Otimizado */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15">
        <div className="w-full h-full" style={{
          backgroundImage: "radial-gradient(#0ea5e9 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />
      </div>

      {/* ── TOPO: PAINEL DE MISSÃO DE URGÊNCIA ── */}
      <header className="relative z-20 w-full bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-blue-100 shadow-md flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div>
            <span className="bg-red-500 text-white font-black text-[9px] px-1.5 py-0.5 rounded tracking-wider uppercase animate-pulse">
              {allClosed ? "✓ SECURO" : "⚠️ EM DESPERDÍCIO"}
            </span>
            <h2 className="text-slate-800 font-black text-xs md:text-sm mt-0.5">
              {lang === "pt" ? "Missão: Conter o Desperdício Coletivo" : "Mission: Halt Collective Waste"}
            </h2>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 px-2.5 py-1 rounded-xl text-yellow-700 font-black text-xs">
            ⭐ {totalPoints}
          </div>
        </div>

        {/* Barra Indicadora de Impacto Ecológico */}
        <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-2 text-[11px] md:text-xs">
          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">{lang === "pt" ? "Fluxo Ativo Perdido:" : "Active Flow Lost:"}</span>
            <span className={`font-black ${activeWasteRate > 0 ? "text-red-500" : "text-slate-400"}`}>
              {activeWasteRate} L / min
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-slate-400 font-medium">{t.tapsSaved("").replace(":", "")}</span>
            <span className="text-emerald-600 font-black">
              {litersSaved} Litros
            </span>
          </div>
        </div>
      </header>

      {/* ── ZONA CENTRAL: SIMULAÇÃO DAS TORNEIRAS E LAVATÓRIO ── */}
      <main className="relative z-10 flex-grow flex items-end justify-center gap-2 md:gap-4 my-4 max-w-2xl mx-auto w-full">
        {TAPS_CONFIG.map(tap => {
          const isClosed = closed.has(tap.id);
          // O tamanho do fluxo reflete a gravidade do desperdício individual
          const streamWidth = tap.litersPerMin * 1.1;

          return (
            <div key={tap.id} className="flex-1 flex flex-col items-center h-full justify-end relative group">
              
              {/* Identificador com o Nome e Gasto de cada elemento */}
              <div className="absolute top-2 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full pointer-events-none tracking-tight">
                {tap.name[lang]} (-{tap.litersPerMin}L)
              </div>

              {/* Canalização + Efeito de Água Fluida */}
              <div className="flex flex-col items-center w-full flex-grow justify-end pb-1.5 relative">
                <div className="bg-gradient-to-r from-slate-300 to-slate-400 rounded-t-full" style={{ width: 14, height: 30 }} />
                <div className="bg-slate-500 rounded-full" style={{ width: 22, height: 8 }} />

                {/* Fluxo Dinâmico Otimizado via GPU */}
                {!isClosed && (
                  <div className="absolute bottom-1 flex flex-col items-center pointer-events-none">
                    <div 
                      className="water-stream transform-gpu will-change-transform"
                      style={{
                        width: Math.clamp(streamWidth, 8, 20),
                        height: "clamp(60px, 18vh, 140px)",
                        backgroundImage: "repeating-linear-gradient(180deg, #3b82f6 0px, #93c5fd 8px, #60a5fa 16px, #3b82f6 24px)",
                        backgroundSize: "100% 24px",
                        borderRadius: "0 0 8px 8px",
                        boxShadow: "0 4px 14px rgba(59, 130, 246, 0.5)",
                      }} 
                    />
                    <motion.div 
                      animate={{ scaleX: [0.6, 1.2, 0.6], opacity: [0.7, 0.3, 0.7] }} 
                      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                      className="bg-blue-400/50 rounded-full filter blur-xs"
                      style={{ width: streamWidth * 1.8, height: 6 }} 
                    />
                  </div>
                )}
              </div>

              {/* Estrutura Física do Lavatório / Bancada */}
              <div className="w-full h-4 bg-gradient-to-b from-white to-slate-100 rounded-t-xl border-x-2 border-t-2 border-slate-200 shadow-sm" />
              
              <div className="w-full flex flex-col items-center bg-gradient-to-b from-slate-100 to-slate-200 border-x-2 border-b-2 border-slate-200 rounded-b-2xl p-2 pt-1 gap-2">
                
                {/* Botão de Ação Direta com Feedback Semafórico Claro */}
                <motion.button 
                  onClick={() => closeTap(tap.id)}
                  whileTap={!isClosed ? { scale: 0.92 } : {}}
                  whileHover={!isClosed ? { scale: 1.05 } : {}}
                  disabled={isClosed}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-black shadow-md focus:outline-none transition-all transform-gpu will-change-transform ${
                    isClosed 
                      ? "bg-gradient-to-br from-emerald-500 to-green-600 border-2 border-emerald-300 text-white cursor-default" 
                      : "bg-gradient-to-br from-red-500 to-rose-600 border-2 border-rose-400 text-white cursor-pointer active-pulse-ring"
                  }`}
                  style={{ fontSize: isClosed ? "16px" : "13px" }}
                >
                  {isClosed ? "✓" : "OFF"}
                </motion.button>

                <span className={`text-[10px] font-black tracking-wide uppercase ${isClosed ? "text-emerald-600" : "text-red-500 animate-pulse"}`}>
                  {isClosed ? t.tapClosed : t.tapClose}
                </span>
              </div>
            </div>
          );
        })}
      </main>

      {/* ── NOTIFICAÇÕES PEDAGÓGICAS (FACT TOASTS) ── */}
      <div className="relative z-30 w-full max-w-md mx-auto min-h-[50px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeFact && (
            <motion.div 
              key={activeFact}
              initial={{ opacity: 0, y: 15, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-blue-600 text-white rounded-xl p-3 shadow-lg text-center border border-blue-400"
            >
              <p className="font-bold text-xs opacity-90 leading-relaxed">
                💡 {activeFact}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Avatar Lateral de Reação e Progresso */}
      <div className="absolute right-3 bottom-[26%] z-20 pointer-events-none hidden sm:flex flex-col items-center">
        <div className="w-12 h-20">
          <WaterKid happy={closed.size > 0} />
        </div>
      </div>

      {/* Dica de Rodapé Semper Visível para Instrução */}
      <footer className="relative z-20 w-full bg-white/40 border border-white/60 rounded-xl py-2 px-3 text-center">
        <p className="text-blue-900 font-bold text-[11px] md:text-xs">
          ℹ️ {t.tapsHint}
        </p>
      </footer>

      {/* ── MODAL DE SUCESSO E IMPACTO FINAL ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
          >
            <motion.div 
              initial={{ scale: 0.92, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-white rounded-[2.2rem] p-6 text-center shadow-2xl max-w-xs w-full transform-gpu"
            >
              <div className="text-5xl mb-2">💧✨🛡️</div>
              <h3 className="font-black text-blue-700 text-lg mb-1">{t.tapsSuccess}</h3>
              <p className="text-slate-600 text-xs font-bold mb-2">{t.tapsSub(litersSaved)}</p>
              
              <div className="bg-blue-50 rounded-xl p-2.5 mb-4 text-[11px] text-slate-500 font-medium leading-normal">
                {lang === "pt" 
                  ? "Excelente reação! Ao fechar as fontes prioritárias mais rápidas, evitas a sobrecarga das bacias hidrográficas locais." 
                  : "Great reaction! By securing the fastest leaking sources first, you prevent local hydrographic strain."}
              </div>

              <p className="text-emerald-500 font-black text-lg animate-bounce">+80 ⭐</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .active-pulse-ring {
          animation: pulseRing 1.4s infinite ease-out;
        }
        .water-stream {
          animation: waterFlow 0.15s linear infinite;
        }
        @keyframes waterFlow {
          from { background-position-y: 0px; }
          to { background-position-y: 24px; }
        }
      `}</style>
    </div>
  );
}