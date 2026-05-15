import { motion } from "framer-motion";

interface Props {
  totalPoints: number;
  onContinue: () => void;
}

export default function QuizIntroScreen({ totalPoints, onContinue }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 md:p-12 w-full max-w-md text-center"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          className="text-8xl mb-6 inline-block"
        >
          ♻️
        </motion.div>

        <h2 className="text-4xl font-black text-blue-600 mb-3">Muito bem!</h2>
        <p className="text-gray-600 text-xl font-medium mb-6">
          Você completou todas as missões!
        </p>

        <div className="bg-yellow-50 rounded-2xl p-4 mb-8 border-2 border-yellow-200">
          <span className="text-yellow-600 font-black text-3xl">⭐ {totalPoints} pontos</span>
          <p className="text-yellow-700 font-medium mt-1 text-sm">acumulados até agora</p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-5 mb-8 text-left">
          <h3 className="font-black text-blue-700 text-lg mb-2">Agora vem o Quiz! ❓</h3>
          <p className="text-blue-600 font-medium">
            Vamos testar se você sabe separar o lixo corretamente.
            Cada resposta certa vale <strong>30 pontos extras!</strong>
          </p>
        </div>

        <motion.button
          onClick={onContinue}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-2xl font-black shadow-lg shadow-blue-200"
          data-testid="button-start-quiz"
        >
          Iniciar Quiz! 🎯
        </motion.button>
      </motion.div>
    </div>
  );
}
