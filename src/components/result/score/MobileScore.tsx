import Counter from "./Counter";
import PointsBar from "./PointsBar";

interface MobileScoreProps {
  distanceUnit: string;
  distance: number;
  score: number;
}

const MobileScore = ({ distanceUnit, distance, score }: MobileScoreProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <PointsBar points={score} />
    </div>
  );
};

export default MobileScore;
