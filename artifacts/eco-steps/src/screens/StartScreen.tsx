import { motion, useAnimationControls } from "framer-motion";
import { useState, useEffect } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Props {
  onStart: (name: string, lang: Lang) => void;
}

const PARTICLES = [
  { e: "💡", x: 6,  y: 8,  d: 4 },
  { e: "🌿", x: 92, y: 12, d: 5 },
  { e: "♻️", x: 8,  y: 75, d: 4.5 },
  { e: "💧", x: 88, y: 70, d: 3.5 },
];

const MOZ_BLOG_POSTS = {
  pt: [
    {
      title: "Maputo avança com plano estratégico focado no encerramento definitivo da Lixeira de Hulene",
      tag: "♻️ GESTÃO DE RESÍDUOS",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
      url: "https://www.diarioeconomico.co.mz/"
    },
    {
      title: "FUNAE expande redes de eletrificação através de novas centrais solares na província de Nampula",
      tag: "⚡ ENERGIA RENOVÁVEL",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80",
      url: "https://opais.co.mz/"
    },
    {
      title: "BIOFUND garante financiamento histórico para proteção e restauro de mangais na Costa Moçambicana",
      tag: "🌿 BIODIVERSIDADE",
      img: "https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&w=800&q=80",
      url: "https://www.biofund.org.mz/projects/restauracao-de-mangais/"
    },
    {
      title: "MTA e INGD reforçam sistemas de monitoria de bacias hidrográficas contra eventos climáticos extremos",
      tag: "💧 RECURSOS HÍDRICOS",
      img: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&w=800&q=80",
      url: "https://opais.co.mz/"
    }
  ],
  en: [
    {
      title: "Maputo moves forward with strategic blueprint targeted at closing the Hulene landfill",
      tag: "♻️ WASTE MANAGEMENT",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
      url: "https://www.diarioeconomico.co.mz/"
    },
    {
      title: "FUNAE accelerates off-grid modern solar mini-grids expansion across Nampula communities",
      tag: "⚡ RENEWABLE ENERGY",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80",
      url: "https://opais.co.mz/"
    },
    {
      title: "BIOFUND establishes landmark funding for mangrove protection across the Mozambican Coastline",
      tag: "🌿 BIODIVERSITY",
      img: "https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&w=800&q=80",
      url: "https://www.biofund.org.mz/en/projects/mangrove-restoration/"
    },
    {
      title: "MTA and INGD scale up real-time river basin monitoring against severe climate impact events",
      tag: "💧 CLIMATE ACTION",
      img: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&w=800&q=80",
      url: "https://opais.co.mz/"
    }
  ]
};

export default function StartScreen({ onStart }: Props) {
  const [lang, setLang] = useState<Lang>("pt");
  const [name, setName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const t = TRANSLATIONS[lang];

  const canPlay = name.trim().length >= 2;

  const handleStart = () => {
    if (!canPlay) return;
    onStart(name.trim(), lang);
  };

  // Duplicamos a lista para criar o efeito infinito sem quebras visuais no Ticker
  const tickerPosts = [...MOZ_BLOG_POSTS[lang], ...MOZ_BLOG_POSTS[lang]];

  return (
    <div
      className="w-full min-h-screen relative overflow-x-hidden overflow-y-auto px-4 py-12 md:px-16 md:py-20 select-none bg-slate-950 flex flex-col gap-14 md:gap-24"
      style={{ 
        fontFamily: "Outfit, sans-serif", 
        ["WebkitOverflowScrolling" as any]: "touch" 
      }}
    >
      {/* ── GRADIENTE DE FUNDO ULTRA PREMIUM ── */}
      <div 
        className="absolute inset-0 z-0 bg-emerald-950 pointer-events-none"
        style={{
          background: "linear-gradient(150deg, #022c22 0%, #044e3a 30%, #0b7a69 65%, #0369a1 100%)",
        }} 
      />

      {/* Partículas flutuantes discretas */}
      {PARTICLES.map((p, i) => (
        <motion.div 
          key={i}
          className="absolute pointer-events-none z-0 will-change-transform text-3xl opacity-15"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: ["-10px", "10px", "-10px"] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
        >
          {p.e}
        </motion.div>
      ))}

      {/* ── TOPO: CABEÇALHO AMPLO ── */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center z-10 pt-safe relative">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-black text-white text-4xl md:text-6xl tracking-tight drop-shadow-lg">
            EcoSteps
          </h1>
          <p className="text-emerald-300 font-black text-xs md:text-sm uppercase tracking-widest">
            {lang === "pt" ? "🕹️ Jogo de Estratégia Sustentável" : "🕹️ Sustainable Strategy Game"}
          </p>
        </div>

        <div className="bg-black/40 p-2 rounded-full flex gap-1.5 border border-white/10 shadow-2xl backdrop-blur-xl">
          {(["pt", "en"] as Lang[]).map(l => (
            <button 
              key={l} 
              onClick={() => setLang(l)}
              className={`px-5 py-2 rounded-full font-black text-xs md:text-sm transition-all cursor-pointer ${
                lang === l ? "bg-white text-emerald-950 shadow-md scale-105" : "text-white/70 hover:text-white"
              }`}
            >
              {l === "pt" ? "🇲🇿 PT" : "🇬🇧 EN"}
            </button>
          ))}
        </div>
      </header>

      {/* ── CENTRO: PAINEL PRINCIPAL DE JOGO ── */}
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 z-10 relative items-start">
        
        {/* Lado Esquerdo: Detalhes da Simulação */}
        <section className="lg:col-span-7 flex flex-col gap-8 md:gap-10 w-full">
          <div className="bg-black/25 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md shadow-xl">
            <h2 className="text-white font-black text-xl md:text-3xl uppercase tracking-wider flex items-center gap-3">
              <span>🎮</span> {lang === "pt" ? "A Simulação Interativa" : "The Interactive Simulation"}
            </h2>
            <p className="text-white/90 text-base md:text-lg mt-4 font-medium leading-relaxed">
              {lang === "pt" 
                ? "Assume o controlo dos recursos naturais, toma decisões estratégicas em tempo real e evolui a tua comunidade rumo à sustentabilidade absoluta."
                : "Take absolute control over natural resources, execute real-time strategic decisions, and evolve your community toward total sustainability."}
            </p>
          </div>

          {/* Missões do Jogo com Grid Confortável */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {t.missions.map((m, i) => (
              <div 
                key={`${lang}-${i}`}
                className="rounded-3xl p-6 md:p-8 flex flex-col items-center text-center border border-white/10 bg-black/25 shadow-xl backdrop-blur-sm hover:border-emerald-400/30 transition-all"
              >
                <span className="text-5xl mb-4 block filter drop-shadow-md">{m.icon}</span>
                <div className="flex flex-col gap-1.5">
                  <span className="font-black text-white text-base md:text-lg tracking-tight">{m.title}</span>
                  <span className="text-white/60 text-xs md:text-sm font-medium leading-relaxed mt-1">{m.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lado Direito: Entrada e Login */}
        <section className="lg:col-span-5 w-full">
          <div className="w-full bg-black/35 rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-8 border border-white/20 shadow-2xl backdrop-blur-md">
            <div className="text-center">
              <span className="bg-emerald-400 text-slate-950 font-black text-xs tracking-widest uppercase rounded-full px-4 py-1.5 inline-block mb-3 shadow-md">
                {lang === "pt" ? "PRONTO PARA JOGAR" : "READY TO LOG IN"}
              </span>
              <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight">
                {lang === "pt" ? "Painel do Jogador" : "Player Portal"}
              </h3>
            </div>

            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleStart()}
              placeholder={lang === "pt" ? "Nome do Jogador..." : "Player Name..."}
              maxLength={16}
              className="w-full bg-black/60 text-white placeholder-white/30 font-bold rounded-2xl px-5 py-5 text-center border border-white/10 focus:border-emerald-400 focus:outline-none transition-all text-base md:text-lg shadow-inner"
              data-testid="input-player-name"
            />

            <motion.button
              onClick={handleStart}
              disabled={!canPlay}
              whileHover={canPlay ? { scale: 1.02 } : {}}
              whileTap={canPlay ? { scale: 0.98 } : {}}
              className="w-full rounded-2xl font-black text-white uppercase tracking-wider transition-all py-5 text-base md:text-lg shadow-2xl cursor-pointer"
              style={{
                background: canPlay
                  ? "linear-gradient(135deg, #10b981 0%, #059669 50%, #0284c7 100%)"
                  : "rgba(255,255,255,0.05)",
              }}
              data-testid="button-start-game"
            >
              {canPlay 
                ? (lang === "pt" ? "🎮 Jogar ➔" : "🎮 Play ➔") 
                : (lang === "pt" ? "Insira o seu Nome" : "Enter your Name")
              }
            </motion.button>
          </div>
        </section>
      </main>

      {/* ── ECO-NEWS: MARQUEE/CAROUSEL INFINITO INTEGRADO ── */}
      <section className="w-full z-10 border-t border-white/10 pt-14 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 px-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl filter drop-shadow-sm">🇲🇿</span>
            <h3 className="text-emerald-400 font-black text-sm md:text-lg uppercase tracking-widest text-center sm:text-left">
              {lang === "pt" ? "Notícias Reais: Evidências Ambientais em Moçambique" : "Real News: Environmental Evidence in Mozambique"}
            </h3>
          </div>
          {/* Indicador visual de gesto para Mobile */}
          <span className="text-white/40 font-bold text-xs bg-white/5 px-3 py-1 rounded-full block md:hidden animate-pulse">
            {lang === "pt" ? "← Deslize para ver mais →" : "← Swipe to view more →"}
          </span>
        </div>

        {/* Container Global do Slider */}
        <div 
          className="w-full overflow-x-auto md:overflow-x-hidden pb-4 custom-scrollbar"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* No Desktop vira uma Track de movimento infinito; no Mobile é um scroll por toque flexível */}
          <motion.div 
            className="flex gap-6 w-max px-4 md:px-0"
            animate={typeof window !== "undefined" && window.innerWidth >= 768 ? {
              x: isHovered ? undefined : ["0%", "-50%"]
            } : {}}
            transition={{
              ease: "linear",
              duration: 32,
              repeat: Infinity
            }}
          >
            {tickerPosts.map((post, idx) => (
              <a 
                key={idx}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[85vw] sm:w-[380px] md:w-[420px] bg-black/40 border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-emerald-400/60 transition-all cursor-pointer select-none"
              >
                {/* Imagem maior e mais alta (h-60) estilo Canva/Pinterest com Zoom suave */}
                <div className="w-full h-56 md:h-60 overflow-hidden relative">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${post.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                  <span className="absolute top-4 left-4 bg-slate-950/90 font-black text-[10px] md:text-xs tracking-wider px-3 py-1.5 rounded-lg text-white border border-white/10">
                    {post.tag}
                  </span>
                </div>

                {/* Bloco de texto otimizado para fácil leitura */}
                <div className="p-6 flex flex-col gap-5 justify-between flex-grow">
                  <h4 className="text-white font-bold text-base md:text-lg tracking-tight leading-snug line-clamp-3 group-hover:text-emerald-300 transition-colors">
                    {post.title}
                  </h4>
                  
                  <span className="text-emerald-400 font-black text-xs md:text-sm uppercase tracking-wider flex items-center gap-1.5 mt-auto pt-3">
                    {lang === "pt" ? "Ler artigo oficial ➔" : "Read official article ➔"}
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RODAPÉ CONTEXTUAL AREJADO ── */}
      <footer className="w-full text-center z-10 pt-6 pb-safe relative">
        <p className="text-white/30 italic text-xs max-w-xl mx-auto px-6 leading-relaxed">
          {t.quote}
        </p>
      </footer>

      {/* Utilitários CSS injetados para ocultação de scrollbar e refinamento nativo */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}