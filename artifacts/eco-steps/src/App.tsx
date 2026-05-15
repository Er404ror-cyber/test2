import { useState } from "react";
import { Toaster } from "sonner";
import { SCENES } from "@/data/game-data";
import StartScreen from "@/screens/StartScreen";
import SceneWrapper from "@/screens/SceneWrapper";
import EndScreen from "@/screens/EndScreen";
import LightsScene from "@/scenes/LightsScene";
import TrashScene from "@/scenes/TrashScene";
import TapsScene from "@/scenes/TapsScene";

type Screen = "start" | "game" | "end";

const MAX_POINTS = 260;

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [playerName, setPlayerName] = useState("");
  const [sceneIndex, setSceneIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const handleStart = (name: string) => {
    setPlayerName(name);
    setSceneIndex(0);
    setTotalPoints(0);
    setScreen("game");
  };

  const handleSceneComplete = (points: number) => {
    const newTotal = totalPoints + points;
    setTotalPoints(newTotal);
    const next = sceneIndex + 1;
    if (next >= SCENES.length) {
      setScreen("end");
    } else {
      setSceneIndex(next);
    }
  };

  const handleRestart = () => {
    setScreen("start");
  };

  const currentScene = SCENES[sceneIndex];

  const renderScene = () => {
    const props = {
      onComplete: handleSceneComplete,
      totalPoints,
      sceneIndex,
      totalScenes: SCENES.length,
    };
    if (currentScene.id === "lights") return <LightsScene {...props} />;
    if (currentScene.id === "trash") return <TrashScene {...props} />;
    if (currentScene.id === "taps") return <TapsScene {...props} />;
    return null;
  };

  return (
    <>
      {screen === "start" && <StartScreen onStart={handleStart} />}

      {screen === "game" && currentScene && (
        <SceneWrapper
          scene={currentScene}
          sceneIndex={sceneIndex}
          totalScenes={SCENES.length}
          totalPoints={totalPoints}
        >
          {renderScene()}
        </SceneWrapper>
      )}

      {screen === "end" && (
        <EndScreen
          playerName={playerName}
          totalPoints={totalPoints}
          maxPoints={MAX_POINTS}
          onRestart={handleRestart}
        />
      )}

      <Toaster richColors position="top-center" />
    </>
  );
}
