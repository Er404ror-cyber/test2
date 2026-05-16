import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Lang, TRANSLATIONS } from "@/i18n";

interface Props {
  playerName: string;
  totalPoints: number;
  maxPoints: number;
  lang: Lang;
  onRestart: () => void;
}

function getStars(pts: number, max: number): 1 | 2 | 3 {
  const pct = pts / max;
  if (pct >= 0.85) return 3;
  if (pct >= 0.55) return 2;
  return 1;
}

const CONFETTI = Array.from({ length: 38 }, (_, i) => ({
  color: ["#22c55e","#10b981","#3b82f6","#f59e0b","#8b5cf6","#ec4899","#f97316"][i % 7],
  x: Math.random() * 100,
  delay: Math.random() * 1.4,
  size: 6 + Math.random() * 8,
  duration: 2.2 + Math.random() * 1.8,
}));

export default function EndScreen({ playerName, totalPoints, maxPoints, lang, onRestart }: Props) {
  const [confetti, setConfetti] = useState(true);
  const t      = TRANSLATIONS[lang];
  const stars  = getStars(totalPoints, maxPoints);
  const bIndex = 3 - stars; // badge array index (0=3stars, 1=2stars, 2=1star)

  useEffect(() => {
    const id = setTimeout(() => setConfetti(false), 4000);
    return () => clearTimeout(id);
  }, []);

  const impactValues = [
    `${totalPoints * 2}L`,
    `${Math.round(totalPoints * 0.5)}Wh`,
    `${Math.min(3, Math.round(totalPoints / 80))}`,
  ];

  const badgeEmoji = ["🏆", "🥈", "🌱"][bIndex];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(145deg,#064e3b 0%,#065f46 30%,#0f766e 65%,#0369a1 100%)", fontFamily: "Outfit, sans-serif" }}>

      {/* Confetti */}
      {confetti && CONFETTI.map((c, i) => (
        <motion.div key={i} className="absolute rounded-sm pointer-events-none"
          style={{ left:`${c.x}%`, top:"-4%", width:c.size, height:c.size, backgroundColor:c.color, rotate: Math.random()*360 }}
          animate={{ y:["0vh","110vh"], rotate:[0, 680*(Math.random()>0.5?1:-1)], opacity:[1,1,0] }}
          transition={{ duration:c.duration, delay:c.delay, ease:"easeIn" }} />
      ))}

      <motion.div
        initial={{ opacity:0, y:50, scale:0.88 }}
        animate={{ opacity:1, y:0, scale:1 }}
        transition={{ type:"spring", bounce:0.38, delay:0.1 }}
        className="relative z-10 w-full flex flex-col items-center"
        style={{ maxWidth: 400 }}
      >
        {/* Badge */}
        <motion.div initial={{ scale:0, rotate:-180 }} animate={{ scale:1, rotate:0 }}
          transition={{ type:"spring", bounce:0.55, delay:0.35 }}
          style={{ fontSize:"clamp(56px,14vw,80px)", filter:"drop-shadow(0 6px 20px rgba(0,0,0,0.4))" }}>
          {badgeEmoji}
        </motion.div>

        <h2 className="font-black text-white mt-2 text-center" style={{ fontSize:"clamp(22px,5.5vw,30px)", textShadow:"0 2px 12px rgba(0,0,0,0.4)" }}>
          {t.badge[bIndex]}
        </h2>
        <p className="text-green-200 font-semibold text-center mt-1 mb-4"
          style={{ fontSize:"clamp(13px,3vw,16px)" }}>
          {t.congrats}, <span className="text-white font-black">{playerName}</span>!
        </p>

        {/* Stars */}
        <div className="flex justify-center gap-3 mb-4">
          {[1,2,3].map(s => (
            <motion.span key={s}
              initial={{ scale:0, rotate:-25 }}
              animate={{ scale: s<=stars ? 1 : 0.6, rotate:0, opacity: s<=stars ? 1 : 0.2 }}
              transition={{ delay:0.5+s*0.1, type:"spring", bounce:0.55 }}
              style={{ fontSize:"clamp(36px,9vw,52px)", filter: s<=stars ? "drop-shadow(0 0 8px rgba(251,191,36,0.7))" : "none" }}>
              ⭐
            </motion.span>
          ))}
        </div>

        {/* Score card */}
        <motion.div initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
          transition={{ delay:0.8 }}
          className="w-full rounded-[1.8rem] py-4 px-5 mb-4 text-center"
          style={{ background:"linear-gradient(135deg,#fbbf24,#f97316)", boxShadow:"0 8px 32px rgba(251,191,36,0.35)" }}>
          <p className="text-white font-black" style={{ fontSize:"clamp(30px,8vw,42px)" }}>{totalPoints}</p>
          <p className="text-white/70 font-semibold" style={{ fontSize:"clamp(11px,2.5vw,14px)" }}>
            {t.ptsOf(totalPoints, maxPoints)}
          </p>
        </motion.div>

        {/* Impact grid */}
        <div className="grid grid-cols-3 gap-2 w-full mb-4">
          {t.impacts.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.95+i*0.1 }}
              className="rounded-2xl flex flex-col items-center py-3 px-1"
              style={{ background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)" }}>
              <span style={{ fontSize:"clamp(18px,4.5vw,26px)" }}>{item.emoji}</span>
              <span className="font-black text-white" style={{ fontSize:"clamp(12px,3vw,16px)" }}>
                {impactValues[i]}
              </span>
              <span className="text-white/55 text-center leading-tight" style={{ fontSize:"clamp(7px,1.6vw,10px)" }}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Sub badge message */}
        <p className="text-white/45 italic text-center mb-5 px-4"
          style={{ fontSize:"clamp(10px,2.2vw,13px)" }}>
          "{t.badgeSub[bIndex]}"
        </p>

        {/* Play again */}
        <motion.button
          onClick={onRestart}
          whileTap={{ scale:0.95 }} whileHover={{ scale:1.03, y:-2 }}
          className="w-full rounded-2xl font-black text-white shadow-xl"
          style={{
            padding:"clamp(14px,3.5vw,20px)",
            fontSize:"clamp(15px,3.8vw,20px)",
            background:"linear-gradient(135deg,#22c55e,#10b981)",
            boxShadow:"0 8px 28px rgba(34,197,94,0.35)",
          }}
          data-testid="button-restart">
          {t.playAgain}
        </motion.button>
      </motion.div>
    </div>
  );
}
