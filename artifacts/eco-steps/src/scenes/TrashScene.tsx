import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TRASH_ITEMS, TrashItem } from "@/data/game-data";
import { Lang, TRANSLATIONS } from "@/i18n";

function ThrowingChild({ throwing }: { throwing: boolean }) {
  return (
    <svg viewBox="0 0 64 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="14" rx="16" ry="14" fill="#059669" />
      <circle cx="32" cy="18" r="14" fill="#fbbf24" />
      <circle cx="26" cy="15" r="3" fill="#1e1b4b" />
      <circle cx="38" cy="15" r="3" fill="#1e1b4b" />
      <circle cx="27" cy="14" r="1" fill="white" />
      <circle cx="39" cy="14" r="1" fill="white" />
      <path d="M25 22 Q32 28 39 22" fill="none" stroke="#1e1b4b" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="18" y="32" width="28" height="34" rx="9" fill="#10b981" />
      <line x1="18" y1="42" x2="5" y2="56" stroke="#fbbf24" strokeWidth="9" strokeLinecap="round" />
      {throwing
        ?<line x1="50" y1="36" x2="62" y2="20" stroke="#fbbf24" strokeWidth="9" strokeLinecap="round" />
        :<line x1="50" y1="44" x2="63" y2="58" stroke="#fbbf24" strokeWidth="9" strokeLinecap="round" />}
      <line x1="25" y1="66" x2="20" y2="94" stroke="#059669" strokeWidth="11" strokeLinecap="round" />
      <line x1="39" y1="66" x2="44" y2="94" stroke="#059669" strokeWidth="11" strokeLinecap="round" />
      <ellipse cx="17" cy="97" rx="8" ry="4.5" fill="#1e1b4b" />
      <ellipse cx="47" cy="97" rx="8" ry="4.5" fill="#1e1b4b" />
    </svg>
  );
}

interface Props {
  onComplete: (points: number, message: string) => void;
  totalPoints: number;
  lang: Lang;
}

export default function TrashScene({ onComplete, totalPoints, lang }: Props) {
  const t = TRANSLATIONS[lang];

  const BINS = [
    { id: "blue"  as const, bg:"linear-gradient(180deg,#2563eb,#1d4ed8)", lid:"#1e3a8a", ring:"#60a5fa", text:"#dbeafe" },
    { id: "brown" as const, bg:"linear-gradient(180deg,#b45309,#92400e)", lid:"#451a03", ring:"#fbbf24", text:"#fef3c7" },
    { id: "gray"  as const, bg:"linear-gradient(180deg,#4b5563,#374151)", lid:"#111827", ring:"#9ca3af", text:"#f3f4f6" },
  ];

  const [items] = useState<TrashItem[]>(()=>[...TRASH_ITEMS].sort(()=>Math.random()-0.5).slice(0,6));
  const [idx, setIdx]           = useState(0);
  const [correct, setCorrect]   = useState(0);
  const [feedback, setFeedback] = useState<{ok:boolean;msg:string}|null>(null);
  const [throwing, setThrowing] = useState(false);
  const [activeBin, setActiveBin] = useState<string|null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const current = items[idx];

  const handleBin = (binId:"blue"|"brown"|"gray") => {
    if (feedback || !current || showSuccess) return;
    const ok = current.bin === binId;
    setThrowing(true); setActiveBin(binId);
    setTimeout(()=>{
      setFeedback({ ok, msg: ok ? t.trashCorrect : t.trashWrong(t.bins[current.bin]) });
    }, 300);
    setTimeout(()=>{
      const nc = correct + (ok?1:0);
      setFeedback(null); setThrowing(false); setActiveBin(null);
      const ni = idx+1;
      if (ni>=items.length) {
        setCorrect(nc); setShowSuccess(true);
        const pts = Math.round((nc/items.length)*100);
        setTimeout(()=>onComplete(pts,t.trashScore(nc,items.length)),1800);
      } else { setCorrect(nc); setIdx(ni); }
    }, 1400);
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{fontFamily:"Outfit, sans-serif",background:"linear-gradient(180deg,#bfdbfe 0%,#dbeafe 30%,#bbf7d0 60%,#4ade80 100%)"}}>

      {/* Park background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{top:"4%",right:"10%",width:40,height:40,background:"radial-gradient(circle,#fef08a,#fbbf24)",boxShadow:"0 0 20px 6px rgba(251,191,36,0.4)"}} />
        {[{x:5,y:6},{x:50,y:3},{x:72,y:8}].map((c,i)=>(
          <motion.div key={i} className="absolute" style={{left:`${c.x}%`,top:`${c.y}%`}}
            animate={{x:[-4,4,-4]}} transition={{duration:6+i*2,repeat:Infinity}}>
            <div style={{width:56,height:24,background:"white",borderRadius:"50%",opacity:0.85}} />
          </motion.div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-[30%]" style={{background:"linear-gradient(180deg,#4ade80,#16a34a)"}} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-3xl" style={{width:"22%",height:"30%",background:"linear-gradient(180deg,#e2e8f0,#cbd5e1)"}} />
        {[8,18,75,85].map((x,i)=>(
          <div key={i} className="absolute" style={{left:`${x}%`,bottom:"28%",fontSize:"clamp(14px,3vw,20px)"}}>
            {["🌸","🌻","🌼","🌺"][i]}
          </div>
        ))}
      </div>

      {/* HUD */}
      <div className="relative z-20 flex items-center gap-2 px-3 pt-3 pb-1">
        <div className="bg-white/75 backdrop-blur rounded-2xl px-3 py-1 font-black text-green-800 text-sm">{idx}/{items.length}</div>
        <div className="flex-1 bg-white/50 backdrop-blur rounded-full h-3 overflow-hidden">
          <motion.div className="h-full rounded-full" animate={{width:`${(idx/items.length)*100}%`}} transition={{duration:0.4}}
            style={{background:"linear-gradient(90deg,#22c55e,#16a34a)"}} />
        </div>
        <div className="bg-white/75 backdrop-blur rounded-2xl px-3 py-1 font-black text-yellow-600 text-sm">⭐{totalPoints}</div>
      </div>

      {/* Item + child */}
      <div className="relative z-20 flex items-center justify-center gap-3 px-4 py-2" style={{flex:"1 1 auto"}}>
        <motion.div style={{width:"clamp(50px,12vw,80px)",height:"clamp(80px,19vw,126px)",flexShrink:0}}
          animate={throwing?{x:10}:{x:0}} transition={{duration:0.25}}>
          <ThrowingChild throwing={throwing} />
        </motion.div>

        <AnimatePresence mode="wait">
          {current && (
            <motion.div key={current.id}
              initial={{scale:0,rotate:-10}}
              animate={throwing?{scale:0.4,x:120,y:40,rotate:20,opacity:0}:{scale:1,rotate:0,x:0,y:0,opacity:1}}
              exit={{scale:0,opacity:0}}
              transition={{type:"spring",bounce:0.4,duration:throwing?0.35:0.45}}
              className="bg-white rounded-[1.8rem] shadow-2xl flex flex-col items-center justify-center gap-2"
              style={{padding:"clamp(12px,3vw,22px)",minWidth:"clamp(110px,28vw,160px)"}}>
              <span style={{fontSize:"clamp(44px,12vw,72px)",lineHeight:1.1}}>{current.emoji}</span>
              <span className="font-black text-gray-800 text-center" style={{fontSize:"clamp(13px,3.2vw,17px)"}}>{current.name}</span>
              <span className="text-gray-400 font-semibold" style={{fontSize:"clamp(9px,2vw,12px)"}}>{t.trashQuestion}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {feedback && (
            <motion.div initial={{scale:0,y:10}} animate={{scale:1,y:0}} exit={{scale:0,opacity:0}}
              className={`absolute left-1/2 -translate-x-1/2 top-2 px-5 py-2 rounded-2xl font-black text-white text-sm shadow-xl z-40 ${feedback.ok?"bg-green-500":"bg-red-500"}`}>
              {feedback.msg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bins */}
      <div className="relative z-20 flex gap-2 px-3 pb-4">
        {BINS.map(bin => {
          const binLabel = t.bins[bin.id];
          const binEx    = t.binExamples[bin.id];
          const isActive = activeBin===bin.id;
          const icons    = { blue:"♻️", brown:"🌿", gray:"🗑️" };
          return (
            <motion.button key={bin.id} onClick={()=>handleBin(bin.id)}
              whileTap={{scale:0.91}} whileHover={{y:-5,scale:1.04}}
              animate={isActive?{scale:0.88,y:4}:{}}
              className="flex-1 rounded-[1.4rem] overflow-hidden shadow-xl flex flex-col cursor-pointer focus:outline-none"
              style={{border:`3px solid ${bin.ring}`}}
              data-testid={`button-bin-${bin.id}`}>
              <motion.div animate={isActive?{scaleY:0.25,y:-4}:{scaleY:1,y:0}}
                style={{background:bin.lid,transformOrigin:"top"}}
                className="w-full py-2 flex justify-center">
                <div className="rounded-full bg-white/25 h-2" style={{width:"35%"}} />
              </motion.div>
              <div className="flex-1 flex flex-col items-center justify-center py-2 px-1 gap-0.5"
                style={{background:bin.bg}}>
                <span style={{fontSize:"clamp(20px,5.5vw,30px)"}}>{icons[bin.id]}</span>
                <span className="font-black text-center leading-tight" style={{color:bin.text,fontSize:"clamp(9px,2.2vw,13px)"}}>{binLabel}</span>
                <span className="text-center leading-tight opacity-70" style={{color:bin.text,fontSize:"clamp(7px,1.6vw,10px)"}}>{binEx}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Success */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}
            className="absolute inset-0 z-50 flex items-center justify-center" style={{background:"rgba(0,0,0,0.62)"}}>
            <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",bounce:0.55}}
              className="bg-white rounded-[2rem] p-8 text-center shadow-2xl max-w-xs w-full mx-4">
              <div className="text-6xl mb-3">🌱♻️</div>
              <h3 className="font-black text-green-700 mb-1" style={{fontSize:"clamp(18px,5vw,24px)"}}>{t.trashSuccess}</h3>
              <p className="text-gray-400 font-medium">{t.trashScore(correct,items.length)}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
