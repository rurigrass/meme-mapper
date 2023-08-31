"use client";

import Map from "@/components/game/Map";
import TestMap from "@/components/game/TestMap";
import { db } from "@/lib/db";
import { MemeType } from "@/lib/validators/meme";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PageProps {
  meme: {
    createdAt: Date;
    creatorId: string | null; // Allow for null value
    fileUrl: string;
    id: string;
    lat: number;
    lng: number;
    name: string;
    updatedAt: Date;
    url: string;
    verified: boolean;
  };
}

const Game = ({ meme }: PageProps) => {
  //UI SHIZZLE
  const [isBig, setIsBig] = useState(false);
  const initialScreenSize = window.innerWidth;
  const [smallScreen, setSmallScreen] = useState(
    (initialScreenSize < 640) as boolean
  );

  useEffect(() => {
    const handleResize = () => setSmallScreen(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-screen pt-14">
      {meme && (
        <video className="rounded-md" autoPlay loop controls playsInline muted>
          <source src={meme.fileUrl as string} type="video/mp4" />
        </video>
      )}
      <motion.div
        className={`absolute bottom-0 right-0 rounded-lg overflow-hidden flex flex-col `}
        onMouseOver={() => setIsBig(true)}
        onMouseOut={() => setIsBig(false)}
        animate={{
          height: isBig ? 600 : 300,
          width: isBig ? "100%" : `${smallScreen ? "100%" : "50%"}`,
        }}
      >
        <TestMap />
        <div className="flex justify-center">Guess</div>
      </motion.div>
    </div>
  );
};

export default Game;
