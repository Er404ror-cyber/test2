import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Props {
  onStart: (name: string, lang: Lang) => void;
}

const PARTICLES = [
  { e: "💡", x: 4,  y: 8,  d: 3.2 },
  { e: "🌿", x: 12, y: 72, d: 4.0 },
  { e: "♻️", x: 25, y: 15, d: 3.6 },
  { e: "💧", x: 45, y: 82, d: 2.8 },
  { e: "🌍", x: 68, y: 10, d: 4.4 },
  { e: "⚡", x: 88, y: 68, d: 3.0 },
  { e: "🌱", x: 94, y: 25, d: 3.8 },
  { e: "☀️", x: 52, y: 5,  d: 5.0 },
];

// Dados e Casos Reais de Moçambique (Contexto 2026)
const MOZ_CONTEXT_2026 = {
  pt: [
    {
      icon: "🇲🇿",
      title: "Energia Limpa em Expansão",
      desc: "A central solar de Metoro em Cabo Delgado e os novos projetos de mini-redes fotovoltaicas estão a acelerar o acesso à energia sustentável nas zonas rurais em 2026."
    },
    {
      icon: "🌳",
      title: "Restauração dos Mangais",
      desc: "Iniciativas comunitárias na Beira e em Maputo utilizam a reflorestação de mangais como uma barreira natural crucial contra ciclones e erosão costeira."
    },
    {
      icon: "💧",
      title: "Gestão da Água e Clima",
      desc: "O reaproveitamento e conservação da água tornaram-se prioridade máxima nas bacias hidrográficas do sul para mitigar os efeitos das mudanças climáticas severas."
    }
  ],
  en: [
    {
      icon: "🇲🇿",
      title: "Clean Energy Expansion",
      desc: "The Metoro solar plant in Cabo Delgado and new photovoltaic mini-grids are accelerating sustainable energy access in rural areas by 2026."
    },
    {
      icon: "🌳",
      title: "Mangrove Restoration",
      desc: "Community initiatives in Beira and Maputo use mangrove reforestation as a crucial natural shield against cyclones and coastal erosion."
    },
    {
      icon: "💧",
      title: "Water & Climate Management",
      desc: "Water recycling and conservation have become top priorities in southern river basins to mitigate severe climate change impacts."
    }
  ]
};

export default function StartScreen({ onStart }: Props) {
  const [lang, setLang] = useState<Lang>("pt");
  const [name, setName] = useState("");
  const t = TRANSLATIONS[lang];

  const canPlay = name.trim().length >= 2;

  const handleStart = () => {
    if (!canPlay) return;
    onStart(name.trim(), lang);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col relative overflow-y-auto overflow-x-hidden p-4 md:p-8 select-none justify-between"
      style={{ fontFamily: "Outfit, sans-serif" }}
    >
      {/* ── SEU BACKGROUND ORIGINAL ── */}
      <div className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(145deg, #064e3b 0%, #065f46 20%, #0f766e 45%, #0369a1 75%, #1d4ed8 100%)",
        }} />

      {/* Raios de luz originais */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
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

      {/* Partículas flutuantes originais */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none select-none z-0"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: "clamp(20px,3.5vw,30px)", opacity: 0.18 }}
          animate={{ y: [-10, 10, -10], rotate: [-6, 6, -6] }}
          transition={{ duration: p.d, repeat: Infinity, delay: i * 0.55 }}>
          {p.e}
        </motion.div>
      ))}

      {/* ── TOPO: Título Principal e Seletor de Idioma ── */}
      <header className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center z-10 gap-4 mb-6 md:mb-10 pt-safe">
        <div className="text-center sm:text-left">
          <h1 className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
            EcoSteps
          </h1>
          <AnimatePresence mode="wait">
            <motion.p key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-emerald-300 font-bold text-xs md:text-sm uppercase tracking-wider mt-1">
              {t.tagline}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Seletor de Idioma */}
        <div className="bg-white/10 backdrop-blur-md p-1 rounded-full flex gap-1 border border-white/20 shadow-md">
          {(["pt", "en"] as Lang[]).map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-black text-xs transition-all duration-200 ${lang === l ? "bg-white text-emerald-900 shadow-lg" : "text-white/80 hover:bg-white/10"}`}>
              <span>{l === "pt" ? "🇵🇹 PT" : "🇬🇧 EN"}</span>
            </button>
          ))}
        </div>
      </header>

      {/* ── CORPO PRINCIPAL LADO A LADO (PC) / VERTICAL (TELEMÓVEL) ── */}
      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 my-auto z-10 items-start">
        
        {/* COLUNA DA ESQUERDA (Explicação Visual Base) */}
        <section className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 md:p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl animate-bounce">📢</span>
              <h2 className="text-white font-black text-xl md:text-2xl tracking-tight">
                {lang === "pt" ? "Porquê o EcoSteps é importante?" : "Why EcoSteps matters?"}
              </h2>
            </div>
            <p className="text-white/80 text-sm leading-relaxed font-medium">
              {lang === "pt" 
                ? "Cada pequena decisão nossa conta para proteger o ecossistema. Vamos analisar os três pilares que sustentam a nossa simulação interativa:"
                : "Every single choice counts toward protecting our ecosystem. Let's analyze the three pillars supporting our interactive simulation:"}
            </p>
          </div>

          {/* Grid dos Pilares com Ícones Grandes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.missions.map((m, i) => (
              <div key={`${lang}-${i}`}
                className="rounded-2xl p-5 flex flex-col justify-between items-center text-center backdrop-blur-md border border-white/10 min-h-[160px] md:min-h-[180px] shadow-lg"
                style={{
                  background: ["rgba(99,102,241,0.22)", "rgba(16,185,129,0.22)", "rgba(14,165,233,0.22)"][i],
                  borderColor: ["rgba(165,180,252,0.3)", "rgba(110,231,183,0.3)", "rgba(125,211,252,0.3)"][i],
                }}>
                <span className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] mb-2" style={{ fontSize: "clamp(38px, 8vw, 46px)" }}>
                  {m.icon}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-black text-white text-sm md:text-base tracking-tight leading-tight block">
                    {m.title}
                  </span>
                  <span className="text-white/60 text-[11px] md:text-xs leading-snug font-medium block">
                    {m.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COLUNA DA DIREITA (Zona do Jogador - Prática) */}
        <section className="lg:col-span-5 xl:col-span-4 w-full">
          <div className="w-full bg-white/12 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col gap-5 border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            
            <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-black text-[10px] tracking-widest uppercase rounded-full px-3 py-1 w-max mx-auto">
              {lang === "pt" ? "Demonstração em Tempo Real" : "Real-Time Demonstration"}
            </div>

            <div className="text-center">
              <h3 className="text-white font-black text-xl tracking-tight">
                {lang === "pt" ? "Espaço do Jogador" : "Player Space"}
              </h3>
              <p className="text-white/60 text-xs font-semibold mt-0.5">
                {lang === "pt" ? "Quem vai jogar insere o nome abaixo" : "Whoever is going to play enters their name below"}
              </p>
            </div>

            {/* Input para o Jogador Prático */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white/75 font-bold text-xs pl-1">
                {lang === "pt" ? "Nome do Jogador:" : "Player Name:"}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleStart()}
                placeholder={lang === "pt" ? "Ex: Nome do colega ou turma..." : "e.g., Classmate or class name..."}
                maxLength={20}
                className="w-full bg-black/20 text-white placeholder-white/30 font-black rounded-2xl px-4 py-3.5 text-center border-2 border-white/10 focus:border-emerald-400 focus:outline-none transition-all shadow-inner text-base"
                data-testid="input-player-name"
              />
            </div>

            {/* Botão de Entrada direta na prática */}
            <motion.button
              onClick={handleStart}
              disabled={!canPlay}
              whileTap={canPlay ? { scale: 0.97 } : {}}
              whileHover={canPlay ? { scale: 1.02 } : {}}
              className="w-full rounded-2xl font-black text-white uppercase tracking-wider transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed py-4 text-base shadow-lg cursor-pointer"
              style={{
                background: canPlay
                  ? "linear-gradient(135deg, #22c55e 0%, #10b981 50%, #0ea5e9 100%)"
                  : "rgba(255,255,255,0.08)",
                boxShadow: canPlay ? "0 8px 24px rgba(34,197,94,0.35), inset 0 1px 0 rgba(255,255,255,0.2)" : "none",
              }}
              data-testid="button-start-game"
            >
              {canPlay 
                ? (lang === "pt" ? "🎮 Iniciar Prática ➔" : "🎮 Start Practice ➔") 
                : (lang === "pt" ? "Aguardando Jogador..." : "Waiting for Player...")
              }
            </motion.button>
          </div>
        </section>
      </main>

      {/* ── ABAIXO: CASOS REAIS EM MOÇAMBIQUE (ATUALIZADO 2026) ── */}
      <section className="w-full max-w-7xl mx-auto z-10 mt-10 md:mt-14 border-t border-white/10 pt-6">
        <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
          <span className="text-xl">🇲🇿</span>
          <h3 className="text-emerald-300 font-black text-xs md:text-sm uppercase tracking-widest">
            {lang === "pt" ? "Contexto Real de Moçambique (Atualizado 2026)" : "Real Context of Mozambique (2026 Updated)"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOZ_CONTEXT_2026[lang].map((item, idx) => (
            <div 
              key={idx}
              className="bg-black/20 backdrop-blur-sm border border-white/5 rounded-2xl p-4 flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <h4 className="text-white font-extrabold text-sm tracking-tight">
                  {item.title}
                </h4>
              </div>
              <p className="text-white/60 text-xs font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CITAÇÃO DE RODAPÉ ── */}
      <footer className="w-full text-center z-10 pt-8 pb-safe">
        <p className="text-white/30 italic text-[11px] max-w-md mx-auto px-4">
          {t.quote}
        </p>
      </footer>
    </div>
  );
}