"use Client";
import { useRandomMeme } from "@/lib/hooks/useRandomMeme";
import { Button } from "../ui/button";
import Counter from "./score/Counter";
import PointsBar from "./score/PointsBar";
import ResultMap from "./ResultMap";
import { useRouter } from "next/navigation";
import AppleResultMap from "./AppleResultMap";

interface ResultsScreenProps {
  memeId: string;
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

const ResultsScreen = ({
  memeId,
  actualCoordinates,
  guessCoordinates,
  distance,
  distanceUnit,
  score,
}: ResultsScreenProps) => {
  const router = useRouter();
  const { MAPKIT_TOKEN: token } = process.env;

  //it should post the memeId to the redis array
  //it should fetch the memes array from redis and pass it here
  const { data: randomMeme, isLoading } = useRandomMeme(memeId);

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
    <div className="h-full xl:container mx-2 grid grid-cols-1 lg:grid-cols-3 grid-rows-6 gap-3 pb-1.5">
      <div className="  rounded-md row-span-2 lg:row-span-6 overflow-hidden">
        <AppleResultMap
          token={token as string}
          actualCoordinates={actualCoordinates}
          guessCoordinates={guessCoordinates}
          distance={distance}
        />
      </div>
      <div className=" bg-orange-500 rounded-md row-span-3 lg:col-span-2">
        right
      </div>
      <div className=" bg-green-500 rounded-md row-span-1 lg:row-span-3">
        <div className="flex whitespace-nowrap text-[5vw] md:text-[2vw] font-extrabold text-white dark:text-black">
          You were
          <span className="mr-2" />
          <div className="flex text-yellow-400">
            <Counter distance={distance} decimals />
          </div>
          {distanceUnit} away
        </div>
        <PointsBar points={score} />
      </div>
      <div className="hidden lg:block bg-blue-500 rounded-md lg:row-span-3">
        right
      </div>
    </div>
  );
};

export default ResultsScreen;
