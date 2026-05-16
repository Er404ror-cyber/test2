import { motion, useAnimationControls } from "framer-motion";
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
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80",
      url: "https://www.diarioeconomico.co.mz/"
    },
    {
      title: "FUNAE avança com eletrificação solar de 151 localidades em Nampula",
      tag: "⚡ ENERGIA SOLAR",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80",
      url: "https://opais.co.mz/"
    },
    {
      title: "BIOFUND investe na conservação e restauração de mangais na Costa",
      tag: "🌿 BIODIVERSIDADE",
      img: "https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&w=600&q=80",
      url: "https://www.biofund.org.mz/projects/restauracao-de-mangais/"
    }
  ],
  en: [
    {
      title: "Maputo launches $10M international tender to close Hulene landfill",
      tag: "♻️ WASTE",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80",
      url: "https://www.diarioeconomico.co.mz/"
    },
    {
      title: "FUNAE accelerates off-grid solar infrastructure across 151 zones",
      tag: "⚡ RENEWABLE ENERGY",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80",
      url: "https://opais.co.mz/"
    },
    {
      title: "BIOFUND invests in mangrove restoration along Mozambican Coast",
      tag: "🌿 BIODIVERSITY",
      img: "https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&w=600&q=80",
      url: "https://www.biofund.org.mz/en/projects/mangrove-restoration/"
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

  // Duplicamos os posts para garantir o efeito infinito fluido no desktop
  const tickerPosts = [...MOZ_BLOG_POSTS[lang], ...MOZ_BLOG_POSTS[lang]];

  return (
    <div
      className="w-full min-h-screen relative overflow-x-hidden overflow-y-auto px-4 py-8 md:px-12 md:py-10 select-none bg-slate-950 flex flex-col gap-8 md:gap-12"
      style={{ 
        fontFamily: "Outfit, sans-serif", 
        ["WebkitOverflowScrolling" as any]: "touch" 
      }}
    >
      {/* ── FUNDO GRADIENTE SUAVE ── */}
      <div 
        className="absolute inset-0 z-0 bg-emerald-950 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #022c22 0%, #064e3b 30%, #0d9488 70%, #0284c7 100%)",
        }} 
      />

      {/* Partículas flutuantes discretas */}
      {PARTICLES.map((p, i) => (
        <motion.div 
          key={i}
          className="absolute pointer-events-none z-0 will-change-transform text-xl opacity-10"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: ["-6px", "6px", "-6px"] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
        >
          {p.e}
        </motion.div>
      ))}

      {/* ── CABEÇALHO COMPACTO ── */}
      <header className="w-full max-w-5xl mx-auto flex justify-between items-center z-10 pt-safe relative">
        <div>
          <h1 className="font-black text-white text-2xl md:text-4xl tracking-tight drop-shadow-sm">
            EcoSteps
          </h1>
          <p className="text-emerald-300 font-bold text-[10px] md:text-xs uppercase tracking-widest mt-0.5">
            {lang === "pt" ? "🕹️ Jogo de Estratégia Sustentável" : "🕹️ Sustainable Strategy Game"}
          </p>
        </div>

        <div className="bg-black/30 p-1 rounded-full flex gap-1 border border-white/10 shadow-lg backdrop-blur-md">
          {(["pt", "en"] as Lang[]).map(l => (
            <button 
              key={l} 
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-full font-black text-xs transition-all cursor-pointer ${
                lang === l ? "bg-white text-emerald-950 shadow-sm" : "text-white/70 hover:text-white"
              }`}
            >
              {l === "pt" ? "🇲🇿 PT" : "🇬🇧 EN"}
            </button>
          ))}
        </div>
      </header>

      {/* ── LAYOUT CENTRAL COMPACTO ── */}
      <main className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 z-10 relative items-start">
        
        {/* Painel Informativo Esquerdo */}
        <section className="lg:col-span-7 flex flex-col gap-5 w-full">
          <div className="bg-black/20 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-md shadow-md">
            <h2 className="text-white font-black text-base md:text-xl uppercase tracking-wider flex items-center gap-2">
              <span>🎮</span> {lang === "pt" ? "A Simulação Interativa" : "The Interactive Simulation"}
            </h2>
            <p className="text-white/80 text-xs md:text-sm mt-2 font-medium leading-relaxed">
              {lang === "pt" 
                ? "Assume o controlo dos recursos naturais, toma decisões estratégicas em tempo real e evolui a tua comunidade rumo à sustentabilidade absoluta."
                : "Take absolute control over natural resources, execute real-time strategic decisions, and evolve your community toward total sustainability."}
            </p>
          </div>

          {/* Grid de Missões (Canva Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {t.missions.map((m, i) => (
              <div 
                key={`${lang}-${i}`}
                className="rounded-2xl p-4 md:p-5 flex flex-col items-center text-center border border-white/10 bg-black/20 shadow-md backdrop-blur-sm"
              >
                <span className="text-3xl mb-2 block filter drop-shadow-sm">{m.icon}</span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-black text-white text-sm md:text-base tracking-tight">{m.title}</span>
                  <span className="text-white/60 text-[11px] md:text-xs font-medium leading-snug mt-0.5">{m.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Caixa de Entrada Direita (Card Compacto) */}
        <section className="lg:col-span-5 w-full">
          <div className="w-full bg-black/30 rounded-[1.5rem] p-5 md:p-6 flex flex-col gap-4 border border-white/15 shadow-xl backdrop-blur-md">
            <div className="text-center">
              <span className="bg-emerald-400 text-slate-950 font-black text-[9px] tracking-widest uppercase rounded-full px-2.5 py-0.5 inline-block mb-1.5 shadow-sm">
                {lang === "pt" ? "PRONTO PARA JOGAR" : "READY TO LOG IN"}
              </span>
              <h3 className="text-white font-black text-lg md:text-xl tracking-tight">
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
              className="w-full bg-black/50 text-white placeholder-white/30 font-bold rounded-xl px-4 py-3 text-center border border-white/10 focus:border-emerald-400 focus:outline-none transition-all text-xs md:text-sm shadow-inner"
              data-testid="input-player-name"
            />

            <motion.button
              onClick={handleStart}
              disabled={!canPlay}
              whileHover={canPlay ? { scale: 1.01 } : {}}
              whileTap={canPlay ? { scale: 0.99 } : {}}
              className="w-full rounded-xl font-black text-white uppercase tracking-wider transition-all py-3.5 text-xs md:text-sm shadow-lg cursor-pointer"
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

      {/* ── NOTÍCIAS COMPACTAS (NEWS TICKER INFINITO) ── */}
      <section className="w-full max-w-5xl mx-auto z-10 border-t border-white/10 pt-6 relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="text-sm">🇲🇿</span>
            <h3 className="text-emerald-400 font-black text-[11px] md:text-xs uppercase tracking-widest">
              {lang === "pt" ? "Evidências Ambientais em Moçambique" : "Environmental Evidence in Mozambique"}
            </h3>
          </div>
          <span className="text-white/30 font-medium text-[10px] md:hidden block animate-pulse">
            {lang === "pt" ? "← Arraste →" : "← Swipe →"}
          </span>
        </div>

        {/* Slider Responsivo com pausa onHover */}
        <div 
          className="w-full overflow-x-auto md:overflow-x-hidden pb-2 custom-scrollbar-clean"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            className="flex gap-4 w-max"
            animate={typeof window !== "undefined" && window.innerWidth >= 768 ? {
              x: isHovered ? undefined : ["0%", "-50%"]
            } : {}}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity
            }}
          >
            {tickerPosts.map((post, idx) => (
              <a 
                key={idx}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[75vw] sm:w-[280px] md:w-[310px] bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-md flex flex-col justify-between group hover:border-emerald-400/40 transition-all cursor-pointer"
              >
                {/* Imagem Proporcional e Limpa */}
                <div className="w-full h-36 md:h-40 overflow-hidden relative">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-103"
                    style={{ backgroundImage: `url(${post.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                  <span className="absolute top-2.5 left-2.5 bg-slate-950/90 font-black text-[8px] md:text-[9px] tracking-wider px-2 py-0.5 rounded text-white border border-white/5">
                    {post.tag}
                  </span>
                </div>

                {/* Texto Compacto e de Alta Leitura */}
                <div className="p-4 flex flex-col gap-3 justify-between flex-grow">
                  <h4 className="text-white font-bold text-xs md:text-sm tracking-tight leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors">
                    {post.title}
                  </h4>
                  <span className="text-emerald-400 font-black text-[10px] uppercase tracking-wider flex items-center gap-1 mt-auto">
                    {lang === "pt" ? "Ler notícia ➔" : "Read news ➔"}
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RODAPÉ DISCRETO ── */}
      <footer className="w-full text-center z-10 pt-2 pb-safe relative">
        <p className="text-white/20 italic text-[10px] md:text-xs max-w-md mx-auto px-4">
          {t.quote}
        </p>
      </footer>

      <style>{`
        .custom-scrollbar-clean::-webkit-scrollbar { display: none; }
        .custom-scrollbar-clean { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}