import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Props {
  onStart: (name: string, lang: Lang) => void;
}

const PARTICLES = [
  { e: "💡", x: 5,  y: 8,  d: 4 },
  { e: "🌿", x: 92, y: 12, d: 5 },
  { e: "♻️", x: 12, y: 82, d: 4.5 },
  { e: "💧", x: 85, y: 78, d: 3.5 },
];

// Contexto Educativo Expandido: Problemas, Sucessos e Aprendizado do Jogo
const MOZ_ENVIRONMENT_DATA = {
  pt: [
    {
      title: "Ciclones e Destruição na Costa",
      type: "problem",
      tag: "🚨 PROBLEMA CRÍTICO",
      desc: "Cidades costeiras como a Beira sofrem com erosão severa e tempestades destrutivas devido às alterações climáticas.",
      solution: "O QUE FAZES NO JOGO: Aprendes a plantar mangais na costa para criar barreiras naturais contra a fúria das águas.",
      img: "https://images.unsplash.com/photo-1488330890490-c291ecf62571?auto=format&fit=crop&w=600&q=85"
    },
    {
      title: "A Grande Central Solar de Metoro",
      type: "success",
      tag: "✅ MOMENTO DE SUCESSO",
      desc: "Moçambique inaugurou em Cabo Delgado uma central gigante de energia solar, reduzindo o uso de geradores poluentes.",
      solution: "O QUE FAZES NO JOGO: Substituis fontes de carvão e gasóleo por painéis fotovoltaicos para iluminar as províncias.",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=85"
    },
    {
      title: "Seca Extrema e Falta de Água",
      type: "problem",
      tag: "🚨 PROBLEMA CRÍTICO",
      desc: "As províncias do sul enfrentam longos períodos sem chuva, secando culturas agrícolas e afetando o gado e as famílias.",
      solution: "O QUE FAZES NO JOGO: Desenhas sistemas inteligentes de recolha de água pluvial e irrigação gota-a-gota eficiente.",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=85"
    }
  ],
  en: [
    {
      title: "Cyclones & Coastal Erosion",
      type: "problem",
      tag: "🚨 CRITICAL PROBLEM",
      desc: "Coastal cities like Beira suffer from extreme erosion and destructive storms triggered by global climate changes.",
      solution: "WHAT YOU DO IN GAME: You plant coastal mangroves to design absolute natural shields against rising sea storms.",
      img: "https://images.unsplash.com/photo-1488330890490-c291ecf62571?auto=format&fit=crop&w=600&q=85"
    },
    {
      title: "The Metoro Solar Power Plant",
      type: "success",
      tag: "✅ SUCCESS MOMENT",
      desc: "Mozambique launched a massive photovoltaic grid in Cabo Delgado, drastically lowering heavy fossil fuel reliance.",
      solution: "WHAT YOU DO IN GAME: You switch obsolete coal grids for renewable solar fields to power up clean local districts.",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=85"
    },
    {
      title: "Severe Droughts & Water Scarcity",
      type: "problem",
      tag: "🚨 CRITICAL PROBLEM",
      desc: "Southern provinces struggle with missing rain, killing vital crops and threatening livestock and human safety.",
      solution: "WHAT YOU DO IN GAME: You implement advanced smart rainwater harvesting methods and optimized eco-irrigation.",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=85"
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
      {/* ── GRADIENTE ORIGINAL PRESERVADO PARA CPU EXTRA LEVE ── */}
      <div className="absolute inset-0 z-0 bg-emerald-900"
        style={{
          background: "linear-gradient(145deg, #064e3b 0%, #065f46 20%, #0f766e 45%, #0369a1 75%, #1d4ed8 100%)",
        }} />

      {/* Raios de luz de hardware estável */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
        {[25, 50, 75].map((x, i) => (
          <div key={i} className="absolute top-0 bottom-0"
            style={{
              left: `${x}%`,
              width: "90px",
              background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
              transform: "skewX(-15deg)",
            }} />
        ))}
      </div>

      {/* Partículas Estáveis sem travamento em GPU */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none z-0 will-change-transform text-xl opacity-20"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}>
          {p.e}
        </motion.div>
      ))}

      {/* ── TOPO: Cabeçalho ── */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center z-10 mb-6 pt-safe">
        <div>
          <h1 className="font-black text-white text-3xl md:text-4xl tracking-tight drop-shadow-md">
            EcoSteps
          </h1>
          <p className="text-emerald-300 font-extrabold text-[10px] md:text-xs uppercase tracking-widest mt-0.5">
            {t.tagline}
          </p>
        </div>

        <div className="bg-black/40 p-1 rounded-full flex gap-1 border border-white/10 shadow-lg">
          {(["pt", "en"] as Lang[]).map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-full font-black text-xs transition-all ${lang === l ? "bg-white text-emerald-950 shadow-md" : "text-white/70 hover:text-white"}`}>
              {l === "pt" ? "🇲🇿 PT" : "🇬🇧 EN"}
            </button>
          ))}
        </div>
      </header>

      {/* ── PAINEL PRINCIPAL: CONFIGURAÇÃO DE JOGO ── */}
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto z-10 items-stretch">
        
        {/* Bloco 1: Funcionamento Geral */}
        <section className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="bg-black/20 border border-white/10 rounded-2xl p-4 md:p-5">
            <h2 className="text-white font-black text-base md:text-lg uppercase tracking-wider flex items-center gap-2">
              <span>📢</span> {lang === "pt" ? "A Maquete Ecológica Interativa" : "The Interactive Eco Simulation"}
            </h2>
            <p className="text-white/80 text-xs md:text-sm mt-1 font-medium leading-relaxed">
              {lang === "pt" 
                ? "Uma simulação em tempo real desenvolvida para mostrar o impacto direto das ações humanas na sustentabilidade da nossa comunidade."
                : "A real-time simulation designed to demonstrate the direct impact of human choices on our local environment."}
            </p>
          </div>

          {/* Os 3 Pilares Básicos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {t.missions.map((m, i) => (
              <div key={`${lang}-${i}`}
                className="rounded-2xl p-4 flex flex-col items-center text-center border border-white/10 bg-black/20 shadow-md"
              >
                <span className="text-3xl mb-2 block filter drop-shadow-md">{m.icon}</span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-black text-white text-xs md:text-sm tracking-tight">{m.title}</span>
                  <span className="text-white/50 text-[10px] md:text-xs font-medium leading-tight">{m.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bloco 2: Entrada do Usuário */}
        <section className="lg:col-span-5 w-full">
          <div className="w-full h-full bg-black/30 rounded-[2rem] p-5 flex flex-col justify-center gap-4 border border-white/20 shadow-xl">
            <div className="text-center">
              <span className="bg-emerald-400 text-slate-950 font-black text-[9px] tracking-widest uppercase rounded-full px-2.5 py-1 inline-block mb-2">
                {lang === "pt" ? "PRONTO PARA EXECUTAR" : "READY TO LAUNCH"}
              </span>
              <h3 className="text-white font-black text-lg tracking-tight">
                {lang === "pt" ? "Painel de Entrada" : "Login Portal"}
              </h3>
              <p className="text-white/60 text-[11px] font-semibold">
                {lang === "pt" ? "Escreve o teu nome para iniciar a simulação:" : "Type your name to configure your eco session:"}
              </p>
            </div>

            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleStart()}
              placeholder={lang === "pt" ? "Nome do Jogador..." : "Player Name..."}
              maxLength={18}
              className="w-full bg-black/50 text-white placeholder-white/20 font-black rounded-xl px-4 py-3 text-center border border-white/10 focus:border-emerald-400 focus:outline-none transition-all text-sm shadow-inner"
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
                ? (lang === "pt" ? "🎮 Rodar Maquete ➔" : "🎮 Run Simulation ➔") 
                : (lang === "pt" ? "Escreve o teu Nome" : "Type your Name")
              }
            </motion.button>
          </div>
        </section>
      </main>

      {/* ── BLOCO 3: PAINEL DE EXPLORAÇÃO DE IMAGENS E CONTEXTO AMBIENTAL REAL ── */}
      <section className="w-full max-w-6xl mx-auto z-10 mt-8 border-t border-white/10 pt-5">
        <div className="text-center lg:text-left mb-4">
          <h3 className="text-emerald-300 font-black text-xs md:text-sm uppercase tracking-widest flex items-center gap-2 justify-center lg:justify-start">
            <span>🇲🇿</span> {lang === "pt" ? "Casos Reais: O que a Maquete te vai ensinar?" : "Real Cases: What will the simulation teach you?"}
          </h3>
          <p className="text-white/40 text-[10px] md:text-xs font-semibold mt-0.5">
            {lang === "pt" ? "Desliza para os lados no telemóvel para explorar cada caso" : "Swipe left/right on mobile devices to browse the environment timeline"}
          </p>
        </div>

        {/* Grelha Dinâmica: Carrossel horizontal em ecrãs Mobile, Grelha estável de 3 colunas no PC */}
        <div className="flex lg:grid lg:grid-cols-3 gap-5 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory no-scrollbar w-full">
          {MOZ_ENVIRONMENT_DATA[lang].map((item, idx) => (
            <div 
              key={idx}
              className="bg-black/50 border border-white/10 rounded-2xl p-3.5 flex flex-col gap-4 min-w-[290px] sm:min-w-[340px] lg:min-w-0 snap-center shadow-2xl transition-all duration-200"
            >
              {/* Imagem Real com Maior Visibilidade e Tamanho Elevado */}
              <div 
                className="w-full h-36 rounded-xl bg-cover bg-center border border-white/15 relative shadow-md"
                style={{ 
                  backgroundImage: `url(${item.img})`,
                  contentVisibility: 'auto'
                }}
              >
                {/* Badge Dinâmico: Cor Vermelha para Problemas, Verde para Sucessos */}
                <span className={`absolute bottom-2 left-2 font-black text-[9px] tracking-wider px-2.5 py-1 rounded-md shadow-md text-white border ${
                  item.type === 'problem' ? 'bg-rose-600/90 border-rose-400' : 'bg-emerald-600/90 border-emerald-400'
                }`}>
                  {item.tag}
                </span>
              </div>
              
              {/* Informações Textuais Organizadas por Hierarquia de Cores */}
              <div className="flex flex-col gap-2">
                <h4 className="text-white font-black text-sm md:text-base tracking-tight leading-tight">
                  {item.title}
                </h4>
                
                {/* Descrição da Realidade */}
                <p className="text-white/70 text-xs font-medium leading-relaxed">
                  {item.desc}
                </p>

                {/* Bloco de Aprendizado Prático Destacado */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 mt-1">
                  <p className="text-emerald-300 font-extrabold text-[11px] md:text-xs leading-normal">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CITAÇÃO DE IMPACTO NO RODAPÉ ── */}
      <footer className="w-full text-center z-10 pt-5 pb-safe">
        <p className="text-white/30 italic text-[10px] max-w-sm mx-auto px-4">
          {t.quote}
        </p>
      </footer>
    </div>
  );
}