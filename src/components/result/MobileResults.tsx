import { Button } from "@/components/ui/button";
import AppleResultMap from "./map/AppleResultMap";
import MemeInfo from "./meme-info/MemeInfo";
import Score from "./score/Score";
import HighscoreTable from "./highscores/HighscoreTable";
import { memeType } from "@/lib/types";
import { useRouter } from "next/navigation";
import MobileScore from "./score/MobileScore";
import MobileResultButton from "./MobileResultButton";

type DesktopResults = {
  token: string;
  meme: memeType;
  randomMeme: string;
  nextMemeLoading: boolean;
  guessCoordinates: Coordinates;
  actualCoordinates: Coordinates;
  distance: number;
  distanceUnit: string;
  score: number;
};

type Coordinates = {
  lat: number;
  lng: number;
};

const MobileResults = ({
  token,
  meme,
  randomMeme,
  nextMemeLoading,
  actualCoordinates,
  guessCoordinates,
  distance,
  distanceUnit,
  score,
}: DesktopResults) => {
  const router = useRouter();

  return (
    <div className="h-full  mx-2  pb-1.5 flex flex-col gap-1.5 ">
      <MobileScore
        distanceUnit={distanceUnit}
        distance={distance}
        score={score}
        type="points"
      />
      <div className="h-full relative flex-grow rounded-xl overflow-hidden">
        <AppleResultMap
          token={token as string}
          actualCoordinates={actualCoordinates}
          guessCoordinates={guessCoordinates}
          distance={distance}
        />
        <MobileResultButton meme={meme} />
      </div>
      <div>
        <Button
          variant="secondary"
          className="w-full h-full bg-green-600 text-white text-3xl hover:bg-green-500 rounded-xl"
          onClick={() => {
            router.push(`/game/${randomMeme}`);
          }}
          disabled={nextMemeLoading}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MobileResults;
