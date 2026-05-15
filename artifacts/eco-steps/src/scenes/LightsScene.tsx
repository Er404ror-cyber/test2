import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/* ── Room geometry (perspective walls via clip-path) ─────────────── */
const BW = { x1: 14, y1: 12, x2: 86, y2: 76 }; // back-wall bounds in %

const ROOM_PANELS = [
  { name: "back",    clip: `polygon(${BW.x1}% ${BW.y1}%,${BW.x2}% ${BW.y1}%,${BW.x2}% ${BW.y2}%,${BW.x1}% ${BW.y2}%)`, lightFactor: 1 },
  { name: "floor",   clip: `polygon(${BW.x1}% ${BW.y2}%,${BW.x2}% ${BW.y2}%,100% 100%,0% 100%)`,                         lightFactor: 0.7 },
  { name: "ceiling", clip: `polygon(0% 0%,100% 0%,${BW.x2}% ${BW.y1}%,${BW.x1}% ${BW.y1}%)`,                             lightFactor: 0.55 },
  { name: "left",    clip: `polygon(0% 0%,${BW.x1}% ${BW.y1}%,${BW.x1}% ${BW.y2}%,0% 100%)`,                             lightFactor: 0.6 },
  { name: "right",   clip: `polygon(${BW.x2}% ${BW.y1}%,100% 0%,100% 100%,${BW.x2}% ${BW.y2}%)`,                         lightFactor: 0.6 },
];

const PANEL_COLORS = {
  back:    ["rgb(62,52,140)",    "rgb(20,18,50)"],
  floor:   ["rgb(130,90,45)",    "rgb(40,28,14)"],
  ceiling: ["rgb(50,42,110)",    "rgb(16,14,40)"],
  left:    ["rgb(45,38,100)",    "rgb(15,12,38)"],
  right:   ["rgb(45,38,100)",    "rgb(15,12,38)"],
};

/* ── Lamps ─────────────────────────────────────────────────────────── */
interface Lamp { id: number; x: number; y: number; label: string; size: number; }

const LAMPS: Lamp[] = [
  { id: 1, x: 50, y: 14,  label: "Lustre",     size: 52 },
  { id: 2, x: 24, y: 35,  label: "Abajur",     size: 42 },
  { id: 3, x: 74, y: 34,  label: "Luminária",  size: 42 },
  { id: 4, x: 50, y: 50,  label: "Mesa",       size: 38 },
];

/* ── Child SVG ──────────────────────────────────────────────────────── */
function ChildSvg({ pointing, happy }: { pointing: boolean; happy: boolean }) {
  return (
    <svg viewBox="0 0 70 110" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Hair */}
      <ellipse cx="35" cy="16" rx="18" ry="16" fill="#7c3aed" />
      {/* Head */}
      <circle cx="35" cy="20" r="15" fill="#fbbf24" />
      {/* Eyes */}
      <circle cx="29" cy="17" r={happy ? 3 : 2.5} fill="#1e1b4b" />
      <circle cx="41" cy="17" r={happy ? 3 : 2.5} fill="#1e1b4b" />
      {happy && <><circle cx="30" cy="16" r="1" fill="white" /><circle cx="42" cy="16" r="1" fill="white" /></>}
      {/* Mouth */}
      {happy
        ? <path d="M27 25 Q35 31 43 25" fill="none" stroke="#1e1b4b" strokeWidth="2.2" strokeLinecap="round" />
        : <path d="M29 24 Q35 27 41 24" fill="none" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" />}
      {/* Body */}
      <rect x="20" y="35" width="30" height="35" rx="10" fill="#3b82f6" />
      {/* Left arm */}
      <line x1="20" y1="42" x2="7" y2="58" stroke="#fbbf24" strokeWidth="9" strokeLinecap="round" />
      {/* Right arm – pointing up when needed */}
      {pointing
        ? <line x1="50" y1="40" x2="62" y2="20" stroke="#fbbf24" strokeWidth="9" strokeLinecap="round" />
        : <line x1="50" y1="42" x2="63" y2="58" stroke="#fbbf24" strokeWidth="9" strokeLinecap="round" />}
      {/* Pointing finger */}
      {pointing && <circle cx="63" cy="17" r="5" fill="#fbbf24" />}
      {/* Legs */}
      <line x1="27" y1="70" x2="22" y2="98" stroke="#1d4ed8" strokeWidth="11" strokeLinecap="round" />
      <line x1="43" y1="70" x2="48" y2="98" stroke="#1d4ed8" strokeWidth="11" strokeLinecap="round" />
      {/* Shoes */}
      <ellipse cx="19" cy="101" rx="9" ry="5" fill="#1e1b4b" />
      <ellipse cx="51" cy="101" rx="9" ry="5" fill="#1e1b4b" />
    </svg>
  );
}

/* ── Props ─────────────────────────────────────────────────────────── */
interface Props {
  onComplete: (points: number, message: string) => void;
  totalPoints: number;
  sceneIndex: number;
  totalScenes: number;
}

export default function LightsScene({ onComplete, totalPoints }: Props) {
  const [off, setOff]           = useState<Set<number>>(new Set());
  const [toast, setToast]       = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const allOff   = off.size === LAMPS.length;
  const brightness = Math.max(0, 1 - (off.size / LAMPS.length) * 0.92);

  const turnOff = (id: number) => {
    if (off.has(id) || showSuccess) return;
    const next = new Set(off); next.add(id);
    setOff(next);
    const lbl = LAMPS.find(l => l.id === id)!.label;
    setToast(`✅ ${lbl} apagada! Muito bem!`);
    setTimeout(() => setToast(null), 1600);
  };

  useEffect(() => {
    if (!allOff) return;
    setShowSuccess(true);
    setTimeout(() => onComplete(80, "Todas as luzes apagadas!"), 1900);
  }, [allOff]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none" style={{ fontFamily: "Outfit, sans-serif" }}>

      {/* ── 3D Room (clip-path perspective) ─────────────────────── */}
      <div className="absolute inset-0" style={{ willChange: "contents" }}>
        {ROOM_PANELS.map(p => {
          const base   = PANEL_COLORS[p.name as keyof typeof PANEL_COLORS];
          const bright = base[0];
          const dark   = base[1];
          const r0 = parseInt(bright.slice(4)), g0 = parseInt(bright.split(",")[1]), b0 = parseInt(bright.split(",")[2]);
          const r1 = parseInt(dark.slice(4)),   g1 = parseInt(dark.split(",")[1]),   b1 = parseInt(dark.split(",")[2]);
          const mix = (a: number, b: number) => Math.round(a + (b - a) * (1 - brightness));
          const color = `rgb(${mix(r1,r0)},${mix(g1,g0)},${mix(b1,b0)})`;
          return (
            <div key={p.name} className="absolute inset-0 transition-colors duration-700"
              style={{ clipPath: p.clip, background: color }} />
          );
        })}

        {/* Floor wood planks */}
        {[0,15,30,45,60,75,90].map(x => (
          <div key={x} className="absolute transition-opacity duration-700" style={{
            left: `${x}%`, top: `${BW.y2}%`, bottom: 0, width: "1px",
            background: "rgba(0,0,0,0.25)", opacity: brightness * 0.8,
          }} />
        ))}

        {/* Back wall wallpaper stripes */}
        {[20,30,40,50,60,70,80].map(x => (
          <div key={x} className="absolute transition-opacity duration-700" style={{
            left: `${x * (BW.x2 - BW.x1) / 100 + BW.x1}%`,
            top: `${BW.y1}%`,
            height: `${BW.y2 - BW.y1}%`,
            width: "0.5px",
            background: "rgba(255,255,255,0.08)",
            opacity: brightness,
          }} />
        ))}

        {/* Window on back wall */}
        <div className="absolute rounded-xl overflow-hidden transition-all duration-700"
          style={{
            left: `${BW.x1 + (BW.x2 - BW.x1) * 0.6}%`,
            top: `${BW.y1 + (BW.y2 - BW.y1) * 0.08}%`,
            width: `${(BW.x2 - BW.x1) * 0.28}%`,
            height: `${(BW.y2 - BW.y1) * 0.42}%`,
            background: brightness > 0.5
              ? "linear-gradient(180deg,#1e3a8a,#312e81)"
              : "linear-gradient(180deg,#020617,#0c0a1e)",
            border: `2px solid rgba(255,255,255,${0.12 + brightness * 0.15})`,
          }}>
          <div className="w-full h-full grid grid-cols-2 grid-rows-2">
            {[0,1,2,3].map(i => <div key={i} style={{ border: "1px solid rgba(255,255,255,0.15)" }} />)}
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs opacity-60">🌙</div>
        </div>

        {/* Bed */}
        <div className="absolute transition-all duration-700" style={{
          left: `${BW.x1 + (BW.x2 - BW.x1) * 0.02}%`,
          top: `${BW.y2 - 4}%`,
          width: `${(BW.x2 - BW.x1) * 0.36}%`,
          height: "18%",
        }}>
          <div className="absolute top-0 left-0 right-0 h-1/3 rounded-t-xl"
            style={{ background: `rgba(${Math.round(120 + brightness*55)},${Math.round(75+brightness*25)},${Math.round(35+brightness*15)},0.9)` }} />
          <div className="absolute bottom-0 left-0 right-0 h-2/3 rounded-b-lg"
            style={{ background: `rgba(${Math.round(195+brightness*50)},${Math.round(175+brightness*35)},${Math.round(155+brightness*30)},0.85)` }}>
            <div className="absolute top-1/4 left-2 w-1/3 h-1/3 rounded-full"
              style={{ background: `rgba(255,255,255,${0.55 + brightness * 0.25})` }} />
          </div>
        </div>
      </div>

      {/* ── Child character (bottom-left of 3D room) ─────────────── */}
      <motion.div
        className="absolute z-20"
        style={{ left: "2%", bottom: "5%", width: "clamp(50px,10vw,90px)", height: "clamp(80px,16vw,140px)" }}
        animate={{ y: allOff ? [0,-8,0] : [0,0,0] }}
        transition={{ duration: 0.4, repeat: allOff ? 3 : 0 }}
      >
        <ChildSvg pointing={!allOff && off.size < LAMPS.length} happy={off.size > 0} />
        {/* Speech bubble */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-2 py-1 text-xs font-black text-center shadow-lg whitespace-nowrap"
          animate={{ opacity: 1, scale: 1 }}
          style={{ fontSize: "clamp(8px,1.8vw,12px)" }}
        >
          {allOff ? "🎉 Muito bem!" : off.size === 0 ? "Apague as luzes!" : `${LAMPS.length - off.size} faltam!`}
        </motion.div>
      </motion.div>

      {/* ── Lamps (interactive overlays) ─────────────────────────── */}
      {LAMPS.map(lamp => {
        const isOff = off.has(lamp.id);
        const sz    = lamp.size;
        return (
          <div key={lamp.id} className="absolute z-30" style={{
            left: `calc(${lamp.x}% - ${sz / 2}px)`,
            top:  `calc(${lamp.y}% - ${sz / 2}px)`,
            width: sz, height: sz,
          }}>
            {/* Pulse ring (visible on unclicked lamps) */}
            {!isOff && (
              <div className="pulse-ring-anim absolute rounded-full pointer-events-none"
                style={{ inset: -8, border: "3px solid rgba(255,220,60,0.7)" }} />
            )}

            {/* Glow halo */}
            {!isOff && (
              <div className="absolute rounded-full pointer-events-none"
                style={{ inset: -16, background: "radial-gradient(circle,rgba(255,225,60,0.35) 0%,transparent 70%)", filter: "blur(4px)" }} />
            )}

            {/* Lamp button */}
            <button
              onClick={() => turnOff(lamp.id)}
              className={`w-full h-full rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-400 relative focus:outline-none ${!isOff ? "lamp-on" : ""}`}
              style={{
                background: isOff
                  ? "radial-gradient(circle, #374151, #1f2937)"
                  : "radial-gradient(circle, #fef08a 20%, #fbbf24 60%, #d97706 100%)",
                border: `3px solid ${isOff ? "rgba(255,255,255,0.1)" : "rgba(255,240,100,0.6)"}`,
              }}
              data-testid={`button-lamp-${lamp.id}`}
            >
              <span style={{ fontSize: sz * 0.38, filter: isOff ? "grayscale(1)" : "none" }}>
                {isOff ? "⚫" : "💡"}
              </span>
            </button>

            {/* Label below lamp */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-center pointer-events-none"
              style={{ whiteSpace: "nowrap" }}>
              {!isOff ? (
                <span className="bg-yellow-400 text-yellow-900 rounded-full px-2 py-0.5 font-black shadow"
                  style={{ fontSize: "clamp(8px,1.5vw,11px)" }}>
                  TOQUE AQUI! 👆
                </span>
              ) : (
                <span className="bg-green-500 text-white rounded-full px-2 py-0.5 font-black shadow"
                  style={{ fontSize: "clamp(8px,1.5vw,11px)" }}>
                  ✓ {lamp.label}
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* ── HUD ─────────────────────────────────────────────────────── */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-40">
        <div className="bg-black/50 backdrop-blur rounded-2xl px-3 py-1.5 flex items-center gap-2">
          <span className="text-white font-black" style={{ fontSize: "clamp(11px,2.5vw,14px)" }}>
            💡 {LAMPS.length - off.size}/{LAMPS.length} acesas
          </span>
        </div>
        <div className="bg-black/50 backdrop-blur rounded-2xl px-3 py-1.5">
          <span className="text-yellow-300 font-black" style={{ fontSize: "clamp(11px,2.5vw,14px)" }}>
            ⭐ {totalPoints}
          </span>
        </div>
      </div>

      {/* ── Toast ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="absolute left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white font-black px-5 py-2 rounded-2xl shadow-xl"
            style={{ bottom: "14%", fontSize: "clamp(12px,2.8vw,15px)" }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Success overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.72)" }}>
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.55 }}
              className="bg-white rounded-[2rem] p-8 text-center shadow-2xl max-w-xs w-full mx-4"
            >
              <div className="text-6xl mb-3">🌙⚡</div>
              <h3 className="font-black text-indigo-700 mb-1" style={{ fontSize: "clamp(18px,5vw,26px)" }}>
                Energia economizada!
              </h3>
              <p className="text-gray-400 font-medium">+80 pontos ganhos!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
