"use client";
import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { boolean } from "zod";

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

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none flex items-center justify-center bg-orange-100 dark:bg-slate-950 ${
        loadingEnded ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-4xl md:text-8xl font-bold text-purple-700 relative">
        <div
          className="absolute left-0 top-0 overflow-hidden truncate text-clip transition-all duration-500"
          style={{ width: `${progress}%` }}
        >
          MemeMappr
        </div>
        <div className="opacity-40">MemeMappr</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
