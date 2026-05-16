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

// Base de Dados Verídica do Eco-Blog de Moçambique (Contexto Real 2025/2026)
const MOZ_BLOG_POSTS = {
  pt: [
    {
      title: "Concurso de 10 Milhões USD Lançado para o Encerramento da Lixeira de Hulene",
      subtitle: "Conselho Municipal de Maputo oficializa plano para fechar aterro e aproveitar resíduos.",
      problem: "Problema: Mais de 1200 toneladas diárias de resíduos sólidos acumuladas em 25 hectares geram grave poluição urbana e riscos operacionais críticos nos dias de chuva.",
      gameConnection: "No EcoSteps: Desenvolve redes inteligentes de triagem de plástico e posicionamento estratégico de contentores de coleta seletiva.",
      tag: "♻️ GESTÃO DE RESÍDUOS",
      // Foto documental de lixo urbano a céu aberto e reciclagem manual
      img: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80",
      url: "https://www.diarioeconomico.co.mz/2025/01/21/desenvolvimento-2/maputo-municipio-lanca-concurso-de-10-m-para-encerramento-da-lixeira-de-hulene/"
    },
    {
      title: "FUNAE Avança com Plano de Eletrificação Solar de 151 Localidades em Nampula",
      subtitle: "Fundo de Energia expande mini-redes e centrais fotovoltaicas para o desenvolvimento rural.",
      problem: "Problema: O isolamento elétrico e a dependência de geradores fósseis de alto custo limitam a produtividade agrícola e os serviços essenciais nas comunidades recônditas.",
      gameConnection: "No EcoSteps: Substitui matrizes a gasóleo obsoletas por campos de captação solar fotovoltaica para alimentar distritos de carbono zero.",
      tag: "⚡ ENERGIAS RENOVÁVEIS",
      // Foto real de painéis solares rurais instalados em regiões de terra batida
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80",
      url: "https://mznews.co.mz/funae-preve-electrificar-151-localidades-com-energia-solar-em-nampula/"
    },
    {
      title: "Plano de Contingência Avalia Riscos Hidrológicos e Impactos de Eventos Extremos",
      subtitle: "Governo e INGD coordenam mapeamento de bacias e mitigação climática para proteção agrícola.",
      problem: "Problema: Flutuações severas entre secas prolongadas no sul e riscos de inundações urbanas ameaçam diretamente a segurança alimentar e o abastecimento de água.",
      gameConnection: "No EcoSteps: Constrói infraestruturas de captação pluvial, irrigação gota-a-gota eficiente e gestão ativa de bacias hidrográficas.",
      tag: "💧 RECURSOS HÍDRICOS",
      // Foto documental de rachaduras no solo causadas pela estiagem extrema e calor
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      url: "https://ingd.gov.mz/wp-content/uploads/2025/10/PC-2025-26-CM.pdf"
    }
  ],
  en: [
    {
      title: "10 Million USD Tender Launched for the Absolute Closure of Hulene Dumpsite",
      subtitle: "Maputo Municipal Council officializes structural plan to close landfill and process waste.",
      problem: "Problem: Over 1200 daily tons of solid waste accumulated across 25 hectares create severe urban contamination and critical risks.",
      gameConnection: "In EcoSteps: Design smart sorting networks, plastic recycling plants, and optimized selective bin positioning.",
      tag: "♻️ WASTE MANAGEMENT",
      img: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80",
      url: "https://www.diarioeconomico.co.mz/2025/01/21/desenvolvimento-2/maputo-municipio-lanca-concurso-de-10-m-para-encerramento-da-lixeira-de-hulene/"
    },
    {
      title: "FUNAE Advances Solar Electrification Across 151 Communities in Nampula",
      subtitle: "Energy Fund expands local off-grid solar systems to leverage rural economic development.",
      problem: "Problem: Severe energy isolation and reliance on high-cost diesel generators stunt local trade and community growth.",
      gameConnection: "In EcoSteps: Modernize the grid by replacing diesel plants with photovoltaic solar fields to run clean production lines.",
      tag: "⚡ RENEWABLE ENERGY",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80",
      url: "https://mznews.co.mz/funae-preve-electrificar-151-localidades-com-energia-solar-em-nampula/"
    },
    {
      title: "Annual Contingency Plan Targets Hydrological Management & Climate Risk Impact",
      subtitle: "Government and INGD map out basin vulnerabilities to secure agriculture against extreme shifts.",
      problem: "Problem: Extreme climatic fluctuations between prolonged regional droughts and localized urban floods threaten water security.",
      gameConnection: "In EcoSteps: Construct structural rainwater storage units, flood control architecture, and strict water conservation systems.",
      tag: "💧 WATER RESOURCES",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      url: "https://ingd.gov.mz/wp-content/uploads/2025/10/PC-2025-26-CM.pdf"
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
      {/* ── GRADIENTE DE FUNDO OTIMIZADO PARA DISPOSITIVOS FRACOS ── */}
      <div className="absolute inset-0 z-0 bg-emerald-900"
        style={{
          background: "linear-gradient(145deg, #064e3b 0%, #065f46 20%, #0f766e 45%, #0369a1 75%, #1d4ed8 100%)",
        }} />

      {/* Raios de iluminação estáticos sem consumo de GPU */}
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

      {/* Partículas leves de CPU */}
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

      {/* ── CENTRO: JOGABILIDADE E ENTRADA (MANTÉM O FOCO SEM ATRAPALHAR) ── */}
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto z-10 items-stretch">
        
        {/* Lado Esquerdo: Resumo Funcional */}
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

          {/* Missões Interativas do Jogo */}
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

        {/* Lado Direito: Formulário Direto de Login */}
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

      {/* ── ECO-BLOG SUBTERRÂNEO: CONTEXTO REAL DE MOÇAMBIQUE 2025/2026 ── */}
      <section className="w-full max-w-6xl mx-auto z-10 mt-16 border-t border-white/10 pt-8 mb-4">
        <div className="text-center lg:text-left mb-6">
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <span className="text-lg">🇲🇿</span>
            <h3 className="text-emerald-400 font-black text-xs md:text-sm uppercase tracking-widest">
              {lang === "pt" ? "Eco-Blog: Desafios Reais e Evidências Governamentais" : "Eco-Blog: Real Challenges & Government Evidence"}
            </h3>
          </div>
          <p className="text-white/40 text-[10px] md:text-xs font-semibold mt-0.5">
            {lang === "pt" ? "Artigos oficiais e documentação técnica que validam a arquitetura de soluções da maquete" : "Official statements and technical documentation supporting our simulation infrastructure"}
          </p>
        </div>

        {/* Layout Estilo Grelha de Artigos/Pinterest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {MOZ_BLOG_POSTS[lang].map((post, idx) => (
            <div 
              key={idx}
              className="bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col gap-4 shadow-2xl justify-between group"
            >
              <div className="flex flex-col gap-3">
                {/* Imagem Real de Alta Definição */}
                <div 
                  className="w-full h-44 rounded-xl bg-cover bg-center border border-white/10 relative overflow-hidden shadow-md group-hover:border-emerald-500/30 transition-all"
                  style={{ 
                    backgroundImage: `url(${post.img})`,
                    contentVisibility: 'auto'
                  }}
                >
                  <span className="absolute bottom-3 left-3 bg-slate-950/95 font-black text-[9px] tracking-wider px-2.5 py-1 rounded-md text-white border border-white/10">
                    {post.tag}
                  </span>
                </div>

                {/* Dados Estruturados da Notícia */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-white font-black text-xs md:text-sm tracking-tight leading-snug group-hover:text-emerald-300 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-emerald-300 font-extrabold text-[10px] md:text-[11px] leading-tight italic">
                    {post.subtitle}
                  </p>
                  
                  <div className="w-full h-[1px] bg-white/5 my-0.5" />
                  
                  <p className="text-white/60 text-[11px] font-medium leading-relaxed">
                    {post.problem}
                  </p>
                  <p className="text-emerald-400/90 font-bold text-[11px] leading-relaxed bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                    {post.gameConnection}
                  </p>
                </div>
              </div>

              {/* Redirecionamento Direto para o Link Real da Notícia */}
              <a 
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:text-white hover:border-emerald-500/40 text-white font-black text-[10px] uppercase tracking-wider py-2.5 rounded-xl text-center transition-all block mt-2"
              >
                {lang === "pt" ? "Abrir Portal Oficial ➔" : "Open Official Portal ➔"}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOTA DO RODAPÉ ── */}
      <footer className="w-full text-center z-10 pt-4 pb-safe">
        <p className="text-white/30 italic text-[10px] max-w-sm mx-auto px-4">
          {t.quote}
        </p>
      </footer>
    </div>
  );
}