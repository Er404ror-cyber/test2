import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
    { type: "🐢 BIODIVERSIDADE", text: "Milhares de tartarugas marinhas morrem por ano ao confundir sacos plásticos com alforrecas. Reduz o uso de plástico!" },
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
    { title: "Município de Maputo lança concurso público para o encerramento da Lixeira de Hulene", tag: "♻️ GESTÃO DE RESÍDUOS", img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80", url: "https://www.diarioeconomico.co.mz/" },
    { title: "FUNAE investe na eletrificação através de sistemas solares fotovoltaicos em Nampula", tag: "⚡ ENERGIA SOLAR", img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80", url: "https://www.funae.co.mz/" },
    { title: "BIOFUND investe no restauro e conservação de ecossistemas de mangais na costa nacional", tag: "🌿 BIODIVERSIDADE", img: "https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&w=600&q=80", url: "https://www.biofund.org.mz/" },
    { title: "Sistemas de monitoria de bacias hidrográficas são reforçados contra cheias e ciclones", tag: "💧 RECURSOS HÍDRICOS", img: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&w=600&q=80", url: "https://www.jornalnoticias.co.mz/" }
  ],
  en: [
    { title: "Maputo municipality launches international tender to close down Hulene landfill", tag: "♻️ WASTE MANAGEMENT", img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80", url: "https://www.diarioeconomico.co.mz/" },
    { title: "FUNAE drives off-grid rural electrification using solar infrastructure in Nampula", tag: "⚡ RENEWABLE ENERGY", img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80", url: "https://www.funae.co.mz/" },
    { title: "BIOFUND funds strategic preservation and mangrove restoration along the coastline", tag: "🌿 BIODIVERSIDADE", img: "https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&w=600&q=80", url: "https://www.biofund.org.mz/en/" },
    { title: "Hydrographic basin monitoring systems reinforced to prevent severe climate impacts", tag: "💧 CLIMATE ACTION", img: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&w=600&q=80", url: "https://www.jornalnoticias.co.mz/" }
  ]
};

const QUIZ_QUESTIONS = {
  pt: [
    {
      q: "Qual destas fontes de energia é renovável e muito abundante em Moçambique?",
      options: ["Carvão Mineral", "Energia Solar Fotovoltaica", "Gás Natural"],
      correct: 1,
      category: "⚡ ENERGIA",
      level: "Fácil",
      consequence: "O uso continuado de combustíveis fósseis (gás e carvão) acelera o aquecimento global, provocando ciclones cada vez mais destrutivos na nossa costa.",
      solution: "Apoiar a eletrificação rural descentralizada. Moçambique possui um dos maiores potenciais de radiação solar da África Austral, ideal para painéis fotovoltaicos isolados."
    },
    {
      q: "Por que razão os mangais ao longo da costa moçambicana são considerados ecossistemas vitais?",
      options: ["Servem apenas para extração de madeira", "Protegem contra a erosão e absorvem o impacto de ciclones", "Bloqueiam a passagem de navios comerciais"],
      correct: 1,
      category: "🌿 BIODIVERSIDADE",
      level: "Médio",
      consequence: "A destruição dos mangais deixa as cidades costeiras (como Beira e Maputo) totalmente desprotegidas contra o avanço do mar e tempestades severas.",
      solution: "Participar ou apoiar campanhas locais de reflorestamento costeiro (como os projetos da BIOFUND) e evitar a destruição dessas árvores para carvão."
    },
    {
      q: "O que acontece quando descartamos plásticos de forma incorreta nas nossas praias?",
      options: ["Decompõem-se em poucos dias", "Nutrem o solo marinho", "Fragmentam-se em microplásticos que contaminam os peixes"],
      correct: 2,
      category: "♻️ GESTÃO DE RESÍDUOS",
      level: "Fácil",
      consequence: "Os plásticos nunca desaparecem; quebram-se em partículas invisíveis (microplásticos). Os peixes comem essas partículas e, eventualmente, elas chegam ao nosso prato, prejudicando a saúde humana.",
      solution: "Recusar plásticos de uso único, recolher resíduos quando visita a praia e apoiar iniciativas de economia circular que recolhem lixo urbano."
    }
  ],
  en: [
    {
      q: "Which of these energy sources is renewable and highly abundant in Mozambique?",
      options: ["Mineral Coal", "Solar Photovoltaic Energy", "Natural Gas"],
      correct: 1,
      category: "⚡ ENERGY",
      level: "Easy",
      consequence: "Continued reliance on fossil fuels drives climate change, causing increasingly intense and frequent cyclones across the Mozambique Channel.",
      solution: "Promote off-grid rural solar systems. Mozambique has some of the highest solar radiation levels in Southern Africa, perfect for sustainable development."
    }
  ]
};

export default function StartScreen({ onStart }: Props) {
  const [lang, setLang] = useState<Lang>("pt");
  const [name, setName] = useState("");
  const [showerTime, setShowerTime] = useState<number | "">("");
  const [currentInsightIdx, setCurrentInsightIdx] = useState(0);
  
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [showQuizFact, setShowQuizFact] = useState(false);

  // Referência para o container de scroll nativo estável
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const t = TRANSLATIONS[lang];
  const canPlay = name.trim().length >= 2;

  const handleStart = useCallback(() => {
    if (!canPlay) return;
    onStart(name.trim(), lang);
  }, [name, lang, canPlay, onStart]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsightIdx((prev) => (prev + 1) % ECO_INSIGHTS[lang].length);
    }, 6500);
    return () => clearInterval(interval);
  }, [lang]);

  // Efeito de Autoscroll Seguro e Fluido (Não intrusivo)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const autoScroll = setInterval(() => {
      // Só avança se o utilizador não estiver ativamente a mexer ou a ver de perto
      if (isUserScrolling) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 240, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(autoScroll);
  }, [isUserScrolling]);

  // Deteta interações para pausar o motor automático imediatamente
  const handleUserInteraction = () => {
    setIsUserScrolling(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Devolve o controlo ao motor automático após 8 segundos de inatividade completa
    timeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 8000);
  };

  const scrollManual = (direction: "left" | "right") => {
    handleUserInteraction();
    const container = scrollContainerRef.current;
    if (!container) return;
    const offset = direction === "left" ? -280 : 280;
    container.scrollBy({ left: offset, behavior: "smooth" });
  };

  const showerFeedback = useMemo(() => {
    if (showerTime === "") return "";
    const mins = Number(showerTime);
    if (mins <= 5) return lang === "pt" ? "🏆 Incrível! Banho super ecológico. Continua assim!" : "🏆 Amazing! Eco-friendly shower. Keep it up!";
    if (mins <= 10) return lang === "pt" ? "👍 Moderado. Se reduzires 2 minutos, poupas imensa água." : "👍 Moderate. If you cut 2 minutes, you save water.";
    return lang === "pt" ? "⚠️ Alerta de desperdício! Tenta banhos mais curtos de 5 min para proteger os rios." : "⚠️ Waste alert! Try shorter 5-minute baths to protect rivers.";
  }, [showerTime, lang]);

  const handleAnswerQuiz = useCallback((optIdx: number) => {
    if (selectedAns !== null) return;
    setSelectedAns(optIdx);
    setShowQuizFact(true);
  }, [selectedAns]);

  const handleNextQuiz = useCallback(() => {
    setSelectedAns(null);
    setShowQuizFact(false);
    setQuizIdx((prev) => (prev + 1) % QUIZ_QUESTIONS[lang].length);
  }, [lang]);

  const activeInsight = ECO_INSIGHTS[lang][currentInsightIdx];
  const activeQuiz = QUIZ_QUESTIONS[lang][quizIdx] || QUIZ_QUESTIONS[lang][0];
  const blogPosts = MOZ_BLOG_POSTS[lang];

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden overflow-y-auto px-4 py-5 md:px-10 md:py-8 select-none bg-slate-950 flex flex-col justify-between gap-6" style={{ fontFamily: "Outfit, sans-serif" }}>
      
      {/* Background Otimizado transform-gpu */}
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu"
        style={{ background: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #0b6656 100%)" }} />

      {PARTICLES.map((p, i) => (
        <div key={i} className="absolute pointer-events-none z-0 text-md opacity-10" style={{ left: `${p.x}%`, top: `${p.y}%` }}>{p.e}</div>
      ))}

      {/* ── CABEÇALHO COMPACTO PREMIUM ── */}
      <header className="w-full max-w-5xl mx-auto flex justify-between items-center z-10 relative">
        <div>
          <h1 className="font-black text-white text-xl md:text-2xl tracking-tight">EcoSteps</h1>
          <p className="text-emerald-400 font-bold text-[9px] uppercase tracking-widest mt-0.5">
            {lang === "pt" ? "🕹️ Estratégia Sustentável" : "🕹️ Sustainable Strategy"}
          </p>
        </div>

        <div className="bg-black/40 p-0.5 rounded-full flex gap-0.5 border border-white/15 backdrop-blur-md">
          {(["pt", "en"] as Lang[]).map(l => (
            <button key={l} 
              onClick={() => { setLang(l); setShowerTime(""); setSelectedAns(null); setShowQuizFact(false); setQuizIdx(0); }}
              className={`px-3 py-1 rounded-full font-black text-[10px] md:text-xs transition-all cursor-pointer ${lang === l ? "bg-white text-slate-950 shadow-xs" : "text-white/60 hover:text-white"}`}>
              {l === "pt" ? "🇲🇿 PT" : "🇬🇧 EN"}
            </button>
          ))}
        </div>
      </header>

      {/* ── SEÇÃO DE DICAS DIÁRIAS ── */}
      <div className="w-full max-w-5xl mx-auto z-10 animate-fade-in">
        <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-3.5 backdrop-blur-md flex flex-row items-center gap-3 shadow-xs">
          <div className="bg-emerald-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
            {activeInsight.type}
          </div>
          <p className="text-slate-100 text-xs font-medium transition-all duration-300">
            "{activeInsight.text}"
          </p>
        </div>
      </div>

      {/* ── LAYOUT CENTRAL PRINCIPAL ── */}
      <main className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 z-10 relative items-stretch">
        
        {/* Painel Informativo Esquerdo */}
        <section className="lg:col-span-7 flex flex-col gap-4 justify-between w-full">
          <div className="bg-black/20 border border-white/10 rounded-xl p-4 backdrop-blur-md">
            <h2 className="text-white font-black text-xs md:text-sm uppercase tracking-wider flex items-center gap-2">
              <span>🎮</span> {lang === "pt" ? "A Simulação" : "The Simulation"}
            </h2>
            <p className="text-white/80 text-xs mt-1 font-medium leading-relaxed">
              {lang === "pt" 
                ? "Gere recursos, toma decisões ecológicas em tempo real e lidera a tua comunidade rumo à sustentabilidade absoluta."
                : "Manage resources, execute green decisions in real-time, and guide your community toward total sustainability."}
            </p>
          </div>

          {/* Missões */}
          <div className="grid grid-cols-3 gap-2.5">
            {t.missions.map((m, i) => (
              <div key={`${lang}-${i}`} className="rounded-xl p-3 flex flex-col items-center text-center border border-white/5 bg-black/20 backdrop-blur-xs justify-center">
                <span className="text-2xl mb-1 filter drop-shadow-xs">{m.icon}</span>
                <div className="flex flex-col min-w-0 w-full">
                  <span className="font-black text-white text-[11px] md:text-xs tracking-tight truncate">{m.title}</span>
                  <span className="text-white/40 text-[9px] font-medium leading-tight mt-0.5 hidden sm:block">{m.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Caixa de Entrada de Login */}
        <section className="lg:col-span-5 w-full flex flex-col justify-center">
          <div className="w-full bg-black/30 rounded-xl p-5 flex flex-col justify-center gap-4 border border-white/10 shadow-xl backdrop-blur-md h-full">
            <div className="text-center">
              <span className="bg-emerald-400 text-slate-950 font-black text-[9px] tracking-widest uppercase rounded px-1.5 py-0.5 inline-block mb-1">
                {lang === "pt" ? "ENTRAR" : "JOIN"}
              </span>
              <h3 className="text-white font-black text-sm md:text-base tracking-tight">
                {lang === "pt" ? "Painel do Eco-Líder" : "Eco-Leader Portal"}
              </h3>
            </div>

            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleStart()}
              placeholder={lang === "pt" ? "Nome do Jogador..." : "Player Name..."}
              maxLength={14}
              className="w-full bg-black/40 text-white placeholder-white/20 font-bold rounded-lg px-3 py-2.5 text-center border border-white/10 focus:border-emerald-400 focus:outline-none transition-all text-xs"
            />

            <button
              onClick={handleStart}
              disabled={!canPlay}
              className="w-full rounded-lg font-black text-white uppercase tracking-wider transform-gpu transition-all py-2.5 text-xs shadow-md cursor-pointer active:scale-98 disabled:opacity-30"
              style={{ background: canPlay ? "linear-gradient(135deg, #10b981 0%, #0284c7 100%)" : "rgba(255,255,255,0.05)" }}>
              {canPlay ? (lang === "pt" ? "Começar Simulação ➔" : "Start Simulation ➔") : (lang === "pt" ? "Insira o seu Nome" : "Enter your Name")}
            </button>
          </div>
        </section>
      </main>

      {/* ── SECÇÃO: NOVO SCROLL HORIZONTAL SUPER SEGURO (MÓVEL & PC) ── */}
      <section className="w-full max-w-5xl mx-auto z-10 border-t border-white/10 pt-4 relative group">
        <div className="flex items-center gap-1.5 mb-3 px-1 justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">🇲🇿</span>
            <h3 className="text-emerald-400 font-black text-[10px] md:text-xs uppercase tracking-widest">
              {lang === "pt" ? "Evidências Ambientais em Moçambique" : "Environmental Evidence in Mozambique"}
            </h3>
          </div>
          
          {/* Setas de Apoio Visuais (Excelentes para computadores/ratos) */}
          <div className="hidden md:flex gap-1">
            <button onClick={() => scrollManual("left")} className="p-1.5 rounded-md bg-black/40 border border-white/10 text-white text-xs hover:border-emerald-400 transition-colors cursor-pointer">◀</button>
            <button onClick={() => scrollManual("right")} className="p-1.5 rounded-md bg-black/40 border border-white/10 text-white text-xs hover:border-emerald-400 transition-colors cursor-pointer">▶</button>
          </div>
        </div>

        {/* Ecrã de Visualização Nativa Flexível - Anti-Bugs */}
        <div className="w-full relative mask-edges">
          <div 
            ref={scrollContainerRef}
            onScroll={handleUserInteraction}
            onTouchStart={handleUserInteraction}
            className="w-full flex gap-4 overflow-x-auto snap-x mandatory scroll-smooth py-1 hide-scrollbar"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {blogPosts.map((post, idx) => (
              <a 
                key={idx} 
                href={post.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[260px] md:w-[290px] shrink-0 snap-start bg-black/40 border border-white/10 rounded-xl overflow-hidden flex flex-col group hover:border-emerald-500/50 transition-all duration-300 transform-gpu"
              >
                <div className="w-full h-36 overflow-hidden relative">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-103 transform-gpu" style={{ backgroundImage: `url(${post.img})` }} />
                  <span className="absolute top-2 left-2 bg-slate-950/95 font-black text-[8px] tracking-wider px-2 py-0.5 rounded-md text-emerald-400 border border-white/5">{post.tag}</span>
                </div>
                <div className="p-3.5 flex flex-col justify-between flex-grow gap-2.5 bg-gradient-to-b from-transparent to-black/30">
                  <h4 className="text-white font-bold text-xs tracking-tight leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors">{post.title}</h4>
                  <span className="text-emerald-400 font-black text-[8px] uppercase tracking-wider flex items-center gap-1">
                    {lang === "pt" ? "Ver notícia ➔" : "Read post ➔"}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECÇÃO: ECO-QUIZ INFORMATIVO ── */}
      <section className="w-full max-w-5xl mx-auto z-10 border-t border-white/10 pt-4 animate-fade-in">
        <div className="bg-gradient-to-b from-black/40 to-black/10 border border-white/5 rounded-xl p-4.5 backdrop-blur-md relative overflow-hidden">
          
          <div className="flex flex-wrap justify-between items-center gap-2 mb-3.5 relative z-10">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-black px-2 py-0.5 rounded-md tracking-wider uppercase">
                {activeQuiz.category}
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                activeQuiz.level === "Fácil" || activeQuiz.level === "Easy" ? "bg-teal-950 text-teal-400 border border-teal-500/30" :
                activeQuiz.level === "Médio" || activeQuiz.level === "Medium" ? "bg-amber-950 text-amber-400 border border-amber-500/30" : "bg-red-950 text-red-400 border border-red-500/30"
              }`}>
                {activeQuiz.level}
              </span>
            </div>
            <span className="text-[10px] text-emerald-300 font-black bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
              {quizIdx + 1} / {QUIZ_QUESTIONS[lang].length}
            </span>
          </div>

          <div className="bg-white/5 p-3 rounded-xl mb-3.5 border border-white/5">
            <p className="text-white text-xs md:text-sm font-bold leading-relaxed">{activeQuiz.q}</p>
          </div>

          <div className="grid grid-cols-1 gap-2 relative z-10">
            {activeQuiz.options.map((opt, oIdx) => {
              const isSelected = selectedAns === oIdx;
              const isCorrect = oIdx === activeQuiz.correct;
              
              let btnStyle = "bg-black/30 border-white/10 text-white/90 hover:bg-white/5 hover:border-emerald-500/30 active:scale-995";
              let icon = "⚪";

              if (selectedAns !== null) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold shadow-md";
                  icon = "🎉";
                } else if (isSelected) {
                  btnStyle = "bg-red-500/15 border-red-500 text-red-300 opacity-90";
                  icon = "❌";
                } else {
                  btnStyle = "bg-black/20 border-white/5 text-white/30 opacity-30 cursor-not-allowed";
                  icon = "▪️";
                }
              }

              return (
                <button key={oIdx} disabled={selectedAns !== null} onClick={() => handleAnswerQuiz(oIdx)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer transform-gpu ${btnStyle}`}>
                  <span className="leading-tight">{opt}</span>
                  <span className="text-xs shrink-0">{icon}</span>
                </button>
              );
            })}
          </div>

          {showQuizFact && (
            <div className="mt-4 p-4 bg-slate-900/95 border border-white/10 rounded-xl animate-fade-in flex flex-col gap-3.5 shadow-2xl relative z-10">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded shadow-sm ${
                  selectedAns === activeQuiz.correct ? "bg-emerald-500 text-slate-950" : "bg-red-500 text-white"
                }`}>
                  {selectedAns === activeQuiz.correct ? (lang === "pt" ? "🎯 Acertaste!" : "🎯 Correct!") : (lang === "pt" ? "💡 Ops, incorreto!" : "💡 Incorrect!")}
                </span>
                <span className="text-white/40 text-[10px] font-medium">{lang === "pt" ? "Dossiê de Impacto Ambiental" : "Environmental Impact Dossier"}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="bg-red-500/5 border border-red-500/15 p-3 rounded-lg flex flex-col gap-1">
                  <span className="text-[9px] font-black tracking-wider text-red-400 uppercase">⚠️ {lang === "pt" ? "Consequência Real" : "Real Consequence"}</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{activeQuiz.consequence}</p>
                </div>
                
                <div className="bg-emerald-500/5 border border-emerald-500/15 p-3 rounded-lg flex flex-col gap-1">
                  <span className="text-[9px] font-black tracking-wider text-emerald-400 uppercase">🛠️ {lang === "pt" ? "A Solução Prática" : "Practical Solution"}</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{activeQuiz.solution}</p>
                </div>
              </div>

              <button onClick={handleNextQuiz}
                className="self-end bg-emerald-400 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg hover:bg-white active:scale-95 transition-all cursor-pointer shadow-md mt-1">
                {lang === "pt" ? "Próxima Pergunta ➔" : "Next Question ➔"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── ECO-CHECK DO CHUVEIRO ── */}
      <section className="w-full max-w-5xl mx-auto z-10 border-t border-white/10 pt-4 animate-fade-in">
        <div className="w-full bg-black/20 border border-white/5 rounded-xl p-4 backdrop-blur-md">
          <h4 className="text-white font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
            <span>🚿</span> {lang === "pt" ? "Eco-Check Rápido de Hábitos" : "Quick Habit Eco-Check"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div className="flex flex-col gap-0.5">
              <label className="text-white/80 text-xs font-medium">
                {lang === "pt" ? "Quantos minutos demorou o teu banho hoje?" : "How many minutes was your shower today?"}
              </label>
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <input
                type="number"
                value={showerTime}
                onChange={e => setShowerTime(e.target.value === "" ? "" : Math.min(60, Math.max(1, Number(e.target.value))))}
                placeholder="Ex: 5"
                className="w-full bg-black/30 text-emerald-400 font-black rounded-lg px-3 py-2 border border-white/10 focus:border-emerald-500 focus:outline-none text-xs"
              />
            </div>
          </div>
          {showerFeedback && (
            <p className="text-[11px] font-bold text-emerald-300 mt-2.5 bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/15 animate-fade-in">
              {showerFeedback}
            </p>
          )}
        </div>
      </section>

      <footer className="w-full text-center z-10 pt-1">
        <p className="text-white/20 italic text-[10px] max-w-md mx-auto px-4">{t.quote}</p>
      </footer>

      <style>{`
        .mask-edges {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translate3d(0, 3px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}