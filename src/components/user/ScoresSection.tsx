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
  const averageScore = scores;
  //   console.log(numberOfLevelsPlayed);

  return (
    <div className="flex flex-col m-4">
      <div>ScoresSection</div>
      <div className="flex justify-between gap-2">
        {/* <ScoreBox title={"second box"} /> */}
        <ScoreBox
          title={"Levels played"}
          primary={numberOfLevelsPlayed}
          secondary={numberOfLevels}
        />
        <ScoreBox title={"Average score"} />
      </div>
    </div>
  );
};

export default ScoresSection;
