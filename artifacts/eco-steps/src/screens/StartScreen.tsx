import { motion } from "framer-motion";
import { useState } from "react";
import { Leaf, Star, Recycle, Droplets } from "lucide-react";

interface Props {
  onStart: (name: string) => void;
}

const floatingIcons = [
  { icon: Leaf, x: "10%", y: "15%", delay: 0, color: "text-green-400" },
  { icon: Recycle, x: "85%", y: "10%", delay: 0.3, color: "text-teal-400" },
  { icon: Droplets, x: "5%", y: "70%", delay: 0.6, color: "text-blue-400" },
  { icon: Star, x: "88%", y: "75%", delay: 0.9, color: "text-yellow-400" },
  { icon: Leaf, x: "50%", y: "5%", delay: 1.2, color: "text-emerald-400" },
];

export default function StartScreen({ onStart }: Props) {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim().length < 2) return;
    onStart(name.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 flex items-center justify-center p-6 relative overflow-hidden">

      {floatingIcons.map(({ icon: Icon, x, y, delay, color }, i) => (
        <motion.div
          key={i}
          className={`absolute ${color} opacity-30 pointer-events-none`}
          style={{ left: x, top: y }}
          animate={{ y: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay }}
        >
          <Icon className="w-10 h-10 md:w-16 md:h-16" />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 md:p-12 w-full max-w-md text-center"
      >
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-7xl mb-4 inline-block"
        >
          🌍
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-black text-green-600 mb-2">EcoSteps</h1>
        <p className="text-gray-500 text-lg mb-8 font-medium">
          Pequenas ações salvam o planeta!
        </p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { emoji: "🎯", label: "6 Missões" },
            { emoji: "❓", label: "5 Quiz" },
            { emoji: "🏆", label: "Medalhas" },
          ].map((item) => (
            <div key={item.label} className="bg-green-50 rounded-2xl p-3 flex flex-col items-center gap-1">
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xs font-bold text-green-700">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-left text-sm font-bold text-gray-600 mb-2 ml-1">
            Qual é o seu nome?
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
            placeholder="Digite seu nome..."
            maxLength={20}
            className="w-full px-5 py-4 rounded-2xl border-2 border-green-200 focus:border-green-400 focus:outline-none text-xl font-bold text-gray-700 bg-white text-center"
            data-testid="input-player-name"
            autoFocus
          />
        </div>

        <motion.button
          onClick={handleStart}
          disabled={name.trim().length < 2}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-2xl font-black shadow-lg shadow-green-300 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          data-testid="button-start-game"
        >
          Jogar! 🚀
        </motion.button>

        <p className="text-xs text-gray-400 mt-4 font-medium">
          "Pequenas ações diárias podem salvar o planeta."
        </p>
      </motion.div>
    </div>
  );
}
