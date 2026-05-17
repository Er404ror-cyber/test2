import { useState, useEffect, useRef } from "react";
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

const ECO_INSIGHTS = {
  pt: [
    { type: "💡 DICA DO DIA", text: "Que tal limpar a praia ou o teu bairro hoje? Pequenos gestos mudam o ecossistema!" },
    { type: "💧 POUPANÇA", text: "Fechar a torneira enquanto escovas os dentes poupa até 12 litros de água de cada vez." },
    { type: "🐢 BIODIVERSIDADE", text: "Milhares de tartarugas marinhas morrem por ano ao confundir sacos plásticos com alforrecas (águas-vivas). Reduz o uso de plástico!" },
    { type: "🦏 FAUNA EM PERIGO", text: "O rinoceronte e os elefantes africanos sofrem com a perda de habitat. Apoiar o consumo sustentável protege as florestas deles." },
    { type: "⚡ ENERGIA", text: "Desliga os aparelhos da tomada em modo 'standby'. Eles consomem até 12% da energia da tua casa à toa." }
  ],
  en: [
    { type: "💡 TIP OF THE DAY", text: "How about cleaning a local beach or your neighborhood today? Small actions change ecosystems!" },
    { type: "💧 WATER SAVING", text: "Turning off the tap while brushing your teeth saves up to 12 liters of water each time." },
    { type: "🐢 BIODIVERSITY", text: "Thousands of sea turtles die every year by mistaking plastic bags for jellyfish. Reduce plastic use!" },
    { type: "🦏 WILDLIFE ALERT", text: "African rhinos and elephants suffer from habitat loss. Supporting sustainable consumption protects their forests." },
    { type: "⚡ ENERGY", text: "Unplug devices left on 'standby'. They account for up to 12% of your home's electricity bill." }
  ]
};

const MOZ_BLOG_POSTS = {
  pt: [
    {
      title: "Município de Maputo lança concurso público para o encerramento da Lixeira de Hulene",
      tag: "♻️ GESTÃO DE RESÍDUOS",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80",
      url: "https://www.diarioeconomico.co.mz/"
    },
    {
      title: "FUNAE investe na eletrificação através de sistemas solares fotovoltaicos em Nampula",
      tag: "⚡ ENERGIA SOLAR",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80",
      url: "https://www.funae.co.mz/"
    },
    {
      title: "BIOFUND investe no restauro e conservação de ecossistemas de mangais na costa nacional",
      tag: "🌿 BIODIVERSIDADE",
      img: "https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&w=400&q=80",
      url: "https://www.biofund.org.mz/"
    },
    {
      title: "Sistemas de monitoria de bacias hidrográficas são reforçados contra cheias e ciclones",
      tag: "💧 RECURSOS HÍDRICOS",
      img: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&w=400&q=80",
      url: "https://www.jornalnoticias.co.mz/"
    }
  ],
  en: [
    {
      title: "Maputo municipality launches international tender to close down Hulene landfill",
      tag: "♻️ WASTE MANAGEMENT",
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80",
      url: "https://www.diarioeconomico.co.mz/"
    },
    {
      title: "FUNAE drives off-grid rural electrification using solar infrastructure in Nampula",
      tag: "⚡ RENEWABLE ENERGY",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80",
      url: "https://www.funae.co.mz/"
    },
    {
      title: "BIOFUND funds strategic preservation and mangrove restoration along the coastline",
      tag: "🌿 BIODIVERSITY",
      img: "https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&w=400&q=80",
      url: "https://www.biofund.org.mz/en/"
    },
    {
      title: "Hydrographic basin monitoring systems reinforced to prevent severe climate impacts",
      tag: "💧 CLIMATE ACTION",
      img: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&w=400&q=80",
      url: "https://www.jornalnoticias.co.mz/"
    }
  ]
};

const QUIZ_QUESTIONS = {
  pt: [
    {
      q: "Qual destas fontes de energia é renovável e muito abundante em Moçambique?",
      options: ["Carvão Mineral", "Energia Solar Fotovoltaica", "Gás Natural"],
      correct: 1,
      fact: "Moçambique tem um enorme potencial solar, especialmente nas regiões centro e norte, crucial para a eletrificação rural de zonas isoladas."
    },
    {
      q: "O que acontece quando descartamos plásticos de forma incorreta nas nossas praias?",
      options: ["Decompõem-se em poucos dias", "Nutrem o solo marinho", "Fragmentam-se em microplásticos que contaminam os peixes"],
      correct: 2,
      fact: "Os plásticos nunca desaparecem por completo; quebram-se em partículas minúsculas que entram na cadeia alimentar marinha e humana."
    }
  ],
  en: [
    {
      q: "Which of these energy sources is renewable and highly abundant in Mozambique?",
      options: ["Mineral Coal", "Solar Photovoltaic Energy", "Natural Gas"],
      correct: 1,
      fact: "Mozambique possesses vast solar potential, particularly in central and northern regions, key for off-grid rural electrification."
    },
    {
      q: "What happens when plastic is incorrectly discarded on our beaches?",
      options: ["It decomposes within days", "It provides nutrients to seabed", "It breaks into microplastics that contaminate fish"],
      correct: 2,
      fact: "Plastics never fully vanish; they fragment into minute particles that invade the marine food web and eventually our meals."
    }
  ]
};

export default function StartScreen({ onStart }: Props) {
  const [lang, setLang] = useState<Lang>("pt");
  const [name, setName] = useState("");
  const [showerTime, setShowerTime] = useState<number | "">("");
  const [showerFeedback, setShowerFeedback] = useState("");
  const [currentInsightIdx, setCurrentInsightIdx] = useState(0);
  
  // Estados do Quiz Local
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [showQuizFact, setShowQuizFact] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);

  const t = TRANSLATIONS[lang];
  const canPlay = name.trim().length >= 2;

  const handleStart = () => {
    if (!canPlay) return;
    onStart(name.trim(), lang);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsightIdx((prev) => (prev + 1) % ECO_INSIGHTS[lang].length);
    }, 7000);
    return () => clearInterval(interval);
  }, [lang]);

  useEffect(() => {
    if (showerTime === "") {
      setShowerFeedback("");
      return;
    }
    const mins = Number(showerTime);
    if (mins <= 5) {
      setShowerFeedback(lang === "pt" ? "🏆 Incrível! Banho super ecológico. Continua assim!" : "🏆 Amazing! Eco-friendly shower. Keep it up!");
    } else if (mins <= 10) {
      setShowerFeedback(lang === "pt" ? "👍 Moderado. Se conseguires reduzir 2 minutos, poupas imensa água." : "👍 Moderate. If you can cut 2 minutes, you save a lot of water.");
    } else {
      setShowerFeedback(lang === "pt" ? "⚠️ Alerta de desperdício! Tenta banhos mais curtos de 5 min para proteger os rios." : "⚠️ Waste alert! Try shorter 5-minute baths to protect our rivers.");
    }
  }, [showerTime, lang]);

  // Autoscroll suave e adaptado
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    const scroll = () => {
      if (!isInteractingRef.current) {
        container.scrollLeft += 0.7;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [lang]);

  const handleAnswerQuiz = (optIdx: number) => {
    if (selectedAns !== null) return;
    setSelectedAns(optIdx);
    setShowQuizFact(true);
  };

  const handleNextQuiz = () => {
    setSelectedAns(null);
    setShowQuizFact(false);
    setQuizIdx((prev) => (prev + 1) % QUIZ_QUESTIONS[lang].length);
  };

  const doublePosts = [...MOZ_BLOG_POSTS[lang], ...MOZ_BLOG_POSTS[lang]];
  const activeInsight = ECO_INSIGHTS[lang][currentInsightIdx];
  const activeQuiz = QUIZ_QUESTIONS[lang][quizIdx];

  return (
    <div
      className="w-full min-h-screen relative overflow-x-hidden overflow-y-auto px-4 py-6 md:px-12 md:py-10 select-none bg-slate-950 flex flex-col justify-between gap-6 md:gap-10"
      style={{ 
        fontFamily: "Outfit, sans-serif", 
        ["WebkitOverflowScrolling" as any]: "touch" 
      }}
    >
      <div 
        className="absolute inset-0 z-0 bg-emerald-950 pointer-events-none transform-gpu"
        style={{
          background: "linear-gradient(135deg, #022c22 0%, #064e3b 40%, #0b6656 100%)",
        }} 
      />

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
              onClick={() => { setLang(l); setShowerTime(""); setSelectedAns(null); setShowQuizFact(false); setQuizIdx(0); }}
              className={`px-3 py-1 rounded-full font-black text-[11px] md:text-xs transition-all cursor-pointer ${
                lang === l ? "bg-white text-slate-950 shadow-sm" : "text-white/60 hover:text-white"
              }`}
            >
              {l === "pt" ? "🇲🇿 PT" : "🇬🇧 EN"}
            </button>
          ))}
        </div>
      </header>

      {/* ── SEÇÃO DE DICAS DIÁRIAS & MOTIVAÇÃO ── */}
      <div className="w-full max-w-5xl mx-auto z-10 animate-fade-in">
        <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 rounded-2xl p-4 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center gap-3 shadow-lg">
          <div className="bg-emerald-400 text-slate-950 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shrink-0">
            {activeInsight.type}
          </div>
          <p className="text-white text-xs md:text-sm font-medium transition-all duration-500">
            "{activeInsight.text}"
          </p>
        </div>
      </div>

      {/* ── LAYOUT CENTRAL PRINCIPAL ── */}
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

          {/* MISSÕES EM GRID RESPONSIVO */}
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {t.missions.map((m, i) => (
              <div 
                key={`${lang}-${i}`}
                className="rounded-xl p-2.5 md:p-4 flex flex-col items-center text-center border border-white/5 bg-black/20 backdrop-blur-xs justify-center"
              >
                <span className="text-2xl md:text-3xl mb-1 filter drop-shadow-sm">{m.icon}</span>
                <div className="flex flex-col min-w-0 w-full">
                  <span className="font-black text-white text-[11px] md:text-sm tracking-tight truncate">
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

        {/* Caixa de Entrada Direta + Eco-Check do Chuveiro */}
        <section className="lg:col-span-5 w-full flex flex-col gap-4">
          <div className="w-full bg-black/40 rounded-2xl p-5 flex flex-col justify-center gap-4 border border-white/10 shadow-xl backdrop-blur-md flex-grow">
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
            >
              {canPlay 
                ? (lang === "pt" ? "Jogar ➔" : "Play ➔") 
                : (lang === "pt" ? "Insira o seu Nome" : "Enter your Name")
              }
            </button>
          </div>

          <div className="w-full bg-black/30 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
            <h4 className="text-white font-black text-[11px] md:text-xs uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <span>🚿</span> {lang === "pt" ? "Eco-Check Rápido" : "Quick Eco-Check"}
            </h4>
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-[11px] md:text-xs">
                {lang === "pt" ? "Quantos minutos demorou o teu banho hoje?" : "How many minutes was your shower today?"}
              </label>
              <input
                type="number"
                value={showerTime}
                onChange={e => setShowerTime(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="Ex: 5"
                min="1"
                max="60"
                className="w-full bg-black/30 text-emerald-400 font-black rounded-lg px-3 py-2 border border-white/10 focus:border-emerald-500 focus:outline-none text-xs"
              />
              {showerFeedback && (
                <p className="text-[11px] font-bold text-emerald-300 mt-1 bg-emerald-950/40 p-2 rounded-md border border-emerald-500/20 animate-fade-in">
                  {showerFeedback}
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ── SECÇÃO DE NOTÍCIAS COMPORTAMENTO MOBILE APERFEIÇOADO ── */}
      <section className="w-full max-w-5xl mx-auto z-10 border-t border-white/10 pt-4 relative overflow-hidden">
        <div className="flex items-center gap-1.5 mb-2.5 px-1 justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">🇲🇿</span>
            <h3 className="text-emerald-400 font-black text-[10px] md:text-xs uppercase tracking-widest">
              {lang === "pt" ? "Evidências Ambientais em Moçambique" : "Environmental Evidence in Mozambique"}
            </h3>
          </div>
          <span className="text-white/30 font-bold text-[8px] md:text-[9px] uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-md">
            {lang === "pt" ? "Arraste ou Aguarde" : "Swipe or Wait"}
          </span>
        </div>

        {/* Adicionado snap-x nativo e touch handling refinado para mobile */}
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-2 flex gap-4 custom-scrollbar-clean mask-edges snap-x snap-mandatory scroll-smooth"
          onMouseEnter={() => { isInteractingRef.current = true; }}
          onMouseLeave={() => { isInteractingRef.current = false; }}
          onTouchStart={() => { isInteractingRef.current = true; }}
          onTouchEnd={() => { isInteractingRef.current = false; }}
        >
          {doublePosts.map((post, idx) => (
            <a 
              key={idx}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[260px] md:w-[290px] shrink-0 bg-black/40 border border-white/5 rounded-xl overflow-hidden flex flex-col group hover:border-emerald-400/40 transition-colors snap-center"
            >
              <div className="w-full h-24 md:h-28 overflow-hidden relative">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${post.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <span className="absolute top-2 left-2 bg-slate-950/80 font-black text-[8px] tracking-wider px-1.5 py-0.5 rounded text-white">
                  {post.tag}
                </span>
              </div>

              <div className="p-3 flex flex-col justify-between flex-grow gap-2">
                <h4 className="text-white font-bold text-[11px] md:text-xs tracking-tight leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors">
                  {post.title}
                </h4>
                <span className="text-emerald-400 font-black text-[9px] uppercase tracking-wider flex items-center gap-1">
                  {lang === "pt" ? "Visitar portal ➔" : "Visit portal ➔"}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── NOVO: SECÇÃO ECO-QUIZ LOCALIZADA ABAIXO DO BLOG ── */}
      <section className="w-full max-w-5xl mx-auto z-10 border-t border-white/10 pt-4 relative animate-fade-in">
        <div className="bg-black/20 border border-white/5 rounded-2xl p-4 md:p-5 backdrop-blur-md">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-black text-xs md:text-sm uppercase tracking-wider flex items-center gap-1.5">
              <span>🧠</span> {lang === "pt" ? "Eco-Quiz Conhecimento" : "Eco-Quiz Knowledge"}
            </h3>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
              Q: {quizIdx + 1} / {QUIZ_QUESTIONS[lang].length}
            </span>
          </div>

          <p className="text-white text-xs md:text-sm font-bold mb-3 leading-snug">
            {activeQuiz.q}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {activeQuiz.options.map((opt, oIdx) => {
              let btnStyle = "bg-black/40 border-white/10 hover:border-emerald-500/40 text-white/90";
              if (selectedAns !== null) {
                if (oIdx === activeQuiz.correct) {
                  btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300";
                } else if (selectedAns === oIdx) {
                  btnStyle = "bg-red-500/20 border-red-500 text-red-300";
                } else {
                  btnStyle = "bg-black/10 border-white/5 text-white/40 opacity-60";
                }
              }

              return (
                <button
                  key={oIdx}
                  disabled={selectedAns !== null}
                  onClick={() => handleAnswerQuiz(oIdx)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all transition-colors cursor-pointer ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {showQuizFact && (
            <div className="mt-3 p-3 bg-slate-900/80 border border-white/10 rounded-xl animate-fade-in flex flex-col gap-2">
              <p className="text-[11px] md:text-xs text-white/90 leading-relaxed">
                <span className="font-black text-emerald-400 uppercase tracking-wider mr-1 block sm:inline">
                  {selectedAns === activeQuiz.correct 
                    ? (lang === "pt" ? "🎯 Certíssimo!" : "🎯 Spot on!") 
                    : (lang === "pt" ? "💡 Sabias que?" : "💡 Did you know?")
                  }
                </span> 
                {activeQuiz.fact}
              </p>
              <button
                onClick={handleNextQuiz}
                className="self-end bg-white text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-lg hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                {lang === "pt" ? "Próxima Pergunta ➔" : "Next Question ➔"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── RODAPÉ DISCRETO CONTEXTUAL ── */}
      <footer className="w-full text-center z-10 pt-1 relative">
        <p className="text-white/20 italic text-[9px] md:text-xs max-w-md mx-auto px-4">
          {t.quote}
        </p>
      </footer>

      <style>{`
        .custom-scrollbar-clean::-webkit-scrollbar { display: none; }
        .custom-scrollbar-clean { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
        .mask-edges {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}