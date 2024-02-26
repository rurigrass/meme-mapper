"use client";
import { useProgress } from "@react-three/drei";
import { reverse } from "dns";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { boolean } from "zod";
import MobileScore from "../result/score/MobileScore";

type LoadingScreenProps = {
  loadingEnded: boolean;
  setLoadingEnded: (value: boolean) => void;
};

const LoadingScreen = ({
  loadingEnded,
  setLoadingEnded,
}: LoadingScreenProps) => {
  const { progress, total, loaded, item } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setLoadingEnded(true);
      }, 500);
    }
  }, [progress, total, loaded, item]);

  //change animation
  // ${progress}

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 
      pointer-events-none flex flex-col items-center justify-center bg-orange-100 dark:bg-slate-950 ${
        loadingEnded ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="h-16">
        <motion.div
          initial={{ fontSize: "2rem" }}
          animate={{ fontSize: "2.5rem" }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            type: "spring",
            stiffness: 150,
            damping: 10,
          }}
          className="font-bold text-purple-700 relative"
        >
          {/* <div
            className="absolute left-0 top-0 overflow-hidden truncate text-clip transition-all duration-500"
            style={{ width: `50%` }}
          >
            MemeMappr
          </div> */}
          <div>MemeMappr</div>
        </motion.div>
      </div>
      <div className="w-64">
        <MobileScore score={progress} type="%" />
      </div>
    </div>
  );
};

export default LoadingScreen;
