"use client";

import { Average } from "next/font/google";
import ScoreBox from "./ScoreBox";

interface ScoresSectionProps {
  scores: {
    id: string;
    score: number;
    memeId: string;
    playerId: string;
  }[];
  numberOfLevels: number;
}

const ScoresSection = ({ scores, numberOfLevels }: ScoresSectionProps) => {
  const levelsPlayed = new Set(scores.map((score) => score.memeId));
  const numberOfLevelsPlayed = Array.from(levelsPlayed).length;
  const averageScore = +(
    scores.reduce((a, b) => a + b.score, 0) / scores.length
  ).toFixed(2);

  return (
    <div className="flex flex-col">
      <div className="text-xl mx-4 mb-3">Scores:</div>
      <div className="h-0.5 w-full bg-white"></div>
      <div className="flex justify-between gap-2 m-4">
        {/* <ScoreBox title={"second box"} /> */}
        <ScoreBox
          title={"Levels played"}
          primary={numberOfLevelsPlayed}
          secondary={numberOfLevels}
        />
        <ScoreBox title={"Average score"} primary={averageScore} />
      </div>
    </div>
  );
};

export default ScoresSection;
