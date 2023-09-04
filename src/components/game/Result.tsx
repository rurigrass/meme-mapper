interface ResultProps {
  guessCoordinates: Coordinates;
  actualCoordinates: Coordinates;
}

type Coordinates = {
  lat: number | undefined;
  lng: number | undefined;
};

const Result = ({ actualCoordinates, guessCoordinates }: ResultProps) => {
  // const;
  console.log("coordinates", actualCoordinates, guessCoordinates);

  return <div>Result</div>;
};

export default Result;
