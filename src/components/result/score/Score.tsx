import Counter from "./Counter";
import PointsBar from "./PointsBar";

interface ScoreProps {
  distanceUnit: string;
  distance: number;
  score: number;
}

const Score = ({ distanceUnit, distance, score }: ScoreProps) => {
  return (
    <div>
      <div className="flex justify-center items-center whitespace-nowrap text-[5vw] md:text-[2vw] font-extrabold text-white dark:text-black">
        You were
        <span className="mr-2" />
        <div className="flex text-yellow-400">
          <Counter distance={distance} decimals />
        </div>
        {distanceUnit} away
      </div>
      <PointsBar points={score} />
    </div>
  );
};

export default Score;
