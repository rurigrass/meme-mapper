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
  }, [progress, total, loaded, item, setLoadingEnded]);

  //change animation
  // ${progress}

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 scroll-p-0 
      pointer-events-none flex flex-col items-center justify-center bg-orange-100 dark:bg-slate-950 ${
        loadingEnded ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="h-16">
        <div className="font-bold text-purple-700 relative text-5xl">
          <div>MemeMappr</div>
        </div>
      </div>
      <div className="w-64">
        <MobileScore score={progress} type="%" />
      </div>
    </div>
  );
};

export default LoadingScreen;
