import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { RecyclingQuestion, RECYCLING_QUIZ } from "@/data/game-data";

interface Props {
  questionIndex: number;
  totalPoints: number;
  onAnswer: (correct: boolean) => void;
}

type BinChoice = "recicla" | "organico" | "comum";

const BINS: { key: BinChoice; label: string; emoji: string; color: string; bg: string }[] = [
  { key: "recicla", label: "Reciclável", emoji: "🔵", color: "border-blue-400 text-blue-700", bg: "bg-blue-50 hover:bg-blue-100" },
  { key: "organico", label: "Orgânico", emoji: "🟤", color: "border-amber-500 text-amber-700", bg: "bg-amber-50 hover:bg-amber-100" },
  { key: "comum", label: "Lixo Comum", emoji: "⚫", color: "border-gray-400 text-gray-700", bg: "bg-gray-50 hover:bg-gray-100" },
];

export default function QuizScreen({ questionIndex, totalPoints, onAnswer }: Props) {
  const [chosen, setChosen] = useState<BinChoice | null>(null);
  const question: RecyclingQuestion = RECYCLING_QUIZ[questionIndex];
  const progress = ((questionIndex) / RECYCLING_QUIZ.length) * 100;
  const isCorrect = chosen === question.correct;

  const handleChoose = (choice: BinChoice) => {
    if (chosen) return;
    setChosen(choice);
    setTimeout(() => onAnswer(choice === question.correct), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex flex-col">

      <div className="px-6 pt-6 pb-2">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-gray-500">
            Pergunta {questionIndex + 1} de {RECYCLING_QUIZ.length}
          </span>
          <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
            <span className="text-yellow-600 font-black">⭐ {totalPoints}</span>
          </div>
        </div>
        <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-[2rem] p-8 text-center shadow-xl mb-6 border-2 border-blue-100">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-4 inline-block"
            >
              {question.emoji}
            </motion.div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">Onde jogar?</h2>
            <p className="text-4xl font-black text-blue-600">{question.item}</p>
          </div>

          <div className="flex flex-col gap-3">
            {BINS.map((bin) => {
              const isChosen = chosen === bin.key;
              const isRight = bin.key === question.correct;
              let extraClass = "";
              if (chosen) {
                if (isRight) extraClass = "border-green-400 bg-green-50 scale-105";
                else if (isChosen && !isRight) extraClass = "border-red-400 bg-red-50 opacity-70";
                else extraClass = "opacity-40";
              }

              return (
                <motion.button
                  key={bin.key}
                  onClick={() => handleChoose(bin.key)}
                  whileTap={!chosen ? { scale: 0.97 } : {}}
                  className={`w-full py-4 px-5 rounded-2xl border-2 font-bold text-xl flex items-center gap-4 transition-all ${bin.color} ${bin.bg} ${extraClass}`}
                  data-testid={`button-bin-${bin.key}`}
                >
                  <span className="text-3xl">{bin.emoji}</span>
                  <span>{bin.label}</span>
                  {chosen && isRight && <CheckCircle className="w-7 h-7 text-green-500 ml-auto" />}
                  {chosen && isChosen && !isRight && <XCircle className="w-7 h-7 text-red-500 ml-auto" />}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {chosen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-5 p-4 rounded-2xl border-2 font-medium text-base ${isCorrect ? "bg-green-50 border-green-300 text-green-800" : "bg-red-50 border-red-300 text-red-800"}`}
              >
                <span className="font-black text-xl mr-2">{isCorrect ? "✅ Correto!" : "❌ Errou!"}</span>
                {question.explanation}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
