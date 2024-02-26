"use client";
import Counter from "./Counter";
import { Transition, motion } from "framer-motion";

interface PointBarProps {
  points: number;
  type: string;
}

const PointsBar = ({ points, type }: PointBarProps) => {
  const widthPercentage = type === "points" ? (points / 5000) * 100 : points;
  // console.log(widthPercentage);

  const transition: Transition = {
    type: "tween",
    ease: "linear",
    duration: 1,
  };

  return (
    <div className="relative h-5 w-full lg:w-[90%] flex justify-center items-center bg-yellow-500 rounded-full z-20 lg:m-2">
      <motion.div
        className="absolute left-0 rounded-full bg-purple-600 h-full"
        initial={{ width: 0 }}
        animate={{ width: `${widthPercentage}%` }}
        transition={transition}
      >
        <motion.div
          className="absolute right-2 top-1 bg-purple-700 h-2 w-[20%] rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        />
      </motion.div>
      <div className="flex text-white z-10 font-extrabold  ">
        <Counter distance={points} /> {"\xa0" + type}
      </div>
    </div>
  );
};

export default PointsBar;
