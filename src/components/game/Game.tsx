"use client";

import Map from "@/components/game/Map";
import TestMap from "@/components/game/TestMap";
import { db } from "@/lib/db";
import { MemeType } from "@/lib/validators/meme";

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
  console.log(meme);

  return (
    <div className="relative h-screen pt-14">
      {meme && (
        <video className="rounded-md" autoPlay loop controls playsInline muted>
          <source src={meme.fileUrl as string} type="video/mp4" />
        </video>
      )}
      <div className="absolute bottom-0 w-full">
        <TestMap />
        <div className="flex justify-center">Guess</div>
      </div>
    </div>
  );
};

export default Game;
