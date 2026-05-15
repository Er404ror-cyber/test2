import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SCENES } from "@/data/game-data";

interface Props {
  playerName: string;
  totalPoints: number;
  maxPoints: number;
  onRestart: () => void;
}

function getStars(pts: number, max: number): number {
  const pct = pts / max;
  if (pct >= 0.85) return 3;
  if (pct >= 0.55) return 2;
  return 1;
}

function getBadge(stars: number) {
  if (stars === 3) return { emoji: "🏆", title: "Campeão Ecológico!", sub: "Você protegeu o planeta com maestria!", color: "text-yellow-600" };
  if (stars === 2) return { emoji: "🥈", title: "Guardião Verde!", sub: "Ótimo trabalho! Continue praticando!", color: "text-emerald-600" };
  return { emoji: "🌱", title: "Eco Iniciante!", sub: "Bom começo! Você já está ajudando!", color: "text-green-600" };
}

const CONFETTI = Array.from({ length: 40 }, (_, i) => ({
  color: ["#22c55e", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#f97316"][i % 7],
  x: Math.random() * 100,
  delay: Math.random() * 1.5,
  size: 6 + Math.random() * 8,
  duration: 2 + Math.random() * 2,
}));

export default function EndScreen({ playerName, totalPoints, maxPoints, onRestart }: Props) {
  const [confettiActive, setConfettiActive] = useState(true);
  const stars = getStars(totalPoints, maxPoints);
  const badge = getBadge(stars);

  useEffect(() => {
    const t = setTimeout(() => setConfettiActive(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const impacts = [
    { emoji: "💧", value: `${totalPoints * 2}L`, label: "água poupada" },
    { emoji: "⚡", value: `${Math.round(totalPoints * 0.5)}Wh`, label: "energia salva" },
    { emoji: "🌿", value: `${Math.round(totalPoints / 80)}`, label: "missões" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #22c55e 0%, #10b981 50%, #0d9488 100%)" }}>

      {/* Confetti */}
      {confettiActive && CONFETTI.map((c, i) => (
        <motion.div key={i}
          className="absolute rounded-sm pointer-events-none"
          style={{ left: `${c.x}%`, top: "-4%", width: c.size, height: c.size, backgroundColor: c.color, rotate: Math.random() * 360 }}
          animate={{ y: ["0vh", "110vh"], rotate: [0, 720 * (Math.random() > 0.5 ? 1 : -1)], opacity: [1, 1, 0] }}
          transition={{ duration: c.duration, delay: c.delay, ease: "easeIn" }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", bounce: 0.4, delay: 0.15 }}
        className="bg-white rounded-[2.5rem] shadow-2xl p-7 w-full max-w-sm text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.55, delay: 0.4 }}
          className="text-7xl mb-2 inline-block"
        >
          {badge.emoji}
        </motion.div>

        <h2 className={`text-3xl font-black mb-1 ${badge.color}`}>{badge.title}</h2>
        <p className="text-gray-500 font-semibold text-base mb-5">
          Parabéns, <span className="text-green-600 font-black">{playerName}</span>!
        </p>

        {/* Stars */}
        <div className="flex justify-center gap-3 mb-5">
          {[1, 2, 3].map(s => (
            <motion.span key={s}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: s <= stars ? 1 : 0.65, rotate: 0, opacity: s <= stars ? 1 : 0.2 }}
              transition={{ delay: 0.55 + s * 0.12, type: "spring", bounce: 0.55 }}
              className="text-5xl"
            >⭐</motion.span>
          ))}
        </div>

        {/* Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="rounded-2xl py-4 px-5 mb-5 shadow-inner"
          style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)" }}
        >
          <p className="text-white text-4xl font-black">{totalPoints} pontos</p>
          <p className="text-white/70 text-sm font-semibold">de {maxPoints} pontos possíveis</p>
        </motion.div>

        {/* Impact grid */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {impacts.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.1 }}
              className="bg-green-50 rounded-2xl p-3 flex flex-col items-center"
            >
              <span className="text-2xl mb-1">{item.emoji}</span>
              <span className="font-black text-green-700 text-base">{item.value}</span>
              <span className="text-[10px] text-green-500 font-bold text-center leading-tight">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <p className="text-gray-400 text-sm italic mb-6 px-2">"{badge.sub}"</p>

        <motion.button
          onClick={onRestart}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03, y: -2 }}
          className="w-full py-5 rounded-2xl text-white text-xl font-black shadow-xl"
          style={{ background: "linear-gradient(135deg, #22c55e, #10b981)", boxShadow: "0 8px 24px rgba(34,197,94,0.3)" }}
          data-testid="button-restart"
        >
          Jogar de Novo! 🔄
        </motion.button>
      </motion.div>
    </div>
  );
}
