import { Button } from "../ui/button";
import Counter from "./Counter";
import PointsBar from "./PointsBar";
import ResultMap from "./ResultMap";

interface ResultProps {
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

const Result = ({
  actualCoordinates,
  guessCoordinates,
  distance,
  distanceUnit,
  score,
}: ResultProps) => {
  // const;
  // console.log("coordinates", actualCoordinates, guessCoordinates);
  console.log("RESULT SCORE ", score);

  return (
    <div className="relative h-full overflow-hidden rounded-lg lg:mx-5 lg:mb-5">
      <div
        className="absolute h-full w-full  z-10"
        // top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
      >
        <div className="flex justify-center items-center h-full ">
          <div className="flex flex-col gap-2 justify-center items-center  h-1/2 w-1/2 ">
            <div className="flex whitespace-nowrap text-[5vw] md:text-[4vw]  font-extrabold text-white dark:text-black">
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
      </div>
      <div className="absolute bg-gradient-to-b from-transparent to-purple-600 flex h-52 w-full justify-center items-end bottom-0 text-5xl z-10">
        <Button
          variant="secondary"
          className="flex  bg-green-500 text-white text-xl mb-3"
        >
          Next
        </Button>
      </div>
      <div className="h-full brightness-50">
        <ResultMap
          actualCoordinates={actualCoordinates}
          guessCoordinates={guessCoordinates}
          distance={distance}
        />
      </div>
    </div>
  );
};

export default Result;
