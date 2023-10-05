"use client";
import Counter from "./Counter";
import { Transition, motion } from "framer-motion";

interface PointBarProps {
  points: number;
}

const PointsBar = ({ points }: PointBarProps) => {
  const widthPercentage = (points / 5000) * 100;
  console.log(widthPercentage);

  const transition: Transition = {
    type: "tween",
    ease: "linear",
    duration: 1,
  };

  return (
    <div className="relative w-[75vw] md:w-[100%] h-6 flex justify-center items-center bg-yellow-500 rounded-full">
      <motion.div
        className="absolute left-0 rounded-l-full bg-purple-600 h-full"
        initial={{ width: 0 }}
        animate={{ width: `${widthPercentage}%` }}
        transition={transition}
      />
      <div className="text-white z-10">
        <Counter distance={points} />
      </div>
    </div>
  );
};

export default PointsBar;
