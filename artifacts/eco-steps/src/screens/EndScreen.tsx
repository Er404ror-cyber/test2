import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MISSIONS, RECYCLING_QUIZ } from "@/data/game-data";

interface Props {
  playerName: string;
  totalPoints: number;
  correctAnswers: number;
  onRestart: () => void;
}

const MAX_POINTS = MISSIONS.reduce((s, m) => s + m.points, 0) + RECYCLING_QUIZ.length * 30;

function getStars(points: number): number {
  const pct = points / MAX_POINTS;
  if (pct >= 0.9) return 3;
  if (pct >= 0.65) return 2;
  return 1;
}

function getBadge(stars: number): { emoji: string; title: string; message: string } {
  if (stars === 3) return { emoji: "🏆", title: "Campeão Ecológico!", message: "Você é incrível! Conhece tudo sobre o meio ambiente!" };
  if (stars === 2) return { emoji: "🥈", title: "Guardião Verde!", message: "Muito bom! Você já ajuda muito o planeta!" };
  return { emoji: "🌱", title: "Eco Iniciante!", message: "Bom começo! Continue praticando e aprenda mais!" };
}

const CONFETTI_COLORS = ["#22c55e", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10%",
            backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            rotate: Math.random() * 360,
          }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 1.5,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

export default function EndScreen({ playerName, totalPoints, correctAnswers, onRestart }: Props) {
  const [showConfetti, setShowConfetti] = useState(true);
  const stars = getStars(totalPoints);
  const badge = getBadge(stars);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const impactFacts = [
    { emoji: "💧", value: `${(totalPoints * 0.15).toFixed(0)}L`, label: "água economizada" },
    { emoji: "⚡", value: `${(totalPoints * 0.08).toFixed(0)} Wh`, label: "energia poupada" },
    { emoji: "🌳", value: `${correctAnswers}`, label: "desafios corretos" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
        className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 md:p-12 w-full max-w-md text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.4 }}
          className="text-8xl mb-3 inline-block"
        >
          {badge.emoji}
        </motion.div>

        <h2 className="text-4xl font-black text-green-600 mb-1">{badge.title}</h2>
        <p className="text-gray-500 font-bold text-lg mb-5">Parabéns, {playerName}!</p>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <motion.span
              key={s}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: s <= stars ? 1 : 0.7, rotate: 0, opacity: s <= stars ? 1 : 0.25 }}
              transition={{ delay: 0.6 + s * 0.15, type: "spring", bounce: 0.5 }}
              className="text-5xl"
            >
              ⭐
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl p-5 mb-6 shadow-md"
        >
          <p className="text-4xl font-black">{totalPoints} pontos</p>
          <p className="text-white/80 font-semibold text-sm">de {MAX_POINTS} pontos possíveis</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {impactFacts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="bg-green-50 rounded-2xl p-3 flex flex-col items-center"
            >
              <span className="text-2xl mb-1">{fact.emoji}</span>
              <span className="font-black text-green-700 text-lg">{fact.value}</span>
              <span className="text-[10px] text-green-600 font-medium text-center leading-tight">{fact.label}</span>
            </motion.div>
          ))}
        </div>

        <p className="text-gray-500 font-medium text-sm mb-7 px-2 italic">
          "{badge.message}"
        </p>

        <motion.button
          onClick={onRestart}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xl font-black shadow-lg shadow-green-300"
          data-testid="button-restart"
        >
          Jogar de Novo! 🔄
        </motion.button>
      </motion.div>
    </div>
  );
}
