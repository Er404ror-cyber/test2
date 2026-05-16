import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Props {
  onStart: (name: string, lang: Lang) => void;
}

const PARTICLES = [
  { e: "💡", x: 6,  y: 8,  d: 3.2 },
  { e: "🌿", x: 18, y: 72, d: 4.0 },
  { e: "♻️", x: 30, y: 15, d: 3.6 },
  { e: "💧", x: 55, y: 78, d: 2.8 },
  { e: "🌍", x: 72, y: 10, d: 4.4 },
  { e: "⚡", x: 85, y: 68, d: 3.0 },
  { e: "🌱", x: 92, y: 30, d: 3.8 },
  { e: "☀️", x: 44, y: 5,  d: 5.0 },
];

const AVATAR_COLORS = [
  "#7c3aed","#0284c7","#059669","#d97706","#dc2626","#0891b2","#65a30d","#9333ea",
];

export default function StartScreen({ onStart }: Props) {
  const [lang, setLang]   = useState<Lang>("pt");
  const [name, setName]   = useState("");
  const t = TRANSLATIONS[lang];

  const avatarColor = name.length > 0
    ? AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
    : "#94a3b8";

  const canPlay = name.trim().length >= 2;

  const handleStart = () => {
    if (!canPlay) return;
    onStart(name.trim(), lang);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ fontFamily: "Outfit, sans-serif" }}
    >
      {/* ── Animated gradient background ── */}
      <div className="absolute inset-0"
        style={{
          background: "linear-gradient(145deg, #064e3b 0%, #065f46 20%, #0f766e 45%, #0369a1 75%, #1d4ed8 100%)",
        }} />

      {/* Subtle light rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[15, 45, 75].map((x, i) => (
          <div key={i} className="absolute top-0 bottom-0 opacity-5"
            style={{
              left: `${x}%`,
              width: "clamp(60px,15vw,120px)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)",
              transform: "skewX(-12deg)",
            }} />
        ))}
      </div>

      {/* ── Floating eco particles ── */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none select-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: "clamp(18px,3.5vw,28px)", opacity: 0.18 }}
          animate={{ y: [-10, 10, -10], rotate: [-6, 6, -6] }}
          transition={{ duration: p.d, repeat: Infinity, delay: i * 0.55 }}>
          {p.e}
        </motion.div>
      ))}

      {/* ── Language selector (top-right) ── */}
      <div className="absolute top-4 right-4 z-20 flex gap-1.5">
        {(["pt", "en"] as Lang[]).map(l => (
          <button key={l} onClick={() => setLang(l)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black text-xs transition-all duration-200 ${lang === l ? "bg-white text-green-800 shadow-lg scale-105" : "bg-white/20 text-white hover:bg-white/35"}`}>
            <span style={{ fontSize: 16 }}>{l === "pt" ? "🇵🇹" : "🇬🇧"}</span>
            <span>{l === "pt" ? "PT" : "EN"}</span>
          </button>
        ))}
      </div>

      {/* ── Main card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", bounce: 0.35, duration: 0.65 }}
        className="relative z-10 w-full mx-4 flex flex-col items-center"
        style={{ maxWidth: 420 }}
      >

        {/* Globe */}
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-2"
          style={{ fontSize: "clamp(64px,16vw,96px)", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))" }}
        >
          🌍
        </motion.div>

        {/* Title */}
        <h1 className="font-black text-white mb-0.5"
          style={{ fontSize: "clamp(38px,10vw,58px)", textShadow: "0 2px 16px rgba(0,0,0,0.4)", letterSpacing: "-1px" }}>
          EcoSteps
        </h1>
        <AnimatePresence mode="wait">
          <motion.p key={lang} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            className="text-green-200 font-semibold mb-5 text-center px-4"
            style={{ fontSize: "clamp(13px,3vw,17px)" }}>
            {t.tagline}
          </motion.p>
        </AnimatePresence>

        {/* Mission cards */}
        <div className="flex gap-2 w-full mb-5 px-1">
          {t.missions.map((m, i) => (
            <motion.div key={`${lang}-${i}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.09 }}
              className="flex-1 rounded-2xl flex flex-col items-center gap-1 py-3 px-1"
              style={{
                background: ["rgba(99,102,241,0.28)","rgba(16,185,129,0.28)","rgba(14,165,233,0.28)"][i],
                border: `1.5px solid ${["rgba(165,180,252,0.35)","rgba(110,231,183,0.35)","rgba(125,211,252,0.35)"][i]}`,
                backdropFilter: "blur(8px)",
              }}>
              <span style={{ fontSize: "clamp(22px,5.5vw,30px)" }}>{m.icon}</span>
              <span className="font-black text-white text-center leading-tight" style={{ fontSize: "clamp(9px,2vw,12px)" }}>
                {m.title}
              </span>
              <span className="text-white/60 text-center leading-tight" style={{ fontSize: "clamp(7px,1.6vw,10px)" }}>
                {m.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* White input card */}
        <div className="w-full bg-white/12 backdrop-blur-md rounded-[2rem] p-5 flex flex-col gap-4"
          style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}>

          {/* Name input row */}
          <div className="flex items-center gap-3">
            {/* Avatar circle */}
            <motion.div
              key={avatarColor}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex-shrink-0 rounded-full flex items-center justify-center font-black text-white shadow-lg"
              style={{
                width: "clamp(44px,11vw,58px)",
                height: "clamp(44px,11vw,58px)",
                background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}99)`,
                fontSize: "clamp(18px,4.5vw,26px)",
              }}>
              {name.trim().length >= 1 ? name.trim()[0].toUpperCase() : "?"}
            </motion.div>

            <div className="flex-1 flex flex-col gap-1">
              <label className="text-white/75 font-bold" style={{ fontSize: "clamp(10px,2.2vw,13px)" }}>
                {t.nameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleStart()}
                placeholder={t.namePlaceholder}
                maxLength={20}
                autoFocus
                className="bg-white/20 text-white placeholder-white/40 font-black rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                style={{ fontSize: "clamp(14px,3.5vw,18px)" }}
                data-testid="input-player-name"
              />
            </div>
          </div>

          {/* Play button */}
          <motion.button
            onClick={handleStart}
            disabled={!canPlay}
            whileTap={canPlay ? { scale: 0.95 } : {}}
            whileHover={canPlay ? { scale: 1.03, y: -2 } : {}}
            animate={canPlay ? { boxShadow: ["0 0 0 0 rgba(255,255,255,0.3)","0 0 0 12px rgba(255,255,255,0)","0 0 0 0 rgba(255,255,255,0)"] } : {}}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-full rounded-2xl font-black text-white transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed"
            style={{
              padding: "clamp(14px,3.5vw,20px)",
              fontSize: "clamp(16px,4vw,22px)",
              background: canPlay
                ? "linear-gradient(135deg, #22c55e 0%, #10b981 50%, #0ea5e9 100%)"
                : "rgba(255,255,255,0.15)",
              boxShadow: canPlay ? "0 8px 32px rgba(34,197,94,0.4), inset 0 1px 0 rgba(255,255,255,0.3)" : "none",
            }}
            data-testid="button-start-game"
          >
            {t.playBtn}
          </motion.button>
        </div>

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.p key={`q-${lang}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-white/40 italic text-center mt-4 px-6"
            style={{ fontSize: "clamp(9px,2vw,12px)" }}>
            {t.quote}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
