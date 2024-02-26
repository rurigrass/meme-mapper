import Counter from "./Counter";
import PointsBar from "./PointsBar";

interface ScoreProps {
  distanceUnit: string;
  distance: number;
  score: number;
  type: string;
}

const Score = ({ distanceUnit, distance, score, type }: ScoreProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-center items-center whitespace-nowrap text-[5vw] lg:text-3xl font-extrabold text-white dark:text-black">
        You were
        <span className="mr-2" />
        <div className="flex text-yellow-400">
          <Counter distance={distance} decimals />
        </div>
        {distanceUnit} away
      </div>
      <PointsBar points={score} type={type} />
    </div>
  );
};

export default Score;
