import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Props {
  onStart: (name: string, lang: Lang) => void;
}

const PARTICLES = [
  { e: "💡", x: 5,  y: 10, d: 4 },
  { e: "🌿", x: 88, y: 15, d: 5 },
  { e: "♻️", x: 15, y: 80, d: 4.5 },
  { e: "💧", x: 82, y: 75, d: 3.5 },
];

const MOZ_CONTEXT_2026 = {
  pt: [
    {
      title: "Energia Solar Metoro",
      desc: "Central gigante em Cabo Delgado gerando energia limpa para milhares de famílias moçambicanas.",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=500&q=80",
      tag: "⚡ ENERGIA"
    },
    {
      title: "Mangais da Beira",
      desc: "Plantação de árvores na costa para proteger a nossa linda cidade contra tempestades e erosão.",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&q=80",
      tag: "🌳 NATUREZA"
    },
    {
      title: "Água no Sul",
      desc: "Novos sistemas modernos captando e guardando água da chuva preciosa para combater a seca.",
      img: "https://images.unsplash.com/photo-1488330890490-c291ecf62571?auto=format&fit=crop&w=500&q=80",
      tag: "💧 RECURSOS"
    }
  ],
  en: [
    {
      title: "Metoro Solar Power",
      desc: "Giant plant in Cabo Delgado providing clean, bright energy to thousands of Mozambican families.",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=500&q=80",
      tag: "⚡ ENERGY"
    },
    {
      title: "Beira Mangroves",
      desc: "Planting coastal trees to protect our beautiful city from harsh storms and ocean erosion.",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&—q=80",
      tag: "🌳 NATUREZA"
    },
    {
      title: "Southern Water",
      desc: "Modern systems catching and preserving precious rainwater to easily fight severe droughts.",
      img: "https://images.unsplash.com/photo-1488330890490-c291ecf62571?auto=format&fit=crop&w=500&q=80",
      tag: "💧 RESOURCES"
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
      className="min-h-screen w-full flex flex-col relative overflow-y-auto overflow-x-hidden p-4 md:p-8 select-none justify-between bg-slate-950"
      style={{ fontFamily: "Outfit, sans-serif" }}
    >
      {/* ── SEU GRADIENTE ORIGINAL DE ALTA PERFORMANCE ── */}
      <div className="absolute inset-0 z-0 bg-emerald-900"
        style={{
          background: "linear-gradient(145deg, #064e3b 0%, #065f46 20%, #0f766e 45%, #0369a1 75%, #1d4ed8 100%)",
        }} />

      {/* Raios de luz originais estilizados sem pesar na CPU */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
        {[20, 50, 80].map((x, i) => (
          <div key={i} className="absolute top-0 bottom-0"
            style={{
              left: `${x}%`,
              width: "100px",
              background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
              transform: "skewX(-15deg)",
            }} />
        ))}
      </div>

      {/* Elementos Flutuantes Discretos e Leves */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none z-0 will-change-transform text-2xl opacity-25"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}>
          {p.e}
        </motion.div>
      ))}

      {/* ── TOPO: Título Minimalista e Seletor ── */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center z-10 mb-6 pt-safe">
        <div>
          <h1 className="font-black text-white text-3xl md:text-4xl tracking-tight drop-shadow-md">
            EcoSteps
          </h1>
          <p className="text-emerald-300 font-extrabold text-[10px] md:text-xs uppercase tracking-widest mt-0.5">
            {t.tagline}
          </p>
        </div>

        <div className="bg-black/30 p-1 rounded-full flex gap-1 border border-white/10 shadow-lg">
          {(["pt", "en"] as Lang[]).map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-full font-black text-xs transition-all ${lang === l ? "bg-white text-emerald-950 shadow-md" : "text-white/70 hover:text-white"}`}>
              {l === "pt" ? "🇲🇿 PT" : "🇬🇧 EN"}
            </button>
          ))}
        </div>
      </header>

      {/* ── GRID PRINCIPAL DE EXPLORAÇÃO ── */}
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto z-10 items-stretch">
        
        {/* BLOCO 1: PILARES DA MAQUETE (Esquerda - 7/12) */}
        <section className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="bg-black/20 border border-white/10 rounded-2xl p-4 md:p-5">
            <h2 className="text-white font-black text-base md:text-lg uppercase tracking-wider flex items-center gap-2">
              <span>📢</span> {lang === "pt" ? "Como funciona a Maquete?" : "How the simulation works?"}
            </h2>
            <p className="text-white/80 text-xs md:text-sm mt-1 font-medium leading-relaxed">
              {lang === "pt" 
                ? "Mostre aos seus colegas como pequenas escolhas diárias alteram o ecossistema em tempo real:"
                : "Show your classmates how daily small choices shift the ecosystem in real time:"}
            </p>
          </div>

          {/* Os 3 Pilares com Visual Clean estilo Cartão */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {t.missions.map((m, i) => (
              <div key={`${lang}-${i}`}
                className="rounded-2xl p-4 flex flex-col items-center text-center border border-white/10 bg-black/15 shadow-md"
              >
                <span className="text-3xl md:text-4xl mb-2 block filter drop-shadow-md">{m.icon}</span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-black text-white text-xs md:text-sm tracking-tight">{m.title}</span>
                  <span className="text-white/50 text-[10px] md:text-xs font-medium leading-tight">{m.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BLOCO 2: PORTAL DO JOGADOR - PRÁTICA (Direita - 5/12) */}
        <section className="lg:col-span-5 w-full">
          <div className="w-full h-full bg-black/30 rounded-[2rem] p-5 flex flex-col justify-center gap-4 border border-white/20 shadow-xl">
            <div className="text-center">
              <span className="bg-emerald-400 text-slate-950 font-black text-[9px] tracking-widest uppercase rounded-full px-2.5 py-1 inline-block mb-2">
                {lang === "pt" ? "PASSO PRÁTICO" : "PRACTICAL STEP"}
              </span>
              <h3 className="text-white font-black text-lg tracking-tight">
                {lang === "pt" ? "Espaço do Jogador" : "Player Space"}
              </h3>
              <p className="text-white/60 text-[11px] font-semibold">
                {lang === "pt" ? "Quem vai testar a maquete coloca o nome abaixo:" : "Whoever is testing the model enters their name:"}
              </p>
            </div>

            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleStart()}
              placeholder={lang === "pt" ? "Nome do Jogador..." : "Player Name..."}
              maxLength={18}
              className="w-full bg-black/40 text-white placeholder-white/25 font-black rounded-xl px-4 py-3 text-center border border-white/10 focus:border-emerald-400 focus:outline-none transition-all text-sm"
              data-testid="input-player-name"
            />

            <motion.button
              onClick={handleStart}
              disabled={!canPlay}
              whileTap={canPlay ? { scale: 0.98 } : {}}
              className="w-full rounded-xl font-black text-white uppercase tracking-wider transition-all py-3.5 text-sm shadow-md cursor-pointer"
              style={{
                background: canPlay
                  ? "linear-gradient(135deg, #22c55e 0%, #10b981 50%, #0ea5e9 100%)"
                  : "rgba(255,255,255,0.05)",
              }}
              data-testid="button-start-game"
            >
              {canPlay 
                ? (lang === "pt" ? "🎮 Entrar e Jogar ➔" : "🎮 Enter & Play ➔") 
                : (lang === "pt" ? "Aguardando Nome..." : "Waiting for Name...")
              }
            </motion.button>
          </div>
        </section>
      </main>

      {/* ── BLOCO 3: CASOS REAIS DE MOÇAMBIQUE (CARROSSEL DESLIZÁVEL NO CELULAR) ── */}
      <section className="w-full max-w-6xl mx-auto z-10 mt-6 border-t border-white/10 pt-4">
        <h3 className="text-emerald-300 font-black text-[11px] md:text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5 justify-center lg:justify-start">
          <span>🇲🇿</span> {lang === "pt" ? "Exploração: Evidências em Moçambique (2026)" : "Exploration: Mozambique Evidence (2026)"}
        </h3>

        {/* Container Híbrido: Grid estável no PC, Carrossel horizontal deslizável nativo (`overflow-x-auto`) no Telemóvel */}
        <div className="flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto pb-3 pt-1 px-1 snap-x snap-mandatory no-scrollbar w-full">
          {MOZ_CONTEXT_2026[lang].map((item, idx) => (
            <div 
              key={idx}
              className="bg-black/40 border border-white/5 rounded-2xl p-3 flex flex-col gap-3 min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center shadow-lg transition-transform hover:scale-[1.01]"
            >
              {/* Imagem Real de Alta Performance */}
              <div 
                className="w-full h-28 rounded-xl bg-cover bg-center border border-white/10 relative"
                style={{ 
                  backgroundImage: `url(${item.img})`,
                  contentVisibility: 'auto'
                }}
              >
                {/* Etiqueta de Categoria */}
                <span className="absolute top-2 left-2 bg-black/60 text-white font-black text-[9px] px-2 py-0.5 rounded-md border border-white/10">
                  {item.tag}
                </span>
              </div>
              
              <div className="flex flex-col gap-0.5">
                <h4 className="text-white font-extrabold text-xs md:text-sm tracking-tight">
                  {item.title}
                </h4>
                <p className="text-white/60 text-[11px] md:text-xs font-medium leading-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FRRASE DE IMPACTO REINCORPORADA NO RODAPÉ ── */}
      <footer className="w-full text-center z-10 pt-4 pb-safe">
        <p className="text-white/30 italic text-[10px] max-w-md mx-auto px-4">
          {t.quote}
        </p>
      </footer>
    </div>
  );
}