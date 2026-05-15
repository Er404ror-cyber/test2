import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Light {
  id: number;
  x: number;
  y: number;
  type: "ceiling" | "desk" | "floor" | "wall";
  label: string;
}

const LIGHTS: Light[] = [
  { id: 1, x: 50, y: 8, type: "ceiling", label: "Lustre" },
  { id: 2, x: 18, y: 38, type: "desk", label: "Abajur" },
  { id: 3, x: 78, y: 52, type: "floor", label: "Luminária" },
  { id: 4, x: 85, y: 18, type: "wall", label: "Arandela" },
];

interface Props {
  onComplete: (points: number, message: string) => void;
  totalPoints: number;
  sceneIndex: number;
  totalScenes: number;
}

export default function LightsScene({ onComplete, totalPoints, sceneIndex, totalScenes }: Props) {
  const [off, setOff] = useState<Set<number>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const allOff = off.size === LIGHTS.length;

  const turnOff = (id: number) => {
    if (off.has(id)) return;
    const newOff = new Set(off);
    newOff.add(id);
    setOff(newOff);
    const light = LIGHTS.find(l => l.id === id);
    setHint(`✅ ${light?.label} apagada!`);
    setTimeout(() => setHint(null), 1400);
  };

  useEffect(() => {
    if (allOff) {
      setShowSuccess(true);
      setTimeout(() => onComplete(80, "Todas as luzes apagadas!"), 1800);
    }
  }, [allOff]);

  const ambientBrightness = Math.max(0.05, 1 - (off.size / LIGHTS.length) * 0.85);

  return (
    <div className="relative w-full h-full overflow-hidden select-none" style={{ fontFamily: "Outfit, sans-serif" }}>

      {/* Room background */}
      <div className="absolute inset-0 transition-all duration-700"
        style={{ background: `linear-gradient(180deg, rgb(${Math.round(20 + ambientBrightness * 60)},${Math.round(15 + ambientBrightness * 40)},${Math.round(60 + ambientBrightness * 80)}) 0%, rgb(${Math.round(30 + ambientBrightness * 50)},${Math.round(20 + ambientBrightness * 35)},${Math.round(70 + ambientBrightness * 60)}) 60%, rgb(${Math.round(60 + ambientBrightness * 100)},${Math.round(45 + ambientBrightness * 70)},${Math.round(30 + ambientBrightness * 40)}) 100%)` }}
      />

      {/* Window */}
      <div className="absolute rounded-2xl overflow-hidden border-4 border-white/20"
        style={{ left: "62%", top: "12%", width: "22%", height: "28%" }}>
        <div className="w-full h-full" style={{ background: off.size >= 3 ? "linear-gradient(180deg,#0a0a2e,#1a1a4e)" : "linear-gradient(180deg,#1a2a6c,#b21f1f,#fdbb2d)", opacity: 0.8 }} />
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          {[0,1,2,3].map(i => <div key={i} className="border border-white/20" />)}
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-white/40 font-bold">🌙</div>
      </div>

      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0 transition-all duration-700"
        style={{ height: "28%", background: `linear-gradient(180deg, rgb(${Math.round(90 + ambientBrightness*60)},${Math.round(60 + ambientBrightness*30)},${Math.round(30 + ambientBrightness*15)}), rgb(${Math.round(70 + ambientBrightness*40)},${Math.round(45 + ambientBrightness*20)},${Math.round(20 + ambientBrightness*10)}))` }}>
        {/* Floor planks */}
        {[10,25,40,55,70,85].map(x => (
          <div key={x} className="absolute top-0 bottom-0 w-px opacity-20" style={{ left: `${x}%`, background: "rgba(0,0,0,0.5)" }} />
        ))}
      </div>

      {/* Baseboard */}
      <div className="absolute left-0 right-0 h-3 opacity-30 bg-white/20 transition-all duration-700"
        style={{ bottom: "28%" }} />

      {/* BED */}
      <div className="absolute" style={{ left: "4%", bottom: "26%", width: "32%", height: "32%" }}>
        {/* Headboard */}
        <div className="absolute top-0 left-0 right-0 h-2/5 rounded-t-2xl transition-colors duration-700"
          style={{ background: `rgba(${Math.round(120+ambientBrightness*60)},${Math.round(80+ambientBrightness*30)},${Math.round(40+ambientBrightness*20)},0.9)` }} />
        {/* Mattress */}
        <div className="absolute left-0 right-0 bottom-0 h-3/5 rounded-b-xl transition-colors duration-700"
          style={{ background: `rgba(${Math.round(200+ambientBrightness*55)},${Math.round(180+ambientBrightness*40)},${Math.round(160+ambientBrightness*30)},0.85)` }}>
          <div className="absolute top-1/4 left-2 right-2 h-1/4 rounded-full opacity-60"
            style={{ background: `rgba(${Math.round(240+ambientBrightness*15)},${Math.round(220+ambientBrightness*15)},${Math.round(200+ambientBrightness*15)},0.7)` }} />
        </div>
        {/* Pillow */}
        <div className="absolute rounded-lg top-[38%] left-[10%] w-[35%] h-[28%] transition-colors duration-700"
          style={{ background: `rgba(${Math.round(240+ambientBrightness*15)},${Math.round(235+ambientBrightness*15)},${Math.round(255)},0.85)` }} />
      </div>

      {/* DESK */}
      <div className="absolute" style={{ left: "4%", bottom: "28%", width: "18%", height: "16%" }}>
        <div className="absolute inset-0 rounded-lg transition-colors duration-700"
          style={{ background: `rgba(${Math.round(100+ambientBrightness*50)},${Math.round(65+ambientBrightness*25)},${Math.round(35+ambientBrightness*15)},0.9)` }} />
        {/* Desk legs */}
        <div className="absolute bottom-0 left-[10%] w-[10%] h-[60%] translate-y-full rounded-b"
          style={{ background: `rgba(80,50,25,0.8)` }} />
        <div className="absolute bottom-0 right-[10%] w-[10%] h-[60%] translate-y-full rounded-b"
          style={{ background: `rgba(80,50,25,0.8)` }} />
        {/* Book */}
        <div className="absolute top-[15%] right-[15%] w-[25%] h-[55%] rounded-sm"
          style={{ background: `rgba(${Math.round(180+ambientBrightness*60)},60,60,0.8)` }} />
      </div>

      {/* WARDROBE */}
      <div className="absolute" style={{ right: "2%", bottom: "28%", width: "18%", height: "48%" }}>
        <div className="absolute inset-0 rounded-lg transition-colors duration-700"
          style={{ background: `rgba(${Math.round(100+ambientBrightness*50)},${Math.round(65+ambientBrightness*25)},${Math.round(35+ambientBrightness*15)},0.9)` }}>
          <div className="absolute inset-x-[45%] top-[10%] bottom-[10%] w-px opacity-30 bg-white" />
          <div className="absolute left-[25%] top-1/2 w-[20%] h-[8%] rounded-full opacity-60"
            style={{ background: `rgba(${Math.round(220+ambientBrightness*35)},${Math.round(190+ambientBrightness*40)},${Math.round(140+ambientBrightness*30)},0.8)` }} />
          <div className="absolute right-[25%] top-1/2 w-[20%] h-[8%] rounded-full opacity-60"
            style={{ background: `rgba(${Math.round(220+ambientBrightness*35)},${Math.round(190+ambientBrightness*40)},${Math.round(140+ambientBrightness*30)},0.8)` }} />
        </div>
      </div>

      {/* LIGHTS — interactive */}
      {LIGHTS.map(light => {
        const isOff = off.has(light.id);
        const glowColor = isOff ? "rgba(0,0,0,0)" : "rgba(255,230,80,0.5)";
        const bulbColor = isOff ? `rgba(60,60,70,0.8)` : `rgba(255,240,100,1)`;

        return (
          <g key={light.id}>
            {/* Glow halo */}
            {!isOff && (
              <motion.div
                className="absolute rounded-full pointer-events-none"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  left: `calc(${light.x}% - 6%)`,
                  top: `calc(${light.y}% - 3%)`,
                  width: "12%",
                  height: "16%",
                  background: "radial-gradient(circle, rgba(255,230,80,0.4) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />
            )}

            {/* Cord (for ceiling/wall) */}
            {light.type === "ceiling" && (
              <div className="absolute w-px bg-white/30" style={{
                left: `${light.x}%`,
                top: 0,
                height: `${light.y + 3}%`,
              }} />
            )}

            {/* Lamp body */}
            <motion.button
              onClick={() => turnOff(light.id)}
              whileTap={!isOff ? { scale: 0.85 } : {}}
              whileHover={!isOff ? { scale: 1.15 } : {}}
              animate={isOff ? { scale: 1 } : { scale: [1, 1.03, 1] }}
              transition={isOff ? {} : { duration: 2, repeat: Infinity }}
              className="absolute flex flex-col items-center gap-0.5 cursor-pointer"
              style={{ left: `${light.x - 3}%`, top: `${light.y}%`, width: "6%", zIndex: 20 }}
              data-testid={`button-light-${light.id}`}
            >
              {/* Lamp shade */}
              <div className="w-full relative flex flex-col items-center" style={{ aspectRatio: "1.2" }}>
                {light.type === "ceiling" && (
                  <div className="w-full h-full transition-all duration-500" style={{
                    clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
                    background: isOff ? "rgba(80,80,90,0.8)" : `linear-gradient(180deg, rgba(200,160,60,0.9), rgba(255,210,80,0.9))`,
                    boxShadow: isOff ? "none" : `0 4px 20px ${glowColor}, 0 0 30px rgba(255,220,60,0.6)`,
                  }} />
                )}
                {light.type === "desk" && (
                  <div className="w-full h-3/4 rounded-b-full transition-all duration-500" style={{
                    background: isOff ? "rgba(80,80,90,0.8)" : `linear-gradient(180deg, rgba(200,100,50,0.9), rgba(255,140,60,0.9))`,
                    boxShadow: isOff ? "none" : `0 6px 20px rgba(255,140,60,0.6)`,
                  }} />
                )}
                {light.type === "floor" && (
                  <div className="w-3/4 h-full rounded-t-full mx-auto transition-all duration-500" style={{
                    background: isOff ? "rgba(80,80,90,0.8)" : `linear-gradient(180deg, rgba(240,200,80,0.9), rgba(255,230,100,0.9))`,
                    boxShadow: isOff ? "none" : `0 0 20px rgba(255,230,80,0.6)`,
                  }} />
                )}
                {light.type === "wall" && (
                  <div className="w-full h-full rounded-full transition-all duration-500" style={{
                    background: isOff ? "rgba(80,80,90,0.8)" : `radial-gradient(circle, rgba(255,250,200,1) 30%, rgba(255,220,60,0.8) 100%)`,
                    boxShadow: isOff ? "none" : `0 0 20px rgba(255,230,80,0.8), 0 0 40px rgba(255,230,80,0.4)`,
                  }} />
                )}

                {/* Checkmark when off */}
                <AnimatePresence>
                  {isOff && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center text-xs"
                    >
                      <span className="text-green-400 font-black" style={{ fontSize: "clamp(8px,2vw,16px)" }}>✓</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Label */}
              <span className="text-center leading-tight font-bold text-white/70 transition-colors"
                style={{ fontSize: "clamp(6px,1.2vw,11px)", textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
                {isOff ? "✓" : "💡"}
              </span>
            </motion.button>
          </g>
        );
      })}

      {/* HUD — progress */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30">
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-3 py-1.5 flex items-center gap-2">
          <span className="text-white font-black text-sm">💡 {LIGHTS.length - off.size} restantes</span>
        </div>
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-3 py-1.5">
          <span className="text-yellow-300 font-black text-sm">⭐ {totalPoints}</span>
        </div>
      </div>

      {/* Objective banner */}
      <div className="absolute bottom-3 left-3 right-3 z-30">
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl px-4 py-2 text-center">
          <p className="text-white/90 font-bold text-sm">Clique nas lâmpadas acesas para apagá-las!</p>
        </div>
      </div>

      {/* Hint toast */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 z-40 bg-green-500 text-white font-black px-5 py-2 rounded-2xl shadow-xl text-sm"
            style={{ bottom: "18%" }}
          >
            {hint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: "rgba(0,0,0,0.7)" }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="bg-white rounded-[2rem] p-8 text-center shadow-2xl"
            >
              <div className="text-6xl mb-3">🌙✨</div>
              <h3 className="text-2xl font-black text-indigo-700 mb-1">Energia economizada!</h3>
              <p className="text-gray-500 font-medium">+80 pontos</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
