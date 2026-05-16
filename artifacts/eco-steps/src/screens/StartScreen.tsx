import { motion } from "framer-motion";
import { useState } from "react";
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
      title: "Maputo lança concurso de $10M para encerramento da Lixeira de Hulene",
      tag: "♻️ RESÍDUOS",
      img: "https://images.unsplash.com/photo-1562071707-7249ab429b2a?auto=format&fit=crop&w=800&q=80",
      url: "https://www.diarioeconomico.co.mz/2025/01/21/desenvolvimento-2/maputo-municipio-lanca-concurso-de-10-m-para-encerramento-da-lixeira-de-hulene/"
    },
    {
      title: "FUNAE avança com eletrificação solar de 151 localidades em Nampula",
      tag: "⚡ ENERGIA SOLAR",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      url: "https://mznews.co.mz/funae-preve-electrificar-151-localidades-com-energia-solar-em-nampula/"
    },
    {
      title: "Governo e INGD ativam Plano de Contingência contra eventos extremos",
      tag: "💧 RECURSOS HÍDRICOS",
      img: "https://images.unsplash.com/photo-1613446409605-be1fcffb8ff4?auto=format&fit=crop&w=800&q=80",
      url: "https://ingd.gov.mz/wp-content/uploads/2025/10/PC-2025-26-CM.pdf"
    },
    {
      title: "BIOFUND investe na conservação e restauração de mangais na Costa Moçambicana",
      tag: "🌿 BIODIVERSIDADE",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      url: "https://www.biofund.org.mz/projects/restauracao-de-mangais/"
    },
    {
      title: "Projecto MozParks impulsiona eco-parques industriais sustentáveis",
      tag: "🏭 INDÚSTRIA VERDE",
      img: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80",
      url: "https://mozparks.co.mz/"
    }
  ],
  en: [
    {
      title: "Maputo launches $10M international tender to close Hulene landfill",
      tag: "♻️ WASTE",
      img: "https://images.unsplash.com/photo-1562071707-7249ab429b2a?auto=format&fit=crop&w=800&q=80",
      url: "https://www.diarioeconomico.co.mz/2025/01/21/desenvolvimento-2/maputo-municipio-lanca-concurso-de-10-m-para-encerramento-da-lixeira-de-hulene/"
    },
    {
      title: "FUNAE accelerates off-grid solar infrastructure across 151 rural zones",
      tag: "⚡ RENEWABLE ENERGY",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      url: "https://mznews.co.mz/funae-preve-electrificar-151-localidades-com-energia-solar-em-nampula/"
    },
    {
      title: "INGD triggers Climate Contingency Plan for water management and safety",
      tag: "💧 CLIMATE ACTION",
      img: "https://images.unsplash.com/photo-1613446409605-be1fcffb8ff4?auto=format&fit=crop&w=800&q=80",
      url: "https://ingd.gov.mz/wp-content/uploads/2025/10/PC-2025-26-CM.pdf"
    },
    {
      title: "BIOFUND invests in mangrove restoration and protection along Mozambican Coast",
      tag: "🌿 BIODIVERSIDADE",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      url: "https://www.biofund.org.mz/en/projects/mangrove-restoration/"
    },
    {
      title: "MozParks Project drives eco-friendly development in green industrial parks",
      tag: "🏭 GREEN INDUSTRY",
      img: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80",
      url: "https://mozparks.co.mz/"
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
      className="w-full min-h-screen relative overflow-x-hidden overflow-y-auto px-4 py-8 md:px-12 md:py-12 select-none bg-slate-950 flex flex-col gap-10 md:gap-16"
      // RESOLVIDO ts(2552): Chaves customizadas de CSS devem ser declaradas como string literal
      style={{ 
        fontFamily: "Outfit, sans-serif", 
        ["WebkitOverflowScrolling" as any]: "touch" 
      }}
    >
      {/* ── GRADIENTE DE FUNDO SUAVE ── */}
      <div 
        className="absolute inset-0 z-0 bg-emerald-950 pointer-events-none"
        style={{
          background: "linear-gradient(145deg, #022c22 0%, #064e3b 25%, #0d9488 60%, #0284c7 100%)",
        }} 
      />

      {/* Partículas flutuantes discretas */}
      {PARTICLES.map((p, i) => (
        <motion.div 
          key={i}
          className="absolute pointer-events-none z-0 will-change-transform text-2xl opacity-10"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          // RESOLVIDO ts(2695): Strings evitam o falso positivo do operador de vírgula no compilador JSX
          animate={{ y: ["-8px", "8px", "-8px"] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
        >
          {p.e}
        </motion.div>
      ))}

      {/* ── TOPO: CABEÇALHO DO JOGO ── */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center z-10 pt-safe relative">
        <div>
          <h1 className="font-black text-white text-3xl md:text-5xl tracking-tight drop-shadow-md">
            EcoSteps
          </h1>
          <p className="text-emerald-300 font-extrabold text-[10px] md:text-sm uppercase tracking-widest mt-1">
            {lang === "pt" ? "🕹️ Jogo de Estratégia Sustentável" : "🕹️ Sustainable Strategy Game"}
          </p>
        </div>

        <div className="bg-black/30 p-1.5 rounded-full flex gap-1 border border-white/10 shadow-xl backdrop-blur-md">
          {(["pt", "en"] as Lang[]).map(l => (
            <button 
              key={l} 
              onClick={() => setLang(l)}
              className={`px-4 py-1.5 rounded-full font-black text-xs md:text-sm transition-all cursor-pointer ${
                lang === l ? "bg-white text-emerald-950 shadow-md" : "text-white/70 hover:text-white"
              }`}
            >
              {l === "pt" ? "🇲🇿 PT" : "🇬🇧 EN"}
            </button>
          ))}
        </div>
      </header>

      {/* ── CENTRO: PAINEL DE JOGO DE ALTO IMPACTO ── */}
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 z-10 relative items-start">
        
        {/* Lado Esquerdo: Detalhes da Simulação */}
        <section className="lg:col-span-7 flex flex-col gap-6 md:gap-8 w-full">
          <div className="bg-black/20 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-lg">
            <h2 className="text-white font-black text-lg md:text-2xl uppercase tracking-wider flex items-center gap-2.5">
              <span>🎮</span> {lang === "pt" ? "A Simulação Interativa" : "The Interactive Simulation"}
            </h2>
            <p className="text-white/90 text-sm md:text-base mt-3 font-medium leading-relaxed">
              {lang === "pt" 
                ? "Assume o controlo dos resources naturais, toma decisões estratégicas em tempo real e evolui a tua comunidade rumo à sustentabilidade absoluta."
                : "Take absolute control over natural resources, execute real-time strategic decisions, and evolve your community toward total sustainability."}
            </p>
          </div>

          {/* Missões do Jogo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {t.missions.map((m, i) => (
              <div 
                key={`${lang}-${i}`}
                className="rounded-2xl p-6 flex flex-col items-center text-center border border-white/10 bg-black/20 shadow-lg backdrop-blur-sm"
              >
                <span className="text-4xl mb-3 block filter drop-shadow-md">{m.icon}</span>
                <div className="flex flex-col gap-1">
                  <span className="font-black text-white text-base tracking-tight">{m.title}</span>
                  <span className="text-white/60 text-xs font-medium leading-snug mt-1">{m.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lado Direito: Entrada do Jogador */}
        <section className="lg:col-span-5 w-full">
          <div className="w-full bg-black/30 rounded-[2rem] p-6 md:p-8 flex flex-col gap-6 border border-white/20 shadow-2xl backdrop-blur-md">
            <div className="text-center">
              <span className="bg-emerald-400 text-slate-950 font-black text-[10px] tracking-widest uppercase rounded-full px-3 py-1 inline-block mb-2 shadow-sm">
                {lang === "pt" ? "PRONTO PARA JOGAR" : "READY TO LOG IN"}
              </span>
              <h3 className="text-white font-black text-xl md:text-2xl tracking-tight">
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
              className="w-full bg-black/50 text-white placeholder-white/30 font-bold rounded-xl px-4 py-4 text-center border border-white/10 focus:border-emerald-400 focus:outline-none transition-all text-sm md:text-base shadow-inner"
              data-testid="input-player-name"
            />

            <motion.button
              onClick={handleStart}
              disabled={!canPlay}
              whileHover={canPlay ? { scale: 1.01 } : {}}
              whileTap={canPlay ? { scale: 0.99 } : {}}
              className="w-full rounded-xl font-black text-white uppercase tracking-wider transition-all py-4 text-sm md:text-base shadow-lg cursor-pointer"
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

      {/* ── ECO-BLOG ESTILO PINTEREST/CANVA ── */}
      <section className="w-full max-w-6xl mx-auto z-10 border-t border-white/10 pt-10 relative">
        <div className="flex items-center gap-2.5 justify-center lg:justify-start mb-8">
          <span className="text-xl">🇲🇿</span>
          <h3 className="text-emerald-400 font-black text-xs md:text-base uppercase tracking-widest">
            {lang === "pt" ? "Contexto Real: Evidências Ambientais em Moçambique" : "Real Context: Environmental Evidence in Mozambique"}
          </h3>
        </div>

        <div className="flex overflow-x-auto pb-6 px-1 gap-6 md:grid md:grid-cols-3 lg:grid-cols-3 w-full snap-x snap-mandatory scrollbar-none style-scroll">
          {MOZ_BLOG_POSTS[lang].map((post, idx) => (
            <a 
              key={idx}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-emerald-400/50 transition-all cursor-pointer snap-start"
            >
              <div className="w-full h-52 md:h-56 overflow-hidden relative">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${post.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                <span className="absolute top-3 left-3 bg-slate-950/90 font-black text-[9px] md:text-[10px] tracking-wider px-2.5 py-1 rounded-md text-white border border-white/10">
                  {post.tag}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-4 justify-between flex-grow">
                <h4 className="text-white font-bold text-sm md:text-base tracking-tight leading-snug line-clamp-3 group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h4>
                
                <span className="text-emerald-400 font-black text-xs uppercase tracking-wider flex items-center gap-1 mt-auto pt-2">
                  {lang === "pt" ? "Ler notícia completa ➔" : "Read full article ➔"}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── RODAPÉ CONTEXTUAL ── */}
      <footer className="w-full text-center z-10 pt-4 pb-safe relative">
        <p className="text-white/30 italic text-[10px] md:text-xs max-w-md mx-auto px-4">
          {t.quote}
        </p>
      </footer>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}