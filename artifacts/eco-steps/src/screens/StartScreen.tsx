import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Props {
  onStart: (name: string, lang: Lang) => void;
}

const PARTICLES = [
  { e: "💡", x: 4,  y: 8,  d: 4.5 },
  { e: "🌿", x: 12, y: 72, d: 5.0 },
  { e: "♻️", x: 25, y: 15, d: 4.8 },
  { e: "💧", x: 45, y: 82, d: 4.2 },
  { e: "🌍", x: 68, y: 10, d: 5.5 },
  { e: "⚡", x: 88, y: 68, d: 4.0 },
  { e: "🌱", x: 94, y: 25, d: 4.6 },
  { e: "☀️", x: 52, y: 5,  d: 6.0 },
];

// Dados e Casos Reais com URLs de imagens reais de alta performance (Unsplash optimizadas)
const MOZ_CONTEXT_2026 = {
  pt: [
    {
      title: "Energia Solar (Metoro)",
      desc: "Central fotovoltaica em Cabo Delgado expandindo a energia limpa e renovável no norte de Moçambique.",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=400&q=70"
    },
    {
      title: "Proteção de Mangais",
      desc: "Restauração ecológica costeira na Beira e Maputo para conter a erosão e proteger as comunidades.",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=70"
    },
    {
      title: "Preservação da Água",
      desc: "Sistemas inteligentes de captação e gestão hídrica nas bacias do sul para combater a seca extrema.",
      img: "https://images.unsplash.com/photo-1488330890490-c291ecf62571?auto=format&fit=crop&w=400&q=70"
    }
  ],
  en: [
    {
      title: "Solar Energy (Metoro)",
      desc: "Photovoltaic plant in Cabo Delgado expanding clean, renewable power infrastructure in northern Mozambique.",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=400&q=70"
    },
    {
      title: "Mangrove Protection",
      desc: "Coastal ecological restoration in Beira and Maputo to mitigate erosion and safeguard local communities.",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=70"
    },
    {
      title: "Water Preservation",
      desc: "Smart water harvesting and management systems across southern basins to fight severe drought.",
      img: "https://images.unsplash.com/photo-1488330890490-c291ecf62571?auto=format&fit=crop&w=400&q=70"
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
      {/* ── BACKGROUND ORIGINAL PRESERVADO ── */}
      <div className="absolute inset-0 z-0 bg-teal-900"
        style={{
          background: "linear-gradient(145deg, #064e3b 0%, #065f46 20%, #0f766e 45%, #0369a1 75%, #1d4ed8 100%)",
        }} />

      {/* Raios de luz sutis (Opacidade reduzida para melhor render de CPU) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
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

      {/* Partículas Flutuantes Otimizadas (Animações mais lentas reduzem o uso de GPU) */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none select-none z-0 will-change-transform"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: "clamp(18px,3vw,26px)", opacity: 0.15 }}
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}>
          {p.e}
        </motion.div>
      ))}

      {/* ── TOPO: Título e Seletor de Idioma ── */}
      <header className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center z-10 gap-4 mb-8 pt-safe">
        <div className="text-center sm:text-left">
          <h1 className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(32px, 5vw, 46px)", textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
            EcoSteps
          </h1>
          <AnimatePresence mode="wait">
            <motion.p key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-emerald-300 font-bold text-xs uppercase tracking-wider mt-1">
              {t.tagline}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-1 rounded-full flex gap-1 border border-white/20 shadow-md">
          {(["pt", "en"] as Lang[]).map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-black text-xs transition-all duration-200 ${lang === l ? "bg-white text-emerald-900 shadow-lg" : "text-white/80 hover:bg-white/10"}`}>
              <span>{l === "pt" ? "🇵🇹 PT" : "🇬🇧 EN"}</span>
            </button>
          ))}
        </div>
      </header>

      {/* ── PAINEL PRINCIPAL: DIVIDIDO EM 2 COLUNAS (COMPUTADOR) OU VERTICAL (CELULAR) ── */}
      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto z-10 items-stretch">
        
        {/* BLOCO 1: PILARES TEÓRICOS DA APRESENTAÇÃO (Esquerda - 7/12) */}
        <section className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📢</span>
              <h2 className="text-white font-black text-lg md:text-xl tracking-tight uppercase border-b-2 border-emerald-500 pb-1">
                {lang === "pt" ? "Bloco 1: Introdução da Maquete" : "Block 1: Presentation Core"}
              </h2>
            </div>
            <p className="text-white/80 text-sm leading-relaxed font-medium">
              {lang === "pt" 
                ? "Explicação conceitual rápida antes de iniciar os testes em simulação real:"
                : "Quick conceptual framework explanation before launching the live simulation run:"}
            </p>
          </div>

          {/* Grid dos Pilares Básicos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.missions.map((m, i) => (
              <div key={`${lang}-${i}`}
                className="rounded-2xl p-4 flex flex-col justify-between items-center text-center backdrop-blur-md border border-white/15 min-h-[150px] shadow-lg bg-white/5"
              >
                <span className="filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)] mb-2" style={{ fontSize: "clamp(32px, 6vw, 42px)" }}>
                  {m.icon}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-black text-white text-xs md:text-sm tracking-tight leading-tight block">
                    {m.title}
                  </span>
                  <span className="text-white/50 text-[10px] md:text-xs leading-tight font-medium block">
                    {m.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BLOCO 2: ÁREA DE EXECUÇÃO PRÁTICA DO JOGADOR (Direita - 5/12) */}
        <section className="lg:col-span-5 xl:col-span-4 w-full">
          <div className="w-full h-full bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col justify-center gap-5 border-2 border-emerald-500/40 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            
            <div className="bg-emerald-500 text-slate-950 font-black text-[10px] tracking-widest uppercase rounded-full px-4 py-1.5 w-max mx-auto shadow-md">
              {lang === "pt" ? "Bloco 2: Iniciar Prática" : "Block 2: Run Simulation"}
            </div>

            <div className="text-center">
              <h3 className="text-white font-black text-xl tracking-tight">
                {lang === "pt" ? "Espaço do Jogador" : "Player Space"}
              </h3>
              <p className="text-white/50 text-xs font-semibold mt-0.5">
                {lang === "pt" ? "O voluntário ou colega insere o nome abaixo" : "The volunteer or classmate enters their name below"}
              </p>
            </div>

            {/* Input Limpo e Otimizado */}
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleStart()}
                placeholder={lang === "pt" ? "Nome do Jogador..." : "Player Name..."}
                maxLength={20}
                className="w-full bg-black/40 text-white placeholder-white/20 font-black rounded-2xl px-4 py-3.5 text-center border border-white/10 focus:border-emerald-400 focus:outline-none transition-all shadow-inner text-base"
                data-testid="input-player-name"
              />
            </div>

            {/* Botão de Disparo do Simulador */}
            <motion.button
              onClick={handleStart}
              disabled={!canPlay}
              whileTap={canPlay ? { scale: 0.98 } : {}}
              className="w-full rounded-2xl font-black text-white uppercase tracking-wider transition-all duration-150 disabled:opacity-20 disabled:cursor-not-allowed py-4 text-base shadow-lg cursor-pointer"
              style={{
                background: canPlay
                  ? "linear-gradient(135deg, #22c55e 0%, #10b981 50%, #0ea5e9 100%)"
                  : "rgba(255,255,255,0.05)",
              }}
              data-testid="button-start-game"
            >
              {canPlay 
                ? (lang === "pt" ? "🎮 Rodar Simulação ➔" : "🎮 Run Simulation ➔") 
                : (lang === "pt" ? "Inserir Nome do Jogador" : "Enter Player Name")
              }
            </motion.button>
          </div>
        </section>
      </main>

      {/* ── BLOCO 3: CASOS REAIS DE MOÇAMBIQUE COM IMAGENS REAIS (Abaixo - Largura Total) ── */}
      <section className="w-full max-w-7xl mx-auto z-10 mt-10 border-t-2 border-dashed border-white/10 pt-6">
        <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
          <span className="text-xl">🇲🇿</span>
          <h3 className="text-emerald-400 font-black text-xs md:text-sm uppercase tracking-widest">
            {lang === "pt" ? "Bloco 3: Evidências e Casos Reais em Moçambique (2026)" : "Block 3: Real Evidence & Cases in Mozambique (2026)"}
          </h3>
        </div>

        {/* Linha do Tempo/Grid de Evidências Otimizado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOZ_CONTEXT_2026[lang].map((item, idx) => (
            <div 
              key={idx}
              className="bg-black/30 backdrop-blur-sm border border-white/5 rounded-2xl p-3 flex flex-col sm:flex-row md:flex-col gap-3 items-center sm:items-start md:items-center shadow-lg"
            >
              {/* Imagem Real de Alta Performance usando propriedades nativas CSS */}
              <div 
                className="w-full sm:w-32 md:w-full h-24 rounded-xl flex-shrink-0 bg-cover bg-center border border-white/10 shadow-inner"
                style={{ 
                  backgroundImage: `url(${item.img})`,
                  contentVisibility: 'auto' // Otimização nativa de rendering de CPU para elementos fora de ecrã
                }}
              />
              
              <div className="flex flex-col gap-1 w-full text-center sm:text-left md:text-center">
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

      {/* ── CITAÇÃO DE RODAPÉ ── */}
      <footer className="w-full text-center z-10 pt-8 pb-safe">
        <p className="text-white/30 italic text-[10px] max-w-md mx-auto px-4">
          {t.quote}
        </p>
      </footer>
    </div>
  );
}