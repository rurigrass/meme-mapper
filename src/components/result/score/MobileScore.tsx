import Counter from "./Counter";
import PointsBar from "./PointsBar";

interface MobileScoreProps {
  distanceUnit?: string;
  distance?: number;
  score: number;
  type: string;
}

const MobileScore = ({
  distanceUnit,
  distance,
  score,
  type,
}: MobileScoreProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <PointsBar points={score} type={type} />
    </div>
  );
};

export default MobileScore;
