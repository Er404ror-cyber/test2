import { useState } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Props {
  onStart: (name: string, lang: Lang) => void;
}

const PARTICLES = [
  { e: "💡", x: 6,  y: 8 },
  { e: "🌿", x: 92, y: 12 },
  { e: "♻️", x: 8,  y: 75 },
  { e: "💧", x: 88, y: 70 },
];

const MOZ_BLOG_POSTS = {
  pt: [
    {
      title: "Maputo lança concurso de $10M para encerramento da Lixeira de Hulene",
      tag: "♻️ RESÍDUOS",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80",
      url: "https://www.diarioeconomico.co.mz/"
    },
    {
      title: "FUNAE avança com eletrificação solar de 151 localidades em Nampula",
      tag: "⚡ ENERGIA SOLAR",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80",
      url: "https://opais.co.mz/"
    },
    {
      title: "BIOFUND investe na conservação e restauração de mangais na Costa",
      tag: "🌿 BIODIVERSIDADE",
      img: "https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&w=400&q=80",
      url: "https://www.biofund.org.mz/projects/restauracao-de-mangais/"
    }
  ],
  en: [
    {
      title: "Maputo launches $10M international tender to close Hulene landfill",
      tag: "♻️ WASTE",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80",
      url: "https://www.diarioeconomico.co.mz/"
    },
    {
      title: "FUNAE accelerates off-grid solar infrastructure across 151 zones",
      tag: "⚡ RENEWABLE",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80",
      url: "https://opais.co.mz/"
    },
    {
      title: "BIOFUND invests in mangrove restoration along Mozambican Coast",
      tag: "🌿 BIODIVERSITY",
      img: "https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&w=400&q=80",
      url: "https://www.biofund.org.mz/en/projects/mangrove-restoration/"
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

  // Triplicamos os itens para garantir preenchimento infinito contínuo sem saltos visuais
  const tickerPosts = [
    ...MOZ_BLOG_POSTS[lang], 
    ...MOZ_BLOG_POSTS[lang], 
    ...MOZ_BLOG_POSTS[lang]
  ];

  return (
    <div
      className="w-full min-h-screen relative overflow-x-hidden overflow-y-auto px-4 py-6 md:px-12 md:py-10 select-none bg-slate-950 flex flex-col justify-between gap-6 md:gap-10"
      style={{ 
        fontFamily: "Outfit, sans-serif", 
        ["WebkitOverflowScrolling" as any]: "touch" 
      }}
    >
      {/* ── FUNDO COM ACELERAÇÃO DE HARDWARE ── */}
      <div 
        className="absolute inset-0 z-0 bg-emerald-950 pointer-events-none will-change-transform"
        style={{
          background: "linear-gradient(135deg, #022c22 0%, #064e3b 40%, #0b6656 100%)",
        }} 
      />

      {/* Partículas estáticas leves para poupar CPU/GPU */}
      {PARTICLES.map((p, i) => (
        <div 
          key={i}
          className="absolute pointer-events-none z-0 text-lg opacity-10"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          {p.e}
        </div>
      ))}

      {/* ── CABEÇALHO COMPACTO PREMIUM ── */}
      <header className="w-full max-w-5xl mx-auto flex justify-between items-center z-10 pt-safe relative">
        <div>
          <h1 className="font-black text-white text-xl md:text-3xl tracking-tight">
            EcoSteps
          </h1>
          <p className="text-emerald-400 font-bold text-[9px] md:text-xs uppercase tracking-widest mt-0.5">
            {lang === "pt" ? "🕹️ Estratégia Sustentável" : "🕹️ Sustainable Strategy"}
          </p>
        </div>

        <div className="bg-black/40 p-1 rounded-full flex gap-1 border border-white/10 backdrop-blur-md">
          {(["pt", "en"] as Lang[]).map(l => (
            <button 
              key={l} 
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-full font-black text-[11px] md:text-xs transition-all cursor-pointer ${
                lang === l ? "bg-white text-slate-950 shadow-sm" : "text-white/60 hover:text-white"
              }`}
            >
              {l === "pt" ? "🇲🇿 PT" : "🇬🇧 EN"}
            </button>
          ))}
        </div>
      </header>

      {/* ── LAYOUT CENTRAL ULTRA COMPACTADO ── */}
      <main className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 z-10 relative items-stretch">
        
        {/* Painel Informativo Esquerdo */}
        <section className="lg:col-span-7 flex flex-col gap-4 justify-between w-full">
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4 md:p-5 backdrop-blur-md">
            <h2 className="text-white font-black text-sm md:text-lg uppercase tracking-wider flex items-center gap-2">
              <span>🎮</span> {lang === "pt" ? "A Simulação" : "The Simulation"}
            </h2>
            <p className="text-white/80 text-[12px] md:text-sm mt-1.5 font-medium leading-relaxed">
              {lang === "pt" 
                ? "Gere recursos, toma decisões ecológicas em tempo real e lidera a tua comunidade rumo à sustentabilidade absoluta."
                : "Manage resources, execute green decisions in real-time, and guide your community toward total sustainability."}
            </p>
          </div>

          {/* MISSÕES CELULAR: Super pequenas, lado a lado sem desperdício */}
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {t.missions.map((m, i) => (
              <div 
                key={`${lang}-${i}`}
                className="rounded-xl p-2.5 md:p-4 flex flex-col items-center text-center border border-white/5 bg-black/20 backdrop-blur-xs justify-center"
              >
                <span className="text-2xl md:text-3xl mb-1 filter drop-shadow-sm">{m.icon}</span>
                <div className="flex flex-col">
                  <span className="font-black text-white text-[11px] md:text-sm tracking-tight truncate max-w-full">
                    {m.title}
                  </span>
                  <span className="text-white/50 text-[9px] md:text-xs font-medium leading-tight mt-0.5 hidden sm:block">
                    {m.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Caixa de Entrada Direta (Card Pro) */}
        <section className="lg:col-span-5 w-full flex">
          <div className="w-full bg-black/40 rounded-2xl p-5 flex flex-col justify-center gap-4 border border-white/10 shadow-xl backdrop-blur-md">
            <div className="text-center">
              <span className="bg-emerald-400 text-slate-950 font-black text-[9px] tracking-widest uppercase rounded px-2 py-0.5 inline-block mb-1 shadow-sm">
                {lang === "pt" ? "LOGIN" : "PLAY"}
              </span>
              <h3 className="text-white font-black text-base md:text-lg tracking-tight">
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
              className="w-full bg-black/50 text-white placeholder-white/20 font-bold rounded-xl px-4 py-3 text-center border border-white/10 focus:border-emerald-400 focus:outline-none transition-all text-xs md:text-sm shadow-inner"
              data-testid="input-player-name"
            />

            <button
              onClick={handleStart}
              disabled={!canPlay}
              className="w-full rounded-xl font-black text-white uppercase tracking-wider transition-all py-3 text-xs md:text-sm shadow-md cursor-pointer active:scale-98 disabled:opacity-40"
              style={{
                background: canPlay
                  ? "linear-gradient(135deg, #10b981 0%, #0284c7 100%)"
                  : "rgba(255,255,255,0.05)",
              }}
              data-testid="button-start-game"
            >
              {canPlay 
                ? (lang === "pt" ? "Jogar ➔" : "Play ➔") 
                : (lang === "pt" ? "Insira o seu Nome" : "Enter your Name")
              }
            </button>
          </div>
        </section>
      </main>

      {/* ── NOTÍCIAS REAL-TIME: MOTOR CSS INFINITO DE ULTRA PERFORMANCE ── */}
      <section className="w-full max-w-5xl mx-auto z-10 border-t border-white/10 pt-4 relative overflow-hidden">
        <div className="flex items-center gap-1.5 mb-2.5 px-1">
          <span className="text-xs">🇲🇿</span>
          <h3 className="text-emerald-400 font-black text-[10px] md:text-xs uppercase tracking-widest">
            {lang === "pt" ? "Evidências Ambientais em Moçambique" : "Environmental Evidence in Mozambique"}
          </h3>
        </div>

        {/* Marquee Nativo CSS Puro - Renderizado via GPU */}
        <div className="w-full overflow-hidden relative marquee-container masking-edges">
          <div className="flex gap-4 marquee-track">
            {tickerPosts.map((post, idx) => (
              <a 
                key={idx}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[230px] md:w-[280px] shrink-0 bg-black/40 border border-white/5 rounded-xl overflow-hidden flex flex-col group hover:border-emerald-400/40 transition-colors"
              >
                {/* Imagem Otimizada */}
                <div className="w-full h-24 md:h-28 overflow-hidden relative">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <span className="absolute top-2 left-2 bg-slate-950/80 font-black text-[8px] tracking-wider px-1.5 py-0.5 rounded text-white">
                    {post.tag}
                  </span>
                </div>

                {/* Bloco de Texto Ultra Compacto */}
                <div className="p-3 flex flex-col justify-between flex-grow gap-2">
                  <h4 className="text-white font-bold text-[11px] md:text-xs tracking-tight leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors">
                    {post.title}
                  </h4>
                  <span className="text-emerald-400 font-black text-[9px] uppercase tracking-wider">
                    {lang === "pt" ? "Ver mais ➔" : "Read more ➔"}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── RODAPÉ DISCRETO ── */}
      <footer className="w-full text-center z-10 pt-1 relative">
        <p className="text-white/20 italic text-[9px] md:text-xs max-w-md mx-auto px-4">
          {t.quote}
        </p>
      </footer>

      {/* Estilos CSS Nativos injetados para animação via GPU perfeita sem JS */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        .marquee-container {
          display: flex;
          width: 100%;
        }
        .marquee-track {
          display: flex;
          animation: marquee 20s linear infinite;
          will-change: transform;
        }
        /* Pausa suave ao passar o mouse apenas no Desktop para melhor UX */
        @media (min-width: 768px) {
          .marquee-container:hover .marquee-track {
            animation-play-state: paused;
          }
        }
        /* Máscara suave desvanecendo as bordas laterais do carrossel */
        .masking-edges {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        }
      `}</style>
    </div>
  );
}