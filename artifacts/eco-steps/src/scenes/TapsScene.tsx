import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Tap {
  id: number;
  x: number;
  label: string;
  dropColor: string;
}

const TAPS: Tap[] = [
  { id: 1, x: 28, label: "Torneira 1", dropColor: "#60a5fa" },
  { id: 2, x: 50, label: "Torneira 2", dropColor: "#38bdf8" },
  { id: 3, x: 72, label: "Torneira 3", dropColor: "#7dd3fc" },
];

interface Props {
  onComplete: (points: number, message: string) => void;
  totalPoints: number;
  sceneIndex: number;
  totalScenes: number;
}

export default function TapsScene({ onComplete, totalPoints }: Props) {
  const [closed, setClosed] = useState<Set<number>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const allClosed = closed.size === TAPS.length;

  const closeTap = (id: number) => {
    if (closed.has(id)) return;
    const next = new Set(closed);
    next.add(id);
    setClosed(next);
    setHint(`✅ Torneira ${id} fechada!`);
    setTimeout(() => setHint(null), 1400);
  };

  useEffect(() => {
    if (allClosed) {
      setShowSuccess(true);
      setTimeout(() => onComplete(80, "Toda a água economizada!"), 1800);
    }
  }, [allClosed]);

  const waterSaved = Math.round(closed.size * 12);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ fontFamily: "Outfit, sans-serif" }}>

      {/* Bathroom background — tiles */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #e0f2fe 0%, #bae6fd 100%)" }}>
        {/* Tile grid */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tiles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="38" height="38" fill="none" stroke="#0ea5e9" strokeWidth="1" rx="3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tiles)"/>
        </svg>
        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[22%]" style={{ background: "linear-gradient(180deg, #e2e8f0, #cbd5e1)" }}>
          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="floor" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="58" height="58" fill="none" stroke="#94a3b8" strokeWidth="1" rx="2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#floor)"/>
          </svg>
        </div>
        {/* Mirror */}
        <div className="absolute rounded-2xl border-4 border-white/60 shadow-xl overflow-hidden"
          style={{ left: "15%", top: "5%", width: "70%", height: "22%", background: "linear-gradient(135deg, rgba(186,230,253,0.8), rgba(224,242,254,0.6))" }}>
          <div className="absolute top-2 left-3 font-bold text-blue-400/60 text-xs">🪞</div>
          {/* Reflection hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            {TAPS.map(t => (
              <div key={t.id} className={`mx-3 text-blue-300 font-black text-lg ${closed.has(t.id) ? "opacity-40" : ""}`}>
                {closed.has(t.id) ? "🚰" : "💧"}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HUD */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30">
        <div className="bg-white/70 backdrop-blur rounded-2xl px-3 py-1.5 flex items-center gap-2">
          <span className="text-blue-700 font-black text-sm">💧 {TAPS.length - closed.size} abertas</span>
        </div>
        <motion.div
          key={waterSaved}
          initial={{ scale: 1.3, color: "#16a34a" }}
          animate={{ scale: 1, color: "#1d4ed8" }}
          className="bg-white/70 backdrop-blur rounded-2xl px-3 py-1.5"
        >
          <span className="font-black text-sm">💧 {waterSaved}L poupados</span>
        </motion.div>
        <div className="bg-white/70 backdrop-blur rounded-2xl px-3 py-1.5">
          <span className="text-yellow-600 font-black text-sm">⭐ {totalPoints}</span>
        </div>
      </div>

      {/* SINK COUNTER */}
      <div className="absolute z-10" style={{ left: "5%", right: "5%", bottom: "22%", height: "46%" }}>
        {/* Counter top */}
        <div className="absolute top-0 left-0 right-0 h-[18%] rounded-t-xl shadow-md"
          style={{ background: "linear-gradient(180deg, #f1f5f9, #e2e8f0)", border: "2px solid #cbd5e1" }} />
        {/* Counter body */}
        <div className="absolute top-[16%] left-0 right-0 bottom-0 rounded-b-lg"
          style={{ background: "linear-gradient(180deg, #e2e8f0, #cbd5e1)" }}>
          {/* Cabinet doors */}
          <div className="absolute top-[15%] left-[5%] w-[38%] h-[70%] rounded-lg border-2 border-white/60 shadow-inner"
            style={{ background: "linear-gradient(135deg, #f8fafc, #e2e8f0)" }}>
            <div className="absolute inset-x-[40%] top-[30%] bottom-[30%] w-1 rounded-full bg-gray-300/80" />
          </div>
          <div className="absolute top-[15%] right-[5%] w-[38%] h-[70%] rounded-lg border-2 border-white/60 shadow-inner"
            style={{ background: "linear-gradient(135deg, #f8fafc, #e2e8f0)" }}>
            <div className="absolute inset-x-[40%] top-[30%] bottom-[30%] w-1 rounded-full bg-gray-300/80" />
          </div>
        </div>

        {/* SINK BASINS */}
        {TAPS.map((tap, i) => {
          const isClosed = closed.has(tap.id);
          const sinkLeft = i === 0 ? "5%" : i === 1 ? "37%" : "69%";
          const sinkW = "26%";

          return (
            <div key={tap.id} className="absolute" style={{ left: sinkLeft, top: "-2%", width: sinkW }}>
              {/* Basin bowl */}
              <div className="relative w-full rounded-b-[60%] rounded-t-xl overflow-visible"
                style={{ paddingBottom: "65%", background: "linear-gradient(180deg,#f0f9ff,#e0f2fe)", border: "2px solid #bae6fd", boxShadow: "inset 0 4px 12px rgba(14,165,233,0.15)" }}>

                {/* Drain */}
                <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 rounded-full"
                  style={{ width: "20%", height: "10%", background: "#94a3b8" }} />

                {/* Standing water (when open) */}
                <AnimatePresence>
                  {!isClosed && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "25%" }}
                      exit={{ height: 0 }}
                      className="absolute bottom-0 left-0 right-0 rounded-b-[60%]"
                      style={{ background: "linear-gradient(180deg, rgba(96,165,250,0.4), rgba(59,130,246,0.6))" }}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* TAP BODY — above basin */}
              <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ bottom: "100%", width: "50%" }}>
                {/* Spout */}
                <div className="w-full relative" style={{ height: "clamp(18px,4vw,32px)" }}>
                  <div className="absolute left-1/2 -translate-x-1/2 rounded-full"
                    style={{ width: "35%", height: "100%", background: isClosed ? "linear-gradient(180deg,#94a3b8,#64748b)" : "linear-gradient(180deg,#e2e8f0,#94a3b8)" }} />
                  {/* Spout tip */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                    style={{ width: "50%", height: "35%", background: "#64748b" }} />
                </div>

                {/* WATER DROPS */}
                <AnimatePresence>
                  {!isClosed && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 overflow-visible pointer-events-none" style={{ zIndex: 20 }}>
                      {[0, 1, 2].map(j => (
                        <motion.div
                          key={j}
                          className="absolute left-1/2 -translate-x-1/2 rounded-full"
                          style={{ width: "clamp(4px,1.2vw,8px)", height: "clamp(8px,2vw,14px)", background: tap.dropColor, top: 0 }}
                          animate={{ y: ["0px", "clamp(30px,8vw,60px)", "clamp(30px,8vw,60px)"], opacity: [0, 1, 0], scaleX: [0.8, 1, 0.8] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: j * 0.27, ease: "easeIn" }}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>

                {/* TAP HANDLE — clickable */}
                <motion.button
                  onClick={() => closeTap(tap.id)}
                  whileTap={!isClosed ? { scale: 0.85, rotate: 90 } : {}}
                  whileHover={!isClosed ? { scale: 1.12 } : {}}
                  animate={isClosed ? {} : { boxShadow: ["0 0 0 0 rgba(239,68,68,0.4)", "0 0 0 8px rgba(239,68,68,0)", "0 0 0 0 rgba(239,68,68,0)"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative rounded-full flex items-center justify-center font-black shadow-lg transition-all duration-300"
                  style={{
                    width: "clamp(28px,7vw,48px)",
                    height: "clamp(28px,7vw,48px)",
                    background: isClosed ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#ef4444,#dc2626)",
                    fontSize: "clamp(12px,3vw,20px)",
                    cursor: isClosed ? "default" : "pointer",
                    border: "3px solid rgba(255,255,255,0.5)",
                    marginTop: "2px",
                  }}
                  data-testid={`button-tap-${tap.id}`}
                >
                  {isClosed ? "✓" : "🔴"}
                </motion.button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Objective banner */}
      <div className="absolute bottom-3 left-3 right-3 z-30">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-2 text-center">
          <p className="text-blue-800 font-bold text-sm">Clique nos botões vermelhos para fechar as torneiras!</p>
        </div>
      </div>

      {/* Hint toast */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-1/2 -translate-x-1/2 z-40 bg-blue-500 text-white font-black px-5 py-2 rounded-2xl shadow-xl text-sm"
            style={{ bottom: "18%" }}
          >
            {hint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.65)" }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
              className="bg-white rounded-[2rem] p-8 text-center shadow-2xl">
              <div className="text-6xl mb-3">💧✅</div>
              <h3 className="text-2xl font-black text-blue-700 mb-1">Água economizada!</h3>
              <p className="text-gray-500 font-medium">Você poupou {waterSaved} litros!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
