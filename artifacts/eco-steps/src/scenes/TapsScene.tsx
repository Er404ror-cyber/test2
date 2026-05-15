import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/* ── Tap definitions ─────────────────────────────────────────────── */
interface Tap { id: number; x: number; label: string; }
const TAPS: Tap[] = [
  { id: 1, x: 20, label: "Torneira A" },
  { id: 2, x: 50, label: "Torneira B" },
  { id: 3, x: 80, label: "Torneira C" },
];

/* ── Child SVG ──────────────────────────────────────────────────────── */
function WaterChild({ happy }: { happy: boolean }) {
  return (
    <svg viewBox="0 0 70 110" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="35" cy="16" rx="18" ry="16" fill="#0284c7" />
      <circle cx="35" cy="20" r="15" fill="#fbbf24" />
      <circle cx="29" cy="17" r="3" fill="#1e1b4b" />
      <circle cx="41" cy="17" r="3" fill="#1e1b4b" />
      <circle cx="30" cy="16" r="1" fill="white" />
      <circle cx="42" cy="16" r="1" fill="white" />
      {happy
        ? <path d="M27 25 Q35 31 43 25" fill="none" stroke="#1e1b4b" strokeWidth="2.2" strokeLinecap="round" />
        : <path d="M29 23 Q35 26 41 23" fill="none" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" />}
      <rect x="20" y="35" width="30" height="35" rx="10" fill="#0ea5e9" />
      {/* Left arm raised/pointing */}
      <line x1="20" y1="40" x2="5" y2="25" stroke="#fbbf24" strokeWidth="9" strokeLinecap="round" />
      <circle cx="4" cy="22" r="5" fill="#fbbf24" />
      <line x1="50" y1="42" x2="63" y2="56" stroke="#fbbf24" strokeWidth="9" strokeLinecap="round" />
      <line x1="27" y1="70" x2="22" y2="98" stroke="#0284c7" strokeWidth="11" strokeLinecap="round" />
      <line x1="43" y1="70" x2="48" y2="98" stroke="#0284c7" strokeWidth="11" strokeLinecap="round" />
      <ellipse cx="19" cy="101" rx="9" ry="5" fill="#1e1b4b" />
      <ellipse cx="51" cy="101" rx="9" ry="5" fill="#1e1b4b" />
    </svg>
  );
}

/* ── Props ─────────────────────────────────────────────────────────── */
interface Props {
  onComplete: (points: number, message: string) => void;
  totalPoints: number;
}

export default function TapsScene({ onComplete, totalPoints }: Props) {
  const [closed, setClosed] = useState<Set<number>>(new Set());
  const [toast, setToast]   = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const allClosed  = closed.size === TAPS.length;
  const litersSaved = closed.size * 12;

  const closeTap = (id: number) => {
    if (closed.has(id) || showSuccess) return;
    const next = new Set(closed); next.add(id);
    setClosed(next);
    setToast(`✅ Torneira fechada! ${(next.size) * 12}L poupados!`);
    setTimeout(() => setToast(null), 1600);
  };

  useEffect(() => {
    if (!allClosed) return;
    setShowSuccess(true);
    setTimeout(() => onComplete(80, `${litersSaved}L de água poupados!`), 1900);
  }, [allClosed]);

  /* Room panels – same perspective technique as LightsScene */
  const BW = { x1: 8, y1: 10, x2: 92, y2: 78 };

  return (
    <div className="relative w-full h-full overflow-hidden select-none" style={{ fontFamily: "Outfit, sans-serif" }}>

      {/* ── 3D bathroom background ─────────────────────────────── */}
      <div className="absolute inset-0">
        {/* Back wall – blue tiles */}
        <div className="absolute inset-0" style={{
          clipPath: `polygon(${BW.x1}% ${BW.y1}%,${BW.x2}% ${BW.y1}%,${BW.x2}% ${BW.y2}%,${BW.x1}% ${BW.y2}%)`,
          background: "#bfdbfe",
        }}>
          {/* Tile grid – back wall */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }}>
            <defs>
              <pattern id="tiles-bw" x="0" y="0" width="8%" height="10%" patternUnits="objectBoundingBox">
                <rect width="92%" height="92%" fill="none" stroke="#3b82f6" strokeWidth="1.5" rx="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tiles-bw)" />
          </svg>
        </div>

        {/* Floor */}
        <div className="absolute inset-0" style={{
          clipPath: `polygon(${BW.x1}% ${BW.y2}%,${BW.x2}% ${BW.y2}%,100% 100%,0% 100%)`,
          background: "linear-gradient(180deg,#e2e8f0,#cbd5e1)",
        }}>
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <defs>
              <pattern id="floor-tiles" x="0" y="0" width="12%" height="12%" patternUnits="objectBoundingBox">
                <rect width="90%" height="90%" fill="none" stroke="#94a3b8" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#floor-tiles)" />
          </svg>
        </div>

        {/* Ceiling */}
        <div className="absolute inset-0" style={{
          clipPath: `polygon(0% 0%,100% 0%,${BW.x2}% ${BW.y1}%,${BW.x1}% ${BW.y1}%)`,
          background: "#e0f2fe",
        }} />

        {/* Side walls */}
        <div className="absolute inset-0" style={{
          clipPath: `polygon(0% 0%,${BW.x1}% ${BW.y1}%,${BW.x1}% ${BW.y2}%,0% 100%)`,
          background: "#bfdbfe",
        }} />
        <div className="absolute inset-0" style={{
          clipPath: `polygon(${BW.x2}% ${BW.y1}%,100% 0%,100% 100%,${BW.x2}% ${BW.y2}%)`,
          background: "#bfdbfe",
        }} />

        {/* Mirror on back wall */}
        <div className="absolute rounded-xl overflow-hidden"
          style={{
            left: `${BW.x1 + (BW.x2 - BW.x1) * 0.22}%`,
            top: `${BW.y1 + (BW.y2 - BW.y1) * 0.04}%`,
            width: `${(BW.x2 - BW.x1) * 0.56}%`,
            height: `${(BW.y2 - BW.y1) * 0.38}%`,
            background: "linear-gradient(135deg,rgba(186,230,253,0.85),rgba(224,242,254,0.7))",
            border: "3px solid rgba(255,255,255,0.8)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}>
          <div className="absolute top-2 left-3 text-base opacity-50">🪞</div>
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-40">
            {TAPS.map(t => (
              <span key={t.id} style={{ fontSize: "clamp(14px,3.5vw,22px)" }}>
                {closed.has(t.id) ? "🚿" : "💧"}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sink counter (absolute positioned on "floor line") ──── */}
      <div className="absolute z-10" style={{
        left: "8%", right: "8%",
        top: `${BW.y2 - 2}%`,
        height: "36%",
      }}>
        {/* Counter surface */}
        <div className="absolute top-0 left-0 right-0 h-[22%] rounded-t-xl shadow-md"
          style={{ background: "linear-gradient(180deg,#f8fafc,#e2e8f0)", border: "2px solid #cbd5e1" }} />
        {/* Counter body */}
        <div className="absolute left-0 right-0 bottom-0 rounded-b-xl"
          style={{ top: "20%", background: "linear-gradient(180deg,#e2e8f0,#cbd5e1)", border: "2px solid #cbd5e1" }}>
          {/* Cabinet lines */}
          <div className="absolute inset-y-[15%] left-[4%] w-[44%] rounded-lg border-2 border-white/50 shadow-inner" style={{ background: "#f1f5f9" }}>
            <div className="absolute inset-x-[42%] top-[35%] bottom-[35%] w-1 rounded-full bg-gray-300" />
          </div>
          <div className="absolute inset-y-[15%] right-[4%] w-[44%] rounded-lg border-2 border-white/50 shadow-inner" style={{ background: "#f1f5f9" }}>
            <div className="absolute inset-x-[42%] top-[35%] bottom-[35%] w-1 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>

      {/* ── Tap assemblies (positioned at counter level) ─────────── */}
      {TAPS.map(tap => {
        const isClosed = closed.has(tap.id);
        const pct = tap.x;

        return (
          <div key={tap.id} className="absolute z-20 flex flex-col items-center"
            style={{
              left: `${pct}%`,
              top: `${BW.y2 - 12}%`,
              transform: "translateX(-50%)",
              width: "clamp(52px,13vw,90px)",
            }}>

            {/* Spout neck */}
            <div className="rounded-t-full mx-auto" style={{
              width: "28%", height: "clamp(18px,4vw,30px)",
              background: "linear-gradient(180deg,#e2e8f0,#94a3b8)",
            }} />

            {/* Spout tip */}
            <div className="rounded-b-full mx-auto" style={{
              width: "42%", height: "clamp(8px,2vw,14px)",
              background: "#64748b",
            }} />

            {/* ── Water stream (CSS only, GPU-composited) ───────── */}
            {!isClosed && (
              <div className="water-stream rounded-b-full mx-auto pointer-events-none"
                style={{
                  width: "clamp(8px,2.2vw,14px)",
                  height: "clamp(50px,12vw,90px)",
                  backgroundImage: "repeating-linear-gradient(180deg, rgba(96,165,250,0.95) 0px, rgba(147,197,253,0.75) 7px, rgba(59,130,246,0.9) 14px, rgba(96,165,250,0.95) 20px)",
                  backgroundSize: "100% 20px",
                  borderRadius: "0 0 6px 6px",
                  filter: "blur(0.8px)",
                  boxShadow: "0 0 8px 3px rgba(96,165,250,0.5)",
                }} />
            )}

            {/* Puddle at base */}
            {!isClosed && (
              <motion.div
                animate={{ scaleX: [0.6, 1.1, 0.8], opacity: [0.7, 0.5, 0.7] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="rounded-full pointer-events-none mx-auto"
                style={{
                  width: "clamp(22px,6vw,44px)",
                  height: "clamp(6px,1.5vw,10px)",
                  background: "rgba(96,165,250,0.45)",
                  filter: "blur(2px)",
                }} />
            )}

            {/* Tap handle — big red button when open */}
            <motion.button
              onClick={() => closeTap(tap.id)}
              whileTap={!isClosed ? { scale: 0.8, rotate: 90 } : {}}
              whileHover={!isClosed ? { scale: 1.12, y: -2 } : {}}
              className="relative rounded-full flex items-center justify-center font-black shadow-lg focus:outline-none"
              style={{
                width: "clamp(38px,9vw,62px)",
                height: "clamp(38px,9vw,62px)",
                background: isClosed
                  ? "linear-gradient(135deg,#22c55e,#15803d)"
                  : "linear-gradient(135deg,#ef4444,#b91c1c)",
                border: `4px solid ${isClosed ? "#bbf7d0" : "#fca5a5"}`,
                cursor: isClosed ? "default" : "pointer",
                boxShadow: isClosed ? "none" : "0 0 0 0 rgba(239,68,68,0.6)",
                animation: isClosed ? "none" : "pulse-ring 1.2s ease-out infinite",
                fontSize: "clamp(14px,3.5vw,22px)",
                marginTop: !isClosed ? 0 : 4,
              }}
              data-testid={`button-tap-${tap.id}`}
            >
              {isClosed ? "✓" : "🔴"}
            </motion.button>

            {/* Label */}
            <div className="mt-1 text-center" style={{ fontSize: "clamp(8px,1.8vw,11px)" }}>
              {isClosed
                ? <span className="bg-green-500 text-white rounded-full px-2 py-0.5 font-black">Fechada ✓</span>
                : <span className="bg-red-500 text-white rounded-full px-2 py-0.5 font-black">FECHE! 👆</span>}
            </div>
          </div>
        );
      })}

      {/* ── Child character ──────────────────────────────────────── */}
      <motion.div className="absolute z-20"
        style={{ right: "1%", bottom: "8%", width: "clamp(50px,11vw,82px)", height: "clamp(80px,17vw,128px)" }}
        animate={allClosed ? { y: [0,-10,0,-10,0] } : { y: 0 }}
        transition={{ duration: 0.5, repeat: allClosed ? 2 : 0 }}>
        <WaterChild happy={closed.size > 0} />
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-2 py-1 shadow-lg whitespace-nowrap font-black text-center"
          style={{ fontSize: "clamp(8px,1.8vw,11px)" }}>
          {allClosed ? "🎉 Parabéns!" : closed.size === 0 ? "Feche as torneiras!" : `${TAPS.length - closed.size} faltam!`}
        </div>
      </motion.div>

      {/* ── Stats HUD ───────────────────────────────────────────── */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-40">
        <div className="bg-white/70 backdrop-blur rounded-2xl px-3 py-1.5 flex items-center gap-1">
          <span className="font-black text-blue-700" style={{ fontSize: "clamp(10px,2.3vw,13px)" }}>
            💧 {TAPS.length - closed.size}/{TAPS.length} abertas
          </span>
        </div>
        <motion.div key={litersSaved} initial={{ scale: 1.3 }} animate={{ scale: 1 }}
          className="bg-white/70 backdrop-blur rounded-2xl px-3 py-1.5">
          <span className="font-black text-cyan-700" style={{ fontSize: "clamp(10px,2.3vw,13px)" }}>
            🌊 {litersSaved}L poupados
          </span>
        </motion.div>
        <div className="bg-white/70 backdrop-blur rounded-2xl px-3 py-1.5">
          <span className="font-black text-yellow-600" style={{ fontSize: "clamp(10px,2.3vw,13px)" }}>⭐{totalPoints}</span>
        </div>
      </div>

      {/* ── Toast ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div key="toast"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className="absolute left-1/2 -translate-x-1/2 z-50 bg-blue-500 text-white font-black px-5 py-2 rounded-2xl shadow-xl"
            style={{ bottom: "16%", fontSize: "clamp(12px,2.8vw,15px)" }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Success ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.68)" }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.55 }}
              className="bg-white rounded-[2rem] p-8 text-center shadow-2xl max-w-xs w-full mx-4">
              <div className="text-6xl mb-3">💧✅</div>
              <h3 className="font-black text-blue-700 mb-1" style={{ fontSize: "clamp(18px,5vw,24px)" }}>
                Água poupada!
              </h3>
              <p className="text-gray-400 font-medium">Você poupou {litersSaved} litros!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
