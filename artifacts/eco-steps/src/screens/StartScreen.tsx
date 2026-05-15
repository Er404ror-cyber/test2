import { motion } from "framer-motion";
import { useState } from "react";
import { SCENES } from "@/data/game-data";

interface Props {
  onStart: (name: string) => void;
}

const SCENE_PREVIEWS = [
  { emoji: "💡", label: "Apague luzes", color: "bg-indigo-100 text-indigo-700" },
  { emoji: "♻️", label: "Separe o lixo", color: "bg-green-100 text-green-700" },
  { emoji: "💧", label: "Feche torneiras", color: "bg-blue-100 text-blue-700" },
];

export default function StartScreen({ onStart }: Props) {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim().length < 2) return;
    onStart(name.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #22c55e 0%, #10b981 40%, #0ea5e9 100%)" }}>

      {/* Floating background shapes */}
      {["💡","💧","♻️","🌱","🌍","⚡"].map((e, i) => (
        <motion.div key={i}
          className="absolute text-4xl opacity-10 pointer-events-none select-none"
          style={{ left: `${10 + i * 15}%`, top: `${5 + (i % 3) * 28}%` }}
          animate={{ y: [-12, 12, -12], rotate: [-8, 8, -8] }}
          transition={{ duration: 3 + i * 0.6, repeat: Infinity, delay: i * 0.4 }}>
          {e}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", bounce: 0.4, duration: 0.7 }}
        className="bg-white rounded-[2.5rem] shadow-2xl p-7 w-full max-w-sm text-center"
      >
        <motion.div
          animate={{ rotate: [0, -8, 8, -8, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
          className="text-7xl mb-3 inline-block"
        >
          🌍
        </motion.div>

        <h1 className="text-5xl font-black text-green-600 mb-1">EcoSteps</h1>
        <p className="text-gray-400 font-semibold text-base mb-6">
          Salve o planeta num jogo!
        </p>

        {/* Scene previews */}
        <div className="flex gap-2 mb-6">
          {SCENE_PREVIEWS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`flex-1 ${s.color} rounded-2xl p-3 flex flex-col items-center gap-1`}
            >
              <span className="text-2xl">{s.emoji}</span>
              <span className="text-[11px] font-black leading-tight text-center">{s.label}</span>
            </motion.div>
          ))}
        </div>

        <label className="block text-left text-sm font-black text-gray-500 mb-2 ml-1">
          Qual é o seu nome?
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleStart()}
          placeholder="Digite aqui..."
          maxLength={20}
          autoFocus
          className="w-full px-5 py-4 rounded-2xl border-2 border-green-200 focus:border-green-400 focus:outline-none text-xl font-black text-gray-700 bg-white text-center mb-5 transition-colors"
          data-testid="input-player-name"
        />

        <motion.button
          onClick={handleStart}
          disabled={name.trim().length < 2}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03, y: -2 }}
          className="w-full py-5 rounded-2xl text-white text-2xl font-black shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          style={{ background: "linear-gradient(135deg, #22c55e, #10b981, #0ea5e9)", boxShadow: "0 8px 24px rgba(34,197,94,0.35)" }}
          data-testid="button-start-game"
        >
          Jogar Agora! 🚀
        </motion.button>

        <p className="text-xs text-gray-300 mt-4 font-medium italic">
          "Pequenas ações diárias podem salvar o planeta."
        </p>
      </motion.div>
    </div>
  );
}
