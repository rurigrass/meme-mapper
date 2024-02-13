import { Button } from "@/components/ui/button";
import AppleResultMap from "../AppleResultMap";
import MemeInfo from "../meme-info/MemeInfo";
import Score from "../score/Score";
import HighscoreTable from "../highscores/HighscoreTable";
import { memeType } from "@/lib/types";
import { useRouter } from "next/navigation";

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

const DesktopResults = ({
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
    <div className="h-full xl:container mx-2 grid grid-cols-5 gap-3 pb-1.5 ">
      <div className="rounded-md overflow-hidden h-full row-span-6 col-span-2">
        <AppleResultMap
          token={token as string}
          actualCoordinates={actualCoordinates}
          guessCoordinates={guessCoordinates}
          distance={distance}
        />
        {/* <ResultMap
        actualCoordinates={actualCoordinates}
        guessCoordinates={guessCoordinates}
        distance={distance}
      /> */}
      </div>
      <div className="block bg-orange-500 rounded-md h-full row-span-3 lg:col-span-3">
        <MemeInfo meme={meme} />
      </div>
      <div className=" h-full row-span-3 col-span-2 flex flex-col gap-3">
        <div className=" flex-grow bg-blue-500 rounded-md row-span-3 flex  justify-center items-center">
          <Score
            distanceUnit={distanceUnit}
            distance={distance}
            score={score}
          />
        </div>
        <div className=" bg-green-500 overflow-hidden rounded-md flex justify-center items-center">
          <Button
            variant="secondary"
            className="w-full h-full bg-green-600 text-white text-3xl hover:bg-green-500"
            onClick={() => {
              router.push(`/game/${randomMeme}`);
            }}
            disabled={nextMemeLoading}
          >
            Next
          </Button>
        </div>
      </div>
      {/* change below block to xl instead of lg */}
      <div className="hidden lg:block bg-purple-500 rounded-md row-span-3 col-span-1">
        <HighscoreTable />
      </div>
    </div>
  );
};

export default DesktopResults;
