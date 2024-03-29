"use client";
import { useRandomMeme } from "@/lib/hooks/useRandomMeme";
import { Button } from "../ui/button";
import Counter from "./score/Counter";
import PointsBar from "./score/PointsBar";
import ResultMap from "./map/ResultMap";
import { useRouter } from "next/navigation";
import AppleResultMap from "./map/AppleResultMap";
import Score from "./score/Score";
import { memeType } from "@/lib/types";
import MemeInfo from "./meme-info/MemeInfo";
import HighscoreTable from "./highscores/HighscoreTable";
import DesktopResults from "./DesktopResults";
import MobileResults from "./MobileResults";

interface ResultsProps {
  screenSize: number;
  meme: memeType;
  guessCoordinates: Coordinates;
  actualCoordinates: Coordinates;
  distance: number;
  distanceUnit: string;
  score: number;
}

type Coordinates = {
  lat: number;
  lng: number;
};

const ResultsExperiment = ({
  screenSize,
  meme,
  actualCoordinates,
  guessCoordinates,
  distance,
  distanceUnit,
  score,
}: ResultsProps) => {
  const { MAPKIT_TOKEN: token } = process.env;
  const { data: randomMeme, isLoading: nextMemeLoading } = useRandomMeme(
    meme.id
  );

  return (
    <>
      {screenSize > 1024 ? (
        <DesktopResults
          token={token as string}
          meme={meme}
          randomMeme={randomMeme as string}
          nextMemeLoading={nextMemeLoading}
          actualCoordinates={actualCoordinates}
          guessCoordinates={guessCoordinates}
          distance={distance}
          distanceUnit={distanceUnit}
          score={score}
        />
      ) : (
        <MobileResults
          token={token as string}
          meme={meme}
          randomMeme={randomMeme as string}
          nextMemeLoading={nextMemeLoading}
          actualCoordinates={actualCoordinates}
          guessCoordinates={guessCoordinates}
          distance={distance}
          distanceUnit={distanceUnit}
          score={score}
        />
      )}
    </>
  );
};

export default ResultsExperiment;
