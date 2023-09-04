interface ResultProps {
  guessCoordinates: Coordinates;
  actualCoordinates: Coordinates;
  distance: number;
}

type Coordinates = {
  lat: number | undefined;
  lng: number | undefined;
};

const Result = ({
  actualCoordinates,
  guessCoordinates,
  distance,
}: ResultProps) => {
  // const;
  console.log("coordinates", actualCoordinates, guessCoordinates);
  console.log("DISTANCE", distance);

  return <div>Result</div>;
};

export default Result;
