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
    <div className="absolute inset-0 pt-14">
      <div className="overflow-hidden h-full">
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
