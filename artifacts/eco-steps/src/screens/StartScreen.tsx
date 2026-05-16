import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Props {
  onStart: (name: string, lang: Lang) => void;
}

const PARTICLES = [
  { e: "💡", x: 6,  y: 10, d: 4 },
  { e: "🌿", x: 90, y: 14, d: 5 },
  { e: "♻️", x: 10, y: 80, d: 4.5 },
  { e: "💧", x: 88, y: 75, d: 3.5 },
];

// Dados dos Desafios Reais com Links para Portais Oficiais/Informativos
const MOZ_GAME_MISSIONS = {
  pt: [
    {
      title: "Desafio 1: Gestão de Lixo e Resíduos",
      subtitle: "Acabar com as lixeiras a céu aberto e reciclar",
      tag: "♻️ LIXO NO LUGAR CERTO",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=85",
      url: "https://www.asome.org/" // Exemplo de link oficial de gestão ambiental/social em Moçambique
    },
    {
      title: "Desafio 2: Transição de Energia",
      subtitle: "Substituir geradores poluentes por painéis solares",
      tag: "⚡ POUPAR ENERGIA",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=700&q=85",
      url: "https://www.funae.co.mz/" // FUNAE - Fundo de Energia de Moçambique
    },
    {
      title: "Desafio 3: Conservação Hídrica",
      subtitle: "Combater a seca com irrigação inteligente",
      tag: "💧 POUPAR ÁGUA",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=85",
      url: "https://www.ara-sul.co.mz/" // ARA-Sul - Gestão de Recursos Hídricos de Moçambique
    }
  ],
  en: [
    {
      title: "Challenge 1: Waste Management",
      subtitle: "Stop open dumpsites and start recycling right",
      tag: "♻️ WASTE MANAGEMENT",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=85",
      url: "https://www.asome.org/"
    },
    {
      title: "Challenge 2: Energy Transition",
      subtitle: "Replace fossil generators with solar technology",
      tag: "⚡ SAVE ENERGY",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=700&q=85",
      url: "https://www.funae.co.mz/"
    },
    {
      title: "Challenge 3: Water Conservation",
      subtitle: "Fight severe droughts with smart eco-irrigation",
      tag: "💧 SAVE WATER",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=85",
      url: "https://www.ara-sul.co.mz/"
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
      {/* ── GRADIENTE DE FUNDO OTIMIZADO PARA POUPAR CPU/GPU ── */}
      <div className="absolute inset-0 z-0 bg-emerald-900"
        style={{
          background: "linear-gradient(145deg, #064e3b 0%, #065f46 20%, #0f766e 45%, #0369a1 75%, #1d4ed8 100%)",
        }} />

      {/* Raios de luz sutis de aceleração nativa */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
        {[30, 60, 90].map((x, i) => (
          <div key={i} className="absolute top-0 bottom-0"
            style={{
              left: `${x}%`,
              width: "80px",
              background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
              transform: "skewX(-15deg)",
            }} />
        ))}
      </div>

      {/* Partículas Flutuantes Leves */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none z-0 will-change-transform text-xl opacity-15"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}>
          {p.e}
        </motion.div>
      ))}

      {/* ── TOPO: Marca do Jogo e Idioma ── */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center z-10 mb-6 pt-safe">
        <div>
          <h1 className="font-black text-white text-3xl md:text-4xl tracking-tight drop-shadow-md">
            EcoSteps
          </h1>
          <p className="text-emerald-300 font-extrabold text-[10px] md:text-xs uppercase tracking-widest mt-0.5">
            {lang === "pt" ? "JOGA, APRENDE E EVOLUI" : "PLAY, LEARN AND EVOLVE"}
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

      {/* ── INTERFACE CENTRAL DO GAME ── */}
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto z-10 items-stretch">
        
        {/* Bloco 1: O Conceito do Jogo Interativo */}
        <section className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="bg-black/20 border border-white/10 rounded-2xl p-4 md:p-5">
            <h2 className="text-white font-black text-base md:text-lg uppercase tracking-wider flex items-center gap-2">
              <span>🎮</span> {lang === "pt" ? "A Maquete Virtual EcoSteps" : "The EcoSteps Virtual Simulation"}
            </h2>
            <p className="text-white/80 text-xs md:text-sm mt-1 font-medium leading-relaxed">
              {lang === "pt" 
                ? "Entra numa simulação interativa onde controlas uma comunidade real. Cada decisão sobre recursos afeta os teus indicadores ecológicos de sobrevivência e desenvolvimento."
                : "Enter an interactive simulation where you manage a real community. Every resource choice impacts your eco survival and growth metrics."}
            </p>
          </div>

          {/* Os 3 Pilares do Core Loop do Jogo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {t.missions.map((m, i) => (
              <div key={`${lang}-${i}`}
                className="rounded-2xl p-4 flex flex-col items-center text-center border border-white/10 bg-black/20 shadow-md"
              >
                <span className="text-3xl mb-1.5 block filter drop-shadow-md">{m.icon}</span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-black text-white text-xs md:text-sm tracking-tight">{m.title}</span>
                  <span className="text-white/50 text-[10px] md:text-xs font-medium leading-tight">{m.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bloco 2: Portal de Entrada do Jogador */}
        <section className="lg:col-span-5 w-full">
          <div className="w-full h-full bg-black/30 rounded-[2rem] p-5 flex flex-col justify-center gap-4 border border-white/20 shadow-xl">
            <div className="text-center">
              <span className="bg-emerald-400 text-slate-950 font-black text-[9px] tracking-widest uppercase rounded-full px-2.5 py-1 inline-block mb-2">
                {lang === "pt" ? "SIMULADOR PRONTO" : "SIMULATOR READY"}
              </span>
              <h3 className="text-white font-black text-lg tracking-tight">
                {lang === "pt" ? "Cria o teu Avatar" : "Create your Avatar"}
              </h3>
              <p className="text-white/60 text-[11px] font-semibold">
                {lang === "pt" ? "Insere o teu nome para começar a evoluir:" : "Enter your name to start your eco journey:"}
              </p>
            </div>

            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleStart()}
              placeholder={lang === "pt" ? "Nome do Jogador..." : "Player Name..."}
              maxLength={16}
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
                ? (lang === "pt" ? "🎮 Jogar e Evoluir ➔" : "🎮 Play & Evolve ➔") 
                : (lang === "pt" ? "Digita o teu Nome..." : "Enter your Name...")
              }
            </motion.button>
          </div>
        </section>
      </main>

      {/* ── BLOCO 3: COMPONENTES VISUAIS PREMIUM (FOCO EM IMAGENS GRANDES E LINKS OFICIAIS) ── */}
      <section className="w-full max-w-6xl mx-auto z-10 mt-8 border-t border-white/10 pt-5">
        <div className="text-center lg:text-left mb-4">
          <h3 className="text-emerald-300 font-black text-xs md:text-sm uppercase tracking-widest flex items-center gap-2 justify-center lg:justify-start">
            <span>🇲🇿</span> {lang === "pt" ? "Desafios Reais de Moçambique no Jogo" : "Real Mozambique Game Challenges"}
          </h3>
          <p className="text-white/40 text-[10px] md:text-xs font-semibold mt-0.5">
            {lang === "pt" ? "Clica nos cartões abaixo para ler as matérias nos portais oficiais" : "Click on the cards below to read full articles on official portals"}
          </p>
        </div>

        {/* Carrossel Deslizável no telemóvel e Grelha lado a lado no PC */}
        <div className="flex lg:grid lg:grid-cols-3 gap-5 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory no-scrollbar w-full">
          {MOZ_GAME_MISSIONS[lang].map((item, idx) => (
            <a 
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              className="bg-black/40 border border-white/10 rounded-2xl p-3 flex flex-col gap-3 min-w-[285px] sm:min-w-[330px] lg:min-w-0 snap-center shadow-2xl hover:border-emerald-400/50 transition-all duration-200 group active:scale-[0.99]"
            >
              {/* Imagem Real de Altíssima Visibilidade e Destaque Ampliado */}
              <div 
                className="w-full h-44 rounded-xl bg-cover bg-center border border-white/10 relative shadow-inner overflow-hidden"
                style={{ 
                  backgroundImage: `url(${item.img})`,
                  contentVisibility: 'auto'
                }}
              >
                {/* Overlay de Brilho Sutil ao passar o mouse (Pinterest style) */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                {/* Tag de Identificação do Desafio da Maquete */}
                <span className="absolute bottom-3 left-3 bg-slate-950/90 font-black text-[9px] tracking-wider px-2.5 py-1 rounded-md shadow-md text-white border border-white/10">
                  {item.tag}
                </span>
              </div>
              
              {/* Textos de Apoio Curtos e Diretos */}
              <div className="flex flex-col gap-0.5 px-1 pb-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-black text-sm md:text-base tracking-tight leading-tight group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-white/30 text-xs group-hover:text-emerald-300 transition-colors">➔</span>
                </div>
                <p className="text-white/60 text-[11px] md:text-xs font-medium leading-normal">
                  {item.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── FRRASE DE IMPACTO NO RODAPÉ ── */}
      <footer className="w-full text-center z-10 pt-4 pb-safe">
        <p className="text-white/30 italic text-[10px] max-w-sm mx-auto px-4">
          {t.quote}
        </p>
      </footer>
    </div>
  );
}