import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { TRASH_ITEMS, TrashItem } from "@/data/game-data";

interface Bin {
  id: "blue" | "brown" | "gray";
  label: string;
  emoji: string;
  bg: string;
  border: string;
  lid: string;
  text: string;
}

const BINS: Bin[] = [
  { id: "blue", label: "Reciclável", emoji: "♻️", bg: "from-blue-500 to-blue-600", border: "border-blue-300", lid: "#1d4ed8", text: "text-blue-100" },
  { id: "brown", label: "Orgânico", emoji: "🌿", bg: "from-amber-600 to-amber-700", border: "border-amber-300", lid: "#92400e", text: "text-amber-100" },
  { id: "gray", label: "Comum", emoji: "🗑️", bg: "from-gray-500 to-gray-600", border: "border-gray-300", lid: "#374151", text: "text-gray-100" },
];

interface Props {
  onComplete: (points: number, message: string) => void;
  totalPoints: number;
  sceneIndex: number;
  totalScenes: number;
}

export default function TrashScene({ onComplete, totalPoints }: Props) {
  const [items] = useState(() => [...TRASH_ITEMS].sort(() => Math.random() - 0.5).slice(0, 6));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; bin: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [throwing, setThrowing] = useState<string | null>(null);
  const [openBin, setOpenBin] = useState<string | null>(null);

  const current: TrashItem | undefined = items[index];
  const progress = index / items.length;

  const handleBinClick = (binId: "blue" | "brown" | "gray") => {
    if (feedback || !current) return;
    const correct = current.bin === binId;
    setOpenBin(binId);
    setThrowing(binId);

    setTimeout(() => {
      setFeedback({ correct, bin: binId });
      if (correct) setScore(s => s + 1);
    }, 400);

    setTimeout(() => {
      setFeedback(null);
      setThrowing(null);
      setOpenBin(null);
      if (index + 1 >= items.length) {
        const pts = Math.round((score + (correct ? 1 : 0)) / items.length * 100);
        setShowSuccess(true);
        setTimeout(() => onComplete(pts, `${score + (correct ? 1 : 0)} de ${items.length} corretos!`), 1800);
      } else {
        setIndex(i => i + 1);
      }
    }, 1300);
  };

  return (
    <div className="relative w-full h-full flex flex-col" style={{ fontFamily: "Outfit, sans-serif", background: "linear-gradient(180deg, #d1fae5 0%, #a7f3d0 40%, #6ee7b7 100%)" }}>

      {/* Sky/park background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grass ground */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 rounded-t-[50%]" style={{ background: "linear-gradient(180deg, #22c55e, #16a34a)" }} />
        {/* Clouds */}
        {[{x:10,y:8},{x:55,y:4},{x:80,y:10}].map((c,i) => (
          <motion.div key={i} className="absolute" style={{ left:`${c.x}%`, top:`${c.y}%` }}
            animate={{ x: [-5, 5, -5] }} transition={{ duration: 8+i*2, repeat: Infinity }}>
            <div className="relative">
              <div className="rounded-full opacity-80" style={{ width:"60px", height:"30px", background:"white", filter:"blur(2px)" }} />
              <div className="absolute -top-3 left-3 rounded-full opacity-80" style={{ width:"40px", height:"30px", background:"white", filter:"blur(2px)" }} />
            </div>
          </motion.div>
        ))}
        {/* Trees */}
        {[5, 88].map((x, i) => (
          <div key={i} className="absolute" style={{ left:`${x}%`, bottom:"30%" }}>
            <div className="rounded-full mx-auto" style={{ width:"clamp(24px,5vw,40px)", height:"clamp(24px,5vw,40px)", background:"linear-gradient(180deg,#16a34a,#15803d)" }} />
            <div className="mx-auto" style={{ width:"clamp(6px,1.5vw,12px)", height:"clamp(12px,2.5vw,20px)", background:"#92400e" }} />
          </div>
        ))}
      </div>

      {/* HUD */}
      <div className="relative z-20 flex items-center justify-between px-3 pt-3 pb-1">
        <div className="bg-white/70 backdrop-blur rounded-2xl px-3 py-1 text-sm font-black text-green-800">
          {index}/{items.length} itens
        </div>
        <div className="bg-white/70 backdrop-blur rounded-2xl h-3 flex-1 mx-3 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.4 }} />
        </div>
        <div className="bg-white/70 backdrop-blur rounded-2xl px-3 py-1 text-sm font-black text-yellow-600">⭐{totalPoints}</div>
      </div>

      {/* Current item */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4">
        <p className="text-green-800 font-bold text-sm mb-3 text-center opacity-80">Para qual lixeira vai esse item?</p>

        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ scale: 0, rotate: -15 }}
              animate={throwing
                ? { scale: 0.3, y: 120, opacity: 0, rotate: 20 }
                : { scale: 1, rotate: 0 }
              }
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="bg-white rounded-[2rem] shadow-xl p-5 flex flex-col items-center gap-2 mb-4 cursor-grab active:cursor-grabbing"
              style={{ minWidth: "clamp(110px,28vw,160px)" }}
            >
              <span style={{ fontSize: "clamp(36px,10vw,64px)" }}>{current.emoji}</span>
              <span className="font-black text-gray-800 text-center" style={{ fontSize: "clamp(13px,3.5vw,18px)" }}>{current.name}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback message */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`px-5 py-2 rounded-2xl font-black text-white text-sm shadow-lg ${feedback.correct ? "bg-green-500" : "bg-red-500"}`}
            >
              {feedback.correct ? "✅ Correto! Parabéns!" : `❌ Errou! Era: ${current ? BINS.find(b => b.id === current.bin)?.label : ""}!`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bins */}
      <div className="relative z-20 flex gap-2 px-3 pb-4 justify-center">
        {BINS.map(bin => (
          <motion.button
            key={bin.id}
            onClick={() => handleBinClick(bin.id)}
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className={`flex-1 max-w-[30%] flex flex-col items-center rounded-[1.5rem] border-2 ${bin.border} overflow-hidden shadow-lg`}
            data-testid={`button-bin-${bin.id}`}
          >
            {/* Bin lid */}
            <motion.div
              className="w-full py-1.5 flex items-center justify-center"
              animate={openBin === bin.id ? { scaleY: 0.3, y: -6 } : { scaleY: 1, y: 0 }}
              style={{ background: bin.lid, originY: 0 }}
            >
              <div className="w-1/4 h-2 rounded-full bg-white/30" />
            </motion.div>
            {/* Bin body */}
            <div className={`w-full flex-1 bg-gradient-to-b ${bin.bg} flex flex-col items-center justify-center py-2 px-1 gap-1`}>
              <span style={{ fontSize: "clamp(18px,5vw,28px)" }}>{bin.emoji}</span>
              <span className={`font-black text-center leading-tight ${bin.text}`} style={{ fontSize: "clamp(9px,2.2vw,13px)" }}>{bin.label}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Success */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.6)" }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
              className="bg-white rounded-[2rem] p-8 text-center shadow-2xl">
              <div className="text-6xl mb-3">🌱♻️</div>
              <h3 className="text-2xl font-black text-green-700 mb-1">Lixo separado!</h3>
              <p className="text-gray-500">{score} de {items.length} corretos</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
