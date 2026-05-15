import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle, Lightbulb, ChevronRight } from "lucide-react";
import { Mission, MISSIONS } from "@/data/game-data";

interface Props {
  playerName: string;
  missionIndex: number;
  totalPoints: number;
  onComplete: (points: number) => void;
}

export default function MissionScreen({ playerName, missionIndex, totalPoints, onComplete }: Props) {
  const [showHint, setShowHint] = useState(false);
  const [done, setDone] = useState(false);
  const mission: Mission = MISSIONS[missionIndex];
  const progress = ((missionIndex) / MISSIONS.length) * 100;

  const handleDone = () => {
    setDone(true);
    setTimeout(() => onComplete(mission.points), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">

      <div className="px-6 pt-6 pb-2">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-gray-500">
            Missão {missionIndex + 1} de {MISSIONS.length}
          </span>
          <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
            <span className="text-yellow-600 font-black">⭐ {totalPoints}</span>
          </div>
        </div>
        <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            initial={{ width: `${progress}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
        <motion.div
          key={mission.id}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="w-full max-w-md"
        >
          <div className={`bg-gradient-to-br ${mission.bgColor} rounded-[2rem] p-8 text-center text-white shadow-xl mb-4`}>
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="text-7xl mb-4 inline-block"
            >
              {mission.emoji}
            </motion.div>
            <h2 className="text-3xl font-black mb-3">{mission.title}</h2>
            <p className="text-white/90 text-lg font-medium leading-snug">{mission.description}</p>
          </div>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-4"
              >
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex gap-3 items-start">
                  <Lightbulb className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-amber-800 font-medium text-sm">{mission.hint}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowHint(!showHint)}
            className="w-full py-3 rounded-2xl border-2 border-green-300 text-green-700 font-bold text-base mb-4 flex items-center justify-center gap-2 bg-white/70"
          >
            <Lightbulb className="w-5 h-5" />
            {showHint ? "Esconder dica" : "Ver dica"}
          </button>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.button
                key="btn-do"
                onClick={handleDone}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-2xl font-black shadow-lg shadow-green-200 flex items-center justify-center gap-3"
                data-testid={`button-complete-mission-${mission.id}`}
              >
                Fiz isso! <ChevronRight className="w-6 h-6" />
              </motion.button>
            ) : (
              <motion.div
                key="btn-done"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-white text-2xl font-black shadow-lg flex items-center justify-center gap-3"
              >
                <CheckCircle className="w-8 h-8" />
                +{mission.points} pontos!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="px-6 pb-6 text-center">
        <p className="text-gray-400 text-sm font-medium">Olá, {playerName}! Continue assim!</p>
      </div>
    </div>
  );
}
