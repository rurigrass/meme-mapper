"use Client";
import { useRandomMeme } from "@/lib/hooks/useRandomMeme";
import { Button } from "../ui/button";
import Counter from "./Counter";
import PointsBar from "./PointsBar";
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
    <div className=" lg:mx-5 h-full grid grid-cols-1 md:grid-cols-2 grid-rows-3 gap-2 md:gap-3">
      <div className=" overflow-hidden rounded-md">
        <AppleResultMap
          token={token as string}
          actualCoordinates={actualCoordinates}
          guessCoordinates={guessCoordinates}
          distance={distance}
        />
      </div>
      <div className="flex flex-col justify-center items-center bg-orange-500 rounded-md">
        <div className="flex flex-col items-center">
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
      </div>
      <div className=" bg-purple-500 rounded-md">right</div>
      <div className=" bg-blue-500 rounded-md">right</div>
      <div className="bg-gray-500  md:col-span-2 h-16 rounded-md ">final</div>
    </div>
  );
};

export default ResultsScreen;
