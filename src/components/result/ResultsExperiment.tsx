"use client";
import { useRandomMeme } from "@/lib/hooks/useRandomMeme";
import { Button } from "../ui/button";
import Counter from "./score/Counter";
import PointsBar from "./score/PointsBar";
import ResultMap from "./ResultMap";
import { useRouter } from "next/navigation";
import AppleResultMap from "./AppleResultMap";
import Score from "./score/Score";
import { memeType } from "@/lib/types";
import MemeInfo from "./meme-info/MemeInfo";
import HighscoreTable from "./highscores/HighscoreTable";

interface ResultsExperimentProps {
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
  meme,
  actualCoordinates,
  guessCoordinates,
  distance,
  distanceUnit,
  score,
}: ResultsExperimentProps) => {
  const router = useRouter();
  const { MAPKIT_TOKEN: token } = process.env;

  //it should post the memeId to the redis array
  //it should fetch the memes array from redis and pass it here
  const { data: randomMeme, isLoading } = useRandomMeme(meme.id);

  // const { data } = useQuery({
  //   queryKey: ["randomMeme"],
  //   queryFn: async () => {
  //     const payload = {
  //       memeId,
  //     };
  //     const { data } = await axios.get("/api/game/random", payload);
  //     return data as string;
  //   },
  // });
  // console.log("SWAG ", memeId);

  return (
    <div className="h-full xl:container mx-2 flex flex-col lg:grid lg:grid-cols-5 lg:gap-3 pb-1.5 ">
      <div className=" rounded-xl lg:rounded-md overflow-hidden h-full lg:h-full lg:row-span-6 lg:col-span-2">
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
      <div className="hidden lg:block lg:bg-orange-500 lg:rounded-md h-[35%] lg:h-full lg:row-span-3 lg:col-span-3">
        <MemeInfo meme={meme} />
      </div>
      <div className="h-[18%] lg:h-full lg:row-span-3 lg:col-span-2 grid grid-rows-4 lg:gap-3">
        <div className="lg:bg-blue-500 lg:rounded-md lg:row-span-3 row-span-2 flex justify-center items-center">
          <Score
            distanceUnit={distanceUnit}
            distance={distance}
            score={score}
          />
        </div>
        <div className=" bg-green-500 rounded-xl overflow-hidden lg:rounded-md lg:row-span-1 flex justify-center items-center">
          <Button
            variant="secondary"
            className="w-full h-full bg-green-600 text-white text-3xl hover:bg-green-500"
            onClick={() => {
              router.push(`/game/${randomMeme}`);
            }}
            disabled={isLoading}
          >
            Next
          </Button>
        </div>
      </div>
      {/* change below block to xl instead of lg */}
      <div className="hidden lg:block bg-purple-500 rounded-md lg:row-span-3 lg:col-span-1">
        <HighscoreTable />
      </div>
    </div>
  );
};

export default ResultsExperiment;
