import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Props {
  onStart: (name: string, lang: Lang) => void;
}

const AVATAR_OPTIONS = [
  { emoji: "🦊", color: "linear-gradient(135deg, #f97316, #ea580c)" },
  { emoji: "🐼", color: "linear-gradient(135deg, #64748b, #475569)" },
  { emoji: "🐸", color: "linear-gradient(135deg, #22c55e, #16a34a)" },
  { emoji: "🐨", color: "linear-gradient(135deg, #94a3b8, #64748b)" },
  { emoji: "🦁", color: "linear-gradient(135deg, #eab308, #ca8a04)" },
  { emoji: "🦄", color: "linear-gradient(135deg, #a855f7, #9333ea)" },
];

export default function StartScreen({ onStart }: Props) {
  const [lang, setLang] = useState<Lang>("pt");
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const t = TRANSLATIONS[lang];

  const playSectionRef = useRef<HTMLDivElement>(null);
  const canPlay = name.trim().length >= 2;

  const handleStart = () => {
    if (!canPlay) return;
    onStart(name.trim(), lang);
  };

  const scrollToPlay = () => {
    playSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-y-auto overflow-x-hidden bg-slate-900 selection:bg-emerald-500/30"
      style={{ fontFamily: "Outfit, sans-serif" }}
    >
      {/* ── Fundo Dinâmico com Degradê Suave ── */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-teal-950 via-emerald-950 to-slate-950" />

      {/* Seletor de Idioma Fixo no Topo */}
      <div className="fixed top-4 right-4 z-50 bg-slate-900/60 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-lg">
        {(["pt", "en"] as Lang[]).map(l => (
          <button key={l} onClick={() => setLang(l)}
            className={`px-3 py-1 rounded-full font-black text-xs transition-all duration-300 ${lang === l ? "bg-emerald-500 text-slate-950 scale-100" : "text-white/70 hover:text-white"}`}>
            <span>{l === "pt" ? "🇵🇹 PT" : "🇬🇧 EN"}</span>
          </button>
        ))}
      </div>

      {/* Conteúdo da Jornada */}
      <div className="relative z-10 max-w-md mx-auto px-4 pt-16 pb-24 flex flex-col items-center">
        
        {/* ── INTRODUÇÃO / PASSO 0 ── */}
        <header className="text-center mb-12">
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl mb-4 filter drop-shadow-[0_10px_20px_rgba(16,185,129,0.3)]"
          >
            🌍
          </motion.div>
          <h1 className="font-black text-white tracking-tight text-5xl mb-2 drop-shadow-md">
            EcoSteps
          </h1>
          <p className="text-emerald-300 font-extrabold text-sm uppercase tracking-wider px-4">
            {t.tagline}
          </p>
          
          <motion.button 
            onClick={scrollToPlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-white/10 hover:bg-white/15 text-white/90 font-bold text-xs px-4 py-2.5 rounded-full border border-white/10 transition-all flex items-center gap-2 mx-auto"
          >
            <span>{lang === "pt" ? "Pular Exploração" : "Skip Exploration"}</span>
            <span className="text-[10px]">👇</span>
          </motion.button>
        </header>

        {/* Linha Conectora Pontilhada Visual */}
        <div className="w-0.5 h-10 border-l-2 border-dashed border-emerald-500/30 mb-6" />

        {/* ── SECCÃO 1: APRENDER (As Missões como Cards de Conhecimento) ── */}
        <section className="w-full flex flex-col gap-8 items-center mb-16">
          <div className="text-center bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-2 mb-2">
            <span className="text-emerald-400 font-black text-xs uppercase tracking-widest">
              {lang === "pt" ? "Passo 1: Aprender a Missão 🧠" : "Step 1: Learn the Mission 🧠"}
            </span>
          </div>

          {t.missions.map((m, i) => (
            <div key={`${lang}-${i}`} className="w-full flex flex-col items-center relative">
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", bounce: 0.2 }}
                className="w-full bg-slate-800/80 border border-slate-700 backdrop-blur-md rounded-3xl p-5 flex items-start gap-4 shadow-xl hover:border-emerald-500/30 transition-colors"
              >
                <div className="w-14 h-14 bg-slate-700/50 rounded-2xl flex items-center justify-center text-3xl shrink-0 border border-slate-600/50 shadow-inner">
                  {m.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-black text-white text-base leading-snug">
                    {m.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
              
              {/* Linha conectora entre os cards */}
              {i < t.missions.length - 1 && (
                <div className="w-0.5 h-8 border-l-2 border-dashed border-emerald-500/20 my-2" />
              )}
            </div>
          ))}
        </section>

        {/* Linha Conectora Pontilhada Principal */}
        <div className="w-0.5 h-14 border-l-2 border-dashed border-emerald-400/40 mb-6 animate-pulse" />

        {/* ── SECÇÃO 2: JOGAR (Zona de Identificação Lá em Baixo) ── */}
        <section 
          ref={playSectionRef}
          className="w-full bg-gradient-to-b from-slate-800 to-slate-950 rounded-[2.5rem] p-6 flex flex-col gap-6 border-2 border-emerald-500/30 shadow-[0_20px_50px_rgba(16,185,129,0.15)] relative scroll-mt-24"
        >
          {/* Badge de Conclusão do Aprendizado */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
            {lang === "pt" ? "✅ Aprendizado Concluído!" : "✅ Learning Complete!"}
          </div>

          <div className="text-center mt-2">
            <h2 className="text-white font-black text-xl">
              {lang === "pt" ? "Pronto para o Jogo?" : "Ready to Play?"}
            </h2>
            <p className="text-slate-400 text-xs font-semibold mt-0.5">
              {lang === "pt" ? "Cria o teu perfil para começar a aventura" : "Create your profile to start the adventure"}
            </p>
          </div>

          {/* Escolha do Avatar */}
          <div className="flex flex-col gap-2.5">
            <label className="text-slate-300 font-extrabold text-xs text-center uppercase tracking-wider">
              {lang === "pt" ? "Escolhe o teu herói:" : "Choose your hero:"}
            </label>
            <div className="flex justify-center gap-2 py-1 overflow-x-auto no-scrollbar">
              {AVATAR_OPTIONS.map((av, idx) => (
                <motion.button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedAvatar(idx)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${selectedAvatar === idx ? "ring-4 ring-emerald-400 scale-110 shadow-lg" : "opacity-40 grayscale-[20%] hover:opacity-80"}`}
                  style={{ background: av.color }}
                >
                  {av.emoji}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Nome do Jogador */}
          <div className="flex flex-col gap-1.5">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleStart()}
              placeholder={lang === "pt" ? "O teu nome de Explorador..." : "Your Explorer name..."}
              maxLength={15}
              className="w-full bg-slate-900/80 text-white placeholder-slate-600 font-black rounded-2xl px-4 py-3.5 text-center border border-slate-700 focus:border-emerald-500 focus:outline-none transition-all shadow-inner text-base"
              data-testid="input-player-name"
            />
            <AnimatePresence>
              {name.trim().length === 1 && (
                <motion.span initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-amber-400 font-bold text-[11px] text-center block">
                  {lang === "pt" ? "Escreve mais um bocadinho! 😉" : "Type a bit more! 😉"}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Botão de Start de Aventura */}
          <motion.button
            onClick={handleStart}
            disabled={!canPlay}
            whileTap={canPlay ? { scale: 0.96 } : {}}
            whileHover={canPlay ? { scale: 1.02 } : {}}
            className="w-full rounded-2xl font-black text-white uppercase tracking-wider transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed py-4 text-lg border-b-4 border-emerald-700 shadow-lg cursor-pointer"
            style={{
              background: canPlay
                ? "linear-gradient(135deg, #4ade80 0%, #10b981 50%, #06b6d4 100%)"
                : "rgba(255,255,255,0.05)",
            }}
            data-testid="button-start-game"
          >
            {canPlay 
              ? (lang === "pt" ? "🚀 Entrar no Jogo!" : "🚀 Enter Game!") 
              : (lang === "pt" ? "Bloqueado 🔒" : "Locked 🔒")
            }
          </motion.button>
        </section>

        {/* Citação Inspiracional de Rodapé */}
        <footer className="text-center mt-12 text-slate-500 font-medium text-xs max-w-xs px-4">
          🍃 {t.quote}
        </footer>
      </div>
    </div>
  );
}