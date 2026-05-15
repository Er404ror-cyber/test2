import { motion, AnimatePresence } from "framer-motion";
import { SceneConfig } from "@/data/game-data";

interface Props {
  scene: SceneConfig;
  sceneIndex: number;
  totalScenes: number;
  totalPoints: number;
  children: React.ReactNode;
}

export default function SceneWrapper({ scene, sceneIndex, totalScenes, totalPoints, children }: Props) {
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden" style={{ fontFamily: "Outfit, sans-serif" }}>
      {/* Top bar */}
      <div className={`bg-gradient-to-r ${scene.bgColor} px-4 py-3 flex items-center gap-3 shadow-lg z-30`}>
        <div className="flex-1">
          <p className="text-white/70 text-xs font-bold uppercase tracking-wider">
            Fase {sceneIndex + 1} de {totalScenes}
          </p>
          <h2 className="text-white font-black text-lg leading-tight">{scene.title}</h2>
        </div>
        <motion.div
          key={totalPoints}
          initial={{ scale: 1.4 }}
          animate={{ scale: 1 }}
          className="bg-white/20 backdrop-blur rounded-2xl px-3 py-1.5"
        >
          <span className="text-yellow-200 font-black text-sm">⭐ {totalPoints}</span>
        </motion.div>
      </div>

      {/* Scene dots progress */}
      <div className={`bg-gradient-to-r ${scene.bgColor} pb-2 flex justify-center gap-2`}>
        {Array.from({ length: totalScenes }).map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={{
              width: i === sceneIndex ? "24px" : "8px",
              height: "8px",
              backgroundColor: i <= sceneIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Scene content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
