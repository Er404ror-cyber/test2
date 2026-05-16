import { motion, AnimatePresence } from "framer-motion";
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

// Base de Dados do Eco-Blog de Moçambique (Contexto Real 2026)
const MOZ_BLOG_POSTS = {
  pt: [
    {
      title: "Crise de Resíduos Urbanos e Modernização em Maputo (2026)",
      subtitle: "Avanços no encerramento da Lixeira de Hulene e novas redes de triagem de plástico.",
      problem: "Problema: O crescimento urbano acelerado gerou lixeiras saturadas a céu aberto, causando contaminação de solos e riscos graves à saúde pública.",
      gameConnection: "O que o jogo ensina: Coleta seletiva e posicionamento correto de contentores ecológicos para reciclagem massiva.",
      tag: "♻️ GESTÃO DE LIXO",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=85",
      url: "https://www.asome.org/" // Associação Moçambicana de Reciclagem / Portais de Gestão Ambiental
    },
    {
      title: "Expansão Histórica de Mini-Redes Solares pelo FUNAE (2026)",
      subtitle: "Central Solar de Metoro e novos sistemas fotovoltaicos isolados eletrificam o norte.",
      problem: "Problema: Dependência histórica de geradores a gasóleo poluentes, barulhentos e de alto custo para as comunidades rurais.",
      gameConnection: "O que o jogo ensina: Substituição de matrizes fósseis por energia solar limpa para abastecer distritos com consumo zero de carbono.",
      tag: "⚡ POUPAR ENERGIA",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=85",
      url: "https://www.funae.co.mz/" // FUNAE - Fundo de Energia de Moçambique
    },
    {
      title: "Plano Diretor de Água e Mitigação de Secas no Sul (2026)",
      subtitle: "ARA-Sul coordena barragens inteligentes e distribuição eficiente no Rio Umbelúzi.",
      problem: "Problema: Secas extremas severas e prolongadas inviabilizam a agricultura familiar e ameaçam o fornecimento hídrico básico.",
      gameConnection: "O que o jogo ensina: Gestão de bacias, captação pluvial avançada e irrigação gota-a-gota sem desperdício.",
      tag: "💧 POUPAR ÁGUA",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=85",
      url: "https://www.ara-sul.co.mz/" // ARA-Sul - Administração Regional de Águas do Sul
    }
  ],
  en: [
    {
      title: "Urban Waste Crisis & Modernization in Maputo (2026)",
      subtitle: "Progress on Hulene dumpsite closure and local plastic sorting infrastructure.",
      problem: "Problem: Rapid urban growth created saturated open-air dumps, causing severe soil contamination and health hazards.",
      gameConnection: "What the game teaches: Selective waste collection and strategic placement of eco-friendly recycling bins.",
      tag: "♻️ WASTE MANAGEMENT",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=85",
      url: "https://www.asome.org/"
    },
    {
      title: "FUNAE's Historic Expansion of Off-Grid Solar Networks (2026)",
      subtitle: "Metoro Solar Plant and new local grids power up northern Mozambique.",
      problem: "Problem: Historic reliance on noisy, high-cost, and heavily polluting diesel generators in rural communities.",
      gameConnection: "What the game teaches: Replacing obsolete fossil generators with clean solar fields to run zero-carbon districts.",
      tag: "⚡ SAVE ENERGY",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=85",
      url: "https://www.funae.co.mz/"
    },
    {
      title: "Water Master Plan & Drought Mitigation in the South (2026)",
      subtitle: "ARA-Sul coordinates smart dams and efficient distribution along the Umbeluzi River.",
      problem: "Problem: Prolonged and severe droughts threaten family agriculture and compromise basic freshwater supplies.",
      gameConnection: "What the game teaches: Catchment management, advanced rainwater harvesting, and waste-free drip irrigation.",
      tag: "💧 SAVE WATER",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=85",
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
      {/* ── SEU GRADIENTE ORIGINAL DE ALTA PERFORMANCE CONTRA TRAVAMENTOS ── */}
      <div className="absolute inset-0 z-0 bg-emerald-900"
        style={{
          background: "linear-gradient(145deg, #064e3b 0%, #065f46 20%, #0f766e 45%, #0369a1 75%, #1d4ed8 100%)",
        }} />

      {/* Raios de iluminação otimizados nativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
        {[25, 55, 85].map((x, i) => (
          <div key={i} className="absolute top-0 bottom-0"
            style={{
              left: `${x}%`,
              width: "80px",
              background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
              transform: "skewX(-15deg)",
            }} />
        ))}
      </div>

      {/* Partículas de CPU estável */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none z-0 will-change-transform text-xl opacity-15"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}>
          {p.e}
        </motion.div>
      ))}

      {/* ── TOPO: Cabeçalho do Jogo ── */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center z-10 mb-6 pt-safe">
        <div>
          <h1 className="font-black text-white text-3xl md:text-4xl tracking-tight drop-shadow-md">
            EcoSteps
          </h1>
          <p className="text-emerald-300 font-extrabold text-[10px] md:text-xs uppercase tracking-widest mt-0.5">
            {lang === "pt" ? "🕹️ Jogo de Estratégia Sustentável" : "🕹️ Sustainable Strategy Game"}
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

      {/* ── CENTRO: ÁREA DE FOCO PRINCIPAL (RÁPIDO, LIMPO E SEM DISTRAÇÃO) ── */}
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto z-10 items-stretch">
        
        {/* Lado Esquerdo: Conceito do Jogo */}
        <section className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="bg-black/20 border border-white/10 rounded-2xl p-4 md:p-5">
            <h2 className="text-white font-black text-base md:text-lg uppercase tracking-wider flex items-center gap-2">
              <span>🎮</span> {lang === "pt" ? "A Simulação Interativa" : "The Interactive Simulation"}
            </h2>
            <p className="text-white/80 text-xs md:text-sm mt-1 font-medium leading-relaxed">
              {lang === "pt" 
                ? "Assume o controlo dos recursos naturais, toma decisões estratégicas em tempo real e evolui a tua comunidade rumo à sustentabilidade absoluta."
                : "Take absolute control over natural resources, execute real-time strategic decisions, and evolve your community toward total sustainability."}
            </p>
          </div>

          {/* Pilares Compactos de Gameplay */}
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

        {/* Lado Direito: Entrada Instantânea para Rodar o Jogo */}
        <section className="lg:col-span-5 w-full">
          <div className="w-full h-full bg-black/30 rounded-[2rem] p-5 flex flex-col justify-center gap-4 border border-white/20 shadow-xl">
            <div className="text-center">
              <span className="bg-emerald-400 text-slate-950 font-black text-[9px] tracking-widest uppercase rounded-full px-2.5 py-1 inline-block mb-2">
                {lang === "pt" ? "PRONTO PARA JOGAR" : "READY TO LOG IN"}
              </span>
              <h3 className="text-white font-black text-lg tracking-tight">
                {lang === "pt" ? "Painel do Jogador" : "Player Portal"}
              </h3>
              <p className="text-white/60 text-[11px] font-semibold">
                {lang === "pt" ? "Escreve o teu nome para iniciar a partida:" : "Type your name to begin your match:"}
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
                ? (lang === "pt" ? "🎮 Iniciar Partida ➔" : "🎮 Start Match ➔") 
                : (lang === "pt" ? "Escreve o teu Nome" : "Type your Name")
              }
            </motion.button>
          </div>
        </section>
      </main>

      {/* ── FUNDO DA PÁGINA: ECO-BLOG COM INFORMAÇÕES REAIS ATUALIZADAS (2026) ── */}
      <section className="w-full max-w-6xl mx-auto z-10 mt-12 border-t border-white/10 pt-6 mb-4">
        <div className="text-center lg:text-left mb-6">
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <span className="text-lg">🇲🇿</span>
            <h3 className="text-emerald-400 font-black text-xs md:text-sm uppercase tracking-widest">
              {lang === "pt" ? "Eco-Blog: Contexto Real e Matérias de Moçambique (2026)" : "Eco-Blog: Real Mozambique Context & News (2026)"}
            </h3>
          </div>
          <p className="text-white/40 text-[10px] md:text-xs font-semibold mt-0.5">
            {lang === "pt" ? "Pesquisa de suporte sobre os problemas reais enfrentados pela nossa sociedade e o impacto do jogo" : "Support research exploring actual societal issues and how our game architecture builds solutions"}
          </p>
        </div>

        {/* Estrutura de Blog: Carrossel horizontal confortável no celular, Grelha de 3 Colunas no PC */}
        <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory no-scrollbar w-full">
          {MOZ_BLOG_POSTS[lang].map((post, idx) => (
            <div 
              key={idx}
              className="bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col gap-4 min-w-[300px] sm:min-w-[350px] lg:min-w-0 snap-center shadow-2xl justify-between group"
            >
              <div className="flex flex-col gap-3">
                {/* Imagem Ampliada de Alto Impacto e Visibilidade Máxima */}
                <div 
                  className="w-full h-48 rounded-xl bg-cover bg-center border border-white/10 relative overflow-hidden shadow-md"
                  style={{ 
                    backgroundImage: `url(${post.img})`,
                    contentVisibility: 'auto'
                  }}
                >
                  <span className="absolute bottom-3 left-3 bg-slate-950/90 font-black text-[9px] tracking-wider px-2.5 py-1 rounded-md text-white border border-white/10">
                    {post.tag}
                  </span>
                </div>

                {/* Conteúdo Informativo Estruturado do Blog */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-white font-black text-sm md:text-base tracking-tight leading-tight group-hover:text-emerald-300 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-emerald-300 font-extrabold text-[11px] leading-tight italic">
                    {post.subtitle}
                  </p>
                  
                  {/* Linha Divisória Sutil */}
                  <div className="w-full h-[1px] bg-white/5 my-0.5" />
                  
                  <p className="text-white/70 text-[11px] md:text-xs font-medium leading-relaxed">
                    {post.problem}
                  </p>
                  <p className="text-emerald-400 font-bold text-[11px] md:text-xs leading-relaxed bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                    {post.gameConnection}
                  </p>
                </div>
              </div>

              {/* Botão de Redirecionamento para a Matéria Oficial */}
              <a 
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-[11px] uppercase tracking-wider py-2.5 rounded-xl text-center transition-all block mt-2 active:scale-[0.99]"
              >
                {lang === "pt" ? "Ler Matéria Oficial ➔" : "Read Full Article ➔"}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOTA DE INFLUÊNCIA ECO NO RODAPÉ ── */}
      <footer className="w-full text-center z-10 pt-4 pb-safe">
        <p className="text-white/30 italic text-[10px] max-w-sm mx-auto px-4">
          {t.quote}
        </p>
      </footer>
    </div>
  );
}