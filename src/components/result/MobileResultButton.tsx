"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import MemeInfo from "./meme-info/MemeInfo";
import { memeType } from "@/lib/types";

type MobileResultButtonProps = {
  meme: memeType;
};

const MobileResultButton = ({ meme }: MobileResultButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const variants = {
    open: {
      width: "97%",
      height: "75%",
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      width: "2.5rem",
      transition: {
        duration: 0.75,
        delay: 0.1,
        type: "tween",
        ease: [0.3, 0.2, 0, 1],
      },
    },
  };

  return (
    <>
      <motion.div
        className="absolute bottom-1 right-1 h-10 sm:h-12 w-24 sm:w-32 rounded-lg bg-gray-300 dark:bg-purple-600"
        variants={variants}
        animate={isOpen ? "open" : "closed"}
        initial={"closed"}
      >
        {isOpen && <MemeInfo meme={meme} />}
      </motion.div>
      <div
        className="absolute bottom-1 right-1 h-10 w-24 sm:h-12 sm:w-32  bg-orange-500  rounded-lg hover:cursor-pointer text-black overflow-hidden"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ top: isOpen ? "-100% " : "0" }}
          transition={{
            duration: 0.5,
            type: "tween",
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div className="h-full w-full flex items-center justify-center ">
            <p>more</p>
          </div>
          <div className="h-full w-full  flex items-center justify-center   bg-red-500">
            <p>close</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default MobileResultButton;
