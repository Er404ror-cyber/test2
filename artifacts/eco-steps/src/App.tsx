import { useState } from "react";
import { Toaster } from "sonner";
import { MISSIONS, RECYCLING_QUIZ, GameScreen } from "@/data/game-data";
import StartScreen from "@/screens/StartScreen";
import MissionScreen from "@/screens/MissionScreen";
import QuizIntroScreen from "@/screens/QuizIntroScreen";
import QuizScreen from "@/screens/QuizScreen";
import EndScreen from "@/screens/EndScreen";

export default function App() {
  const [screen, setScreen] = useState<GameScreen>("start");
  const [playerName, setPlayerName] = useState("");
  const [missionIndex, setMissionIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleStart = (name: string) => {
    setPlayerName(name);
    setMissionIndex(0);
    setQuizIndex(0);
    setTotalPoints(0);
    setCorrectAnswers(0);
    setScreen("mission");
  };

  const handleMissionComplete = (points: number) => {
    const newPoints = totalPoints + points;
    setTotalPoints(newPoints);
    const next = missionIndex + 1;
    if (next >= MISSIONS.length) {
      setScreen("quiz-intro");
    } else {
      setMissionIndex(next);
    }
  };

  const handleQuizAnswer = (correct: boolean) => {
    const gained = correct ? 30 : 0;
    setTotalPoints((p) => p + gained);
    if (correct) setCorrectAnswers((c) => c + 1);
    const next = quizIndex + 1;
    if (next >= RECYCLING_QUIZ.length) {
      setScreen("end");
    } else {
      setQuizIndex(next);
    }
  };

  const handleRestart = () => {
    setScreen("start");
  };

  return (
    <>
      {screen === "start" && (
        <StartScreen onStart={handleStart} />
      )}
      {screen === "mission" && (
        <MissionScreen
          playerName={playerName}
          missionIndex={missionIndex}
          totalPoints={totalPoints}
          onComplete={handleMissionComplete}
        />
      )}
      {screen === "quiz-intro" && (
        <QuizIntroScreen
          totalPoints={totalPoints}
          onContinue={() => setScreen("quiz")}
        />
      )}
      {screen === "quiz" && (
        <QuizScreen
          questionIndex={quizIndex}
          totalPoints={totalPoints}
          onAnswer={handleQuizAnswer}
        />
      )}
      {screen === "end" && (
        <EndScreen
          playerName={playerName}
          totalPoints={totalPoints}
          correctAnswers={correctAnswers}
          onRestart={handleRestart}
        />
      )}
      <Toaster richColors position="top-center" />
    </>
  );
}
