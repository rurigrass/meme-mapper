import Counter from "./Counter";
import ResultMap from "./ResultMap";

interface ResultProps {
  guessCoordinates: Coordinates;
  actualCoordinates: Coordinates;
  distance: number;
}

type Coordinates = {
  lat: number;
  lng: number;
};

const Result = ({
  actualCoordinates,
  guessCoordinates,
  distance,
}: ResultProps) => {
  // const;
  console.log("coordinates", actualCoordinates, guessCoordinates);
  console.log("DISTANCE", distance);

  return (
    <div className="relative h-full overflow-hidden rounded-lg">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        {/* <Card className="w-72 h-52">{distance}</Card> */}
        <div className="text-[5vw] font-extrabold text-white dark:text-black">
          You were <Counter distance={+distance.toFixed(2)} /> Km away
        </div>
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
