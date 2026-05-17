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
      <ellipse cx="17" cy="97" rx="8" ry="4.5" fill="#1e1b4b" />
      <ellipse cx="47" cy="97" rx="8" ry="4.5" fill="#1e1b4b" />
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
  { id: "blue"  as const, bg:"linear-gradient(180deg,#2563eb,#1d4ed8)", lid:"#1e3a8a", ring:"#60a5fa", text:"#dbeafe", icon:"♻️" },
  { id: "brown" as const, bg:"linear-gradient(180deg,#b45309,#92400e)", lid:"#451a03", ring:"#fbbf24", text:"#fef3c7", icon:"🌿" },
  { id: "gray"  as const, bg:"linear-gradient(180deg,#4b5563,#374151)", lid:"#111827", ring:"#9ca3af", text:"#f3f4f6", icon:"🗑️" },
];

export default function TrashScene({ onComplete, totalPoints, lang }: Props) {
  const t = TRANSLATIONS[lang];

  const [items] = useState<TrashItem[]>(() => 
    [...TRASH_ITEMS].sort(() => Math.random() - 0.5).slice(0, 6)
  );
  
  const [idx, setIdx]           = useState(0);
  const [correct, setCorrect]   = useState(0);
  const [feedback, setFeedback] = useState<{ok:boolean;msg:string}|null>(null);
  const [throwing, setThrowing] = useState(false);
  const [activeBin, setActiveBin] = useState<string|null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Armazena os itens onde o utilizador errou para criar um sumário ecológico no fim
  const [wrongItems, setWrongItems] = useState<TrashItem[]>([]);

  const current = items[idx];
  const isInteracting = throwing || feedback !== null || showSuccess;

  const handleBin = useCallback((binId: "blue" | "brown" | "gray") => {
    if (isInteracting || !current) return;
    
    const ok = current.bin === binId;
    setThrowing(true); 
    setActiveBin(binId);
    
    // Feedback rápido na tela apenas visual/sonoro sem travar com explicações longas
    setTimeout(() => {
      setFeedback({ ok, msg: ok ? t.trashCorrect : "❌" });
    }, 100);

    // Tempo de transição reduzido e unificado para manter a jogabilidade dinâmica e fluida
    setTimeout(() => {
      const nc = correct + (ok ? 1 : 0);
      
      if (!ok) {
        setWrongItems(prev => [...prev, current]);
      }

      setFeedback(null); 
      setThrowing(false); 
      setActiveBin(null);
      const ni = idx + 1;
      
      if (ni >= items.length) {
        setCorrect(nc); 
        setShowSuccess(true);
        // O utilizador tem tempo de ler o sumário final; o trigger de saída é estendido
        const pts = Math.round((nc / items.length) * 100);
        setTimeout(() => onComplete(pts, t.trashScore(nc, items.length)), wrongItems.length > 0 ? 7000 : 2500);
      } else { 
        setCorrect(nc); 
        setIdx(ni); 
      }
    }, 800);
  }, [isInteracting, current, idx, correct, items.length, t, onComplete, wrongItems.length]);

  const clouds = useMemo(() => [
    { x: 5, y: 6, d: 6 },
    { x: 50, y: 3, d: 8 },
    { x: 72, y: 8, d: 10 }
  ], []);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden transform-gpu select-none"
      style={{ 
        fontFamily: "Outfit, sans-serif",
        background: "linear-gradient(180deg,#bfdbfe 0%,#dbeafe 30%,#bbf7d0 60%,#4ade80 100%)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden"
      }}>

      {/* Fundo do Parque */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90">
        <div className="absolute rounded-full transform-gpu" style={{top:"4%",right:"10%",width:40,height:40,background:"radial-gradient(circle,#fef08a,#fbbf24)",boxShadow:"0 0 20px 6px rgba(251,191,36,0.4)"}} />
        
        {clouds.map((c, i) => (
          <motion.div 
            key={i} 
            className="absolute transform-gpu will-change-transform" 
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            animate={{ x: [-4, 4, -4] }} 
            transition={{ duration: c.d, repeat: Infinity, ease: "easeInOut" }}
          >
            <div style={{ width: 56, height: 24, background: "white", borderRadius: "50%", opacity: 0.85 }} />
          </motion.div>
        ))}
        
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-b from-green-400 to-green-600" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-3xl bg-gradient-to-b from-slate-200 to-slate-300" style={{width:"22%",height:"30%"}} />
      </div>

      {/* HUD Global */}
      <div className="relative z-20 flex items-center gap-3 px-4 pt-4 pb-1">
        <div className="bg-white/90 backdrop-blur shadow-sm rounded-2xl px-3 py-1.5 font-black text-green-800 text-xs tracking-wider">
          {idx}/{items.length}
        </div>
        <div className="flex-1 bg-black/10 backdrop-blur rounded-full h-3 overflow-hidden relative inner-shadow">
          <motion.div 
            className="h-full rounded-full transform-gpu will-change-transform" 
            animate={{ width: `${(idx / items.length) * 100}%` }} 
            transition={{ duration: 0.4, ease: "circOut" }}
            style={{ background: "linear-gradient(90deg,#22c55e,#10b981)" }} 
          />
        </div>
        <div className="bg-white/90 backdrop-blur shadow-sm rounded-2xl px-3 py-1.5 font-black text-yellow-600 text-xs tracking-wider">
          ⭐ {totalPoints}
        </div>
      </div>

      {/* Zona Ativa Principal */}
      <div className="relative z-20 flex items-center justify-center gap-4 px-4 py-2 flex-grow min-h-0">
        
        {/* Personagem Avatar */}
        <motion.div 
          className="transform-gpu will-change-transform drop-shadow-md"
          style={{ width: "clamp(54px,13vw,84px)", height: "clamp(85px,20vw,130px)", flexShrink: 0 }}
          animate={throwing ? { x: 12, scale: 1.02 } : { x: 0, scale: 1 }} 
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <ThrowingChild throwing={throwing} />
        </motion.div>

        {/* Card do Objeto Ativo */}
        <div className="relative flex items-center justify-center min-w-[125px] sm:min-w-[160px]">
          <AnimatePresence mode="wait">
            {current && !feedback && (
              <motion.div 
                key={current.id}
                initial={{ scale: 0.4, opacity: 0, y: 20 }}
                animate={throwing ? { scale: 0.2, x: 140, y: 60, opacity: 0, rotate: 45 } : { scale: 1, y: 0, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white rounded-[2rem] shadow-2xl flex flex-col items-center justify-center gap-2 border-2 border-slate-100/50 pulse-subtle transform-gpu will-change-transform"
                style={{ padding: "clamp(16px,4vw,24px)", width: "100%" }}
              >
                <span className="floating-emoji" style={{ fontSize: "clamp(48px,13vw,76px)", lineHeight: 1 }}>
                  {current.emoji}
                </span>
                <span className="font-black text-slate-800 text-center tracking-tight" style={{ fontSize: "clamp(14px,3.5vw,18px)" }}>
                  {current.name}
                </span>
                <span className="text-slate-400 font-bold uppercase tracking-widest" style={{ fontSize: "clamp(8px,1.8vw,10px)" }}>
                  {t.trashQuestion}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback Express de Ação Concluída */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={`absolute text-2xl font-black px-4 py-2 rounded-full backdrop-blur-md shadow-lg ${feedback.ok ? "text-emerald-600 bg-emerald-50/90" : "text-rose-600 bg-rose-50/90"}`}
              >
                {feedback.msg}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Zona Inferior: Grelha de Lixeiras */}
      <div 
        className="relative z-20 flex gap-2.5 px-4 pb-5 transition-opacity duration-200"
        style={{ pointerEvents: isInteracting ? "none" : "auto" }}
      >
        {BINS_CONFIG.map(bin => {
          const binLabel = t.bins[bin.id];
          const binEx    = t.binExamples[bin.id];
          const isActive = activeBin === bin.id;
          const isAnyBinActive = activeBin !== null;
          
          return (
            <motion.button 
              key={bin.id} 
              onClick={() => handleBin(bin.id)}
              whileTap={{ scale: 0.92 }} 
              whileHover={{ y: -4 }}
              animate={{ 
                scale: isActive ? 1.04 : isAnyBinActive ? 0.92 : 1,
                opacity: isActive ? 1 : isAnyBinActive ? 0.4 : 1
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex-1 rounded-[1.6rem] overflow-hidden shadow-lg flex flex-col cursor-pointer focus:outline-none border-3 transform-gpu will-change-transform"
              style={{ borderColor: bin.ring }}
              disabled={isInteracting}
            >
              {/* Tampa da Lixeira */}
              <motion.div 
                animate={isActive ? { scaleY: 0.25, y: -4 } : { scaleY: 1, y: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{ background: bin.lid, transformOrigin: "top" }}
                className="w-full py-2 flex justify-center"
              >
                <div className="rounded-full bg-white/30 h-1.5" style={{ width: "30%" }} />
              </motion.div>

              {/* Corpo Principal da Lixeira */}
              <div className="flex-1 flex flex-col items-center justify-center py-3 px-1 gap-0.5" style={{ background: bin.bg }}>
                <span className="mb-0.5 drop-shadow-sm" style={{ fontSize: "clamp(22px,6vw,32px)" }}>{bin.icon}</span>
                <span className="font-black text-center leading-tight tracking-wide" style={{ color: bin.text, fontSize: "clamp(10px,2.4vw,14px)" }}>
                  {binLabel}
                </span>
                <span className="text-center leading-tight opacity-75 font-medium uppercase tracking-tight" style={{ color: bin.text, fontSize: "clamp(7px,1.5vw,9px)" }}>
                  {binEx}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Modal de Sucesso + Painel de Insights Ecológicos Otimizado no Fim */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-slate-950/60 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              transition={{ type: "spring", bounce: 0.25 }}
              className="bg-white rounded-[2.3rem] p-5 md:p-6 text-center shadow-2xl max-w-sm w-full transform-gpu border border-slate-100 flex flex-col gap-3 max-h-[92vh] overflow-hidden"
            >
              <div>
                <div className="text-5xl mb-1 dynamic-bounce">🌱</div>
                <h3 className="font-black text-green-700 tracking-tight text-xl">
                  {t.trashSuccess}
                </h3>
                <p className="text-slate-500 font-bold text-xs tracking-wide mt-0.5">
                  {t.trashScore(correct, items.length)}
                </p>
              </div>

              {/* Bloco Condicional de Aprendizado Avançado */}
              {wrongItems.length > 0 ? (
                <div className="flex-1 overflow-y-auto flex flex-col gap-2 text-left px-1 py-1 custom-scrollbar">
                  <p className="text-slate-400 font-black text-[10px] tracking-widest uppercase border-b border-slate-100 pb-1">
                    {lang === "pt" ? "Recapitulação Ecológica:" : "Eco-Recap Insights:"}
                  </p>
                  {wrongItems.map((item) => (
                    <div key={item.id} className="bg-slate-50 border border-slate-100 p-2.5 rounded-2xl flex gap-2.5 items-start">
                      <span className="text-xl bg-white p-1 rounded-xl shadow-xs shrink-0">{item.emoji}</span>
                      <div className="flex flex-col gap-0.5">
                        <h5 className="font-bold text-slate-800 text-xs">
                          {item.name} → <span className="text-blue-600 font-black">{t.bins[item.bin]}</span>
                        </h5>
                        <p className="text-slate-500 text-[11px] font-medium leading-relaxed">
                          {item.explanation[lang]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-emerald-50 rounded-2xl p-4 my-2 border border-emerald-100">
                  <p className="text-emerald-800 text-xs font-bold leading-normal">
                    {lang === "pt" 
                      ? "Incrível! Separaste todos os resíduos perfeitamente à primeira tentativa. O ecossistema agradece!" 
                      : "Flawless sorting! You categorized every item perfectly on the first try. Nature thanks you!"}
                  </p>
                </div>
              )}

              <p className="text-emerald-500 font-black text-lg animate-pulse mt-1">
                +{Math.round((correct / items.length) * 100)} ⭐
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .inner-shadow { box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.06); }
        .pulse-subtle { animation: softPulse 2.5s infinite ease-in-out; }
        .floating-emoji { display: inline-block; animation: floatEff 3s infinite ease-in-out; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        
        @keyframes softPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
          50% { transform: scale(1.015); box-shadow: 0 30px 60px -10px rgba(0,0,0,0.3); }
        }
        @keyframes floatEff {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
}