"use client";
import Counter from "./Counter";

interface PointBarProps {
  points: number;
}

const PointsBar = ({ points }: PointBarProps) => {
  return (
    <div className=" w-[75vw] h-6 flex justify-center items-center bg-yellow-500 rounded-full">
      <div className="text-white">
        <Counter distance={points} />
      </div>
    </div>
  );
};

export default PointsBar;
