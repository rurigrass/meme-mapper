"use client";
import Counter from "./Counter";
import { Transition, motion } from "framer-motion";

interface PointBarProps {
  points: number;
}

const PointsBar = ({ points }: PointBarProps) => {
  const widthPercentage = (points / 5000) * 100;
  // console.log(widthPercentage);

  const transition: Transition = {
    type: "tween",
    ease: "linear",
    duration: 1,
  };

  return (
    <div className="relative w-[75vw] md:w-[100%] h-6 flex justify-center items-center bg-yellow-500 rounded-full z-20">
      <motion.div
        className="absolute left-0 rounded-full bg-purple-600 h-full"
        initial={{ width: 0 }}
        animate={{ width: `${widthPercentage}%` }}
        transition={transition}
      >
        <motion.div
          className="absolute right-2 top-1 bg-purple-700 h-2 w-4 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        />
      </motion.div>
      <div className="flex text-white z-10 font-extrabold  ">
        <Counter distance={points} /> {"\xa0" + "points"}
      </div>
    </div>
  );
};

export default PointsBar;
