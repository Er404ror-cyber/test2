import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Props {
  onStart: (name: string, lang: Lang) => void;
}

const PARTICLES = [
  { e: "💡", x: 6,  y: 12, d: 4.2 },
  { e: "🌿", x: 14, y: 68, d: 5.0 },
  { e: "♻️", x: 28, y: 22, d: 4.6 },
  { e: "💧", x: 82, y: 78, d: 3.8 },
  { e: "🌍", x: 76, y: 15, d: 5.4 },
  { e: "⚡", x: 88, y: 52, d: 4.0 },
  { e: "🌱", x: 92, y: 28, d: 4.8 },
  { e: "☀️", x: 44, y: 8,  d: 6.0 },
];

// Avatars lúdicos com emojis expressivos para a criança escolher clicando
const AVATAR_OPTIONS = [
  { emoji: "🦊", color: "linear-gradient(135deg, #f97316, #ea580c)", name: "fox" },
  { emoji: "🐼", color: "linear-gradient(135deg, #64748b, #475569)", name: "panda" },
  { emoji: "🐸", color: "linear-gradient(135deg, #22c55e, #16a34a)", name: "frog" },
  { emoji: "🐨", color: "linear-gradient(135deg, #94a3b8, #64748b)", name: "koala" },
  { emoji: "🦁", color: "linear-gradient(135deg, #eab308, #ca8a04)", name: "lion" },
  { emoji: "🦄", color: "linear-gradient(135deg, #a855f7, #9333ea)", name: "unicorn" },
];

export default function StartScreen({ onStart }: Props) {
  const [lang, setLang] = useState<Lang>("pt");
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const t = TRANSLATIONS[lang];

  const canPlay = name.trim().length >= 2;

  const handleStart = () => {
    if (!canPlay) return;
    onStart(name.trim(), lang);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-between relative overflow-hidden px-4 py-6 select-none"
      style={{ fontFamily: "Outfit, sans-serif" }}
    >
      {/* ── Background Mágico e Fluido (Camada de Fundo) ── */}
      <div className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 50% 30%, #134e4a 0%, #0f766e 40%, #064e3b 80%, #022c22 100%)",
        }} />

      {/* Partículas Flutuantes Suaves */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none will-change-transform"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: "clamp(22px, 5vw, 32px)", opacity: 0.25 }}
          animate={{ y: [-15, 15, -15], rotate: [-10, 10, -10] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}>
          {p.e}
        </motion.div>
      ))}

      {/* ── TOPO: Seletor de Idioma Orgânico ── */}
      <header className="w-full max-w-md flex justify-end z-10 pt-safe">
        <div className="bg-black/20 backdrop-blur-md p-1 rounded-full flex gap-1 border border-white/10">
          {(["pt", "en"] as Lang[]).map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full font-black text-xs transition-all duration-300 ${lang === l ? "bg-white text-teal-950 shadow-md scale-100" : "text-white/70 hover:text-white"}`}>
              <span>{l === "pt" ? "🇵🇹" : "🇬🇧"}</span>
              <span>{l === "pt" ? "PT" : "EN"}</span>
            </button>
          ))}
        </div>
      </header>

      {/* ── CENTRO: Título Hero e Missões Educacionais ── */}
      <main className="w-full max-w-md flex flex-col items-center z-10 my-auto gap-4">
        
        {/* Planeta Animado Interativo */}
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, rotate: 15 }}
          className="cursor-pointer drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] will-change-transform"
          style={{ fontSize: "clamp(80px, 20vw, 110px)" }}
        >
          🌍
        </motion.div>

        {/* Bloco de Título */}
        <div className="text-center">
          <h1 className="font-black text-white tracking-tight leading-none mb-1"
            style={{ fontSize: "clamp(42px, 11vw, 62px)", textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
            EcoSteps
          </h1>
          <AnimatePresence mode="wait">
            <motion.p key={lang} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              className="text-emerald-300 font-extrabold tracking-wide uppercase text-xs">
              {t.tagline}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Carrossel Dinâmico de Missões / Aprendizado */}
        <div className="grid grid-cols-3 gap-2.5 w-full mt-2">
          {t.missions.map((m, i) => (
            <motion.div key={`${lang}-${i}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="rounded-2xl flex flex-col items-center justify-between p-3 text-center border relative overflow-hidden backdrop-blur-md transition-all duration-300"
              style={{
                background: ["linear-gradient(to bottom, rgba(99,102,241,0.2), rgba(99,102,241,0.05))", "linear-gradient(to bottom, rgba(16,185,129,0.2), rgba(16,185,129,0.05))", "linear-gradient(to bottom, rgba(14,165,233,0.2), rgba(14,165,233,0.05))"][i],
                borderColor: ["rgba(165,180,252,0.25)", "rgba(110,231,183,0.25)", "rgba(125,211,252,0.25)"][i],
              }}>
              <span className="mb-1.5 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]" style={{ fontSize: "clamp(26px, 6vw, 34px)" }}>{m.icon}</span>
              <div className="flex flex-col gap-0.5">
                <span className="font-black text-white leading-tight block" style={{ fontSize: "clamp(10px, 2.2vw, 13px)" }}>
                  {m.title}
                </span>
                <span className="text-white/50 font-medium leading-tight block" style={{ fontSize: "clamp(8px, 1.8vw, 10px)" }}>
                  {m.desc}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Zona de Identificação Interativa (Gamificada) ── */}
        <div className="w-full bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-5 flex flex-col gap-5 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          
          {/* Escolha do Herói (Avatar) */}
          <div className="flex flex-col gap-2">
            <span className="text-white/80 font-black text-center text-xs tracking-wider uppercase">
              {lang === "pt" ? "Escolha o seu Herói:" : "Choose your Hero:"}
            </span>
            <div className="flex justify-center gap-2 overflow-x-auto py-1 no-scrollbar">
              {AVATAR_OPTIONS.map((av, idx) => (
                <motion.button
                  key={av.name}
                  onClick={() => setSelectedAvatar(idx)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl relative transition-all duration-300 ${selectedAvatar === idx ? "ring-4 ring-emerald-400 scale-110 shadow-lg" : "opacity-50 grayscale-[30%] hover:opacity-90"}`}
                  style={{ background: av.color }}
                >
                  {av.emoji}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input Integrado à Identidade */}
          <div className="flex flex-col gap-1.5 relative">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleStart()}
              placeholder={lang === "pt" ? "Qual é o seu nome, Explorador?" : "What's your name, Explorer?"}
              maxLength={15}
              className="w-full bg-black/20 text-white placeholder-white/30 font-black rounded-2xl px-4 py-3.5 text-center border-2 border-transparent focus:border-emerald-400/50 focus:bg-black/30 focus:outline-none transition-all shadow-inner"
              style={{ fontSize: "clamp(15px, 4vw, 18px)" }}
              data-testid="input-player-name"
            />
            <AnimatePresence>
              {name.trim().length === 1 && (
                <motion.span initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-amber-300 font-bold text-[11px] text-center mt-1 block">
                  {lang === "pt" ? "Insira mais uma letra! 😉" : "Type one more letter! 😉"}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Botão de Jogar / Iniciar Jornada */}
          <motion.button
            onClick={handleStart}
            disabled={!canPlay}
            whileTap={canPlay ? { scale: 0.96 } : {}}
            whileHover={canPlay ? { scale: 1.02, y: -2 } : {}}
            animate={canPlay ? { boxShadow: ["0 0 0 0 rgba(16,185,129,0.4)", "0 0 0 16px rgba(16,185,129,0)", "0 0 0 0 rgba(16,185,129,0)"] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full rounded-2xl font-black text-white uppercase tracking-wider transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
            style={{
              padding: "clamp(15px, 4vw, 20px)",
              fontSize: "clamp(16px, 4.2vw, 20px)",
              background: canPlay
                ? "linear-gradient(135deg, #4ade80 0%, #10b981 50%, #06b6d4 100%)"
                : "rgba(255,255,255,0.08)",
              borderBottom: canPlay ? "4px solid #047857" : "1px solid rgba(255,255,255,0.1)",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }}
            data-testid="button-start-game"
          >
            {canPlay 
              ? (lang === "pt" ? "🚀 Começar Aventura!" : "🚀 Start Adventure!") 
              : t.playBtn
            }
          </motion.button>
        </div>
      </main>

      {/* ── RODAPÉ: Frase de Impacto Fluida ── */}
      <footer className="w-full max-w-md text-center z-10 pb-safe">
        <AnimatePresence mode="wait">
          <motion.p key={`q-${lang}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-white/40 font-medium px-4 tracking-wide"
            style={{ fontSize: "clamp(10px, 2.2vw, 13px)" }}>
            🌿 {t.quote}
          </motion.p>
        </AnimatePresence>
      </footer>
    </div>
  );
}