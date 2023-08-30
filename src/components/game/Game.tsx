"use client";

import Map from "@/components/game/Map";
import TestMap from "@/components/game/TestMap";
import { db } from "@/lib/db";

interface PageProps {
  meme: any;
}

const Game = ({ meme }: PageProps) => {
  return (
    <div className="flex flex-col h-screen justify-between pt-14">
      <div className="">Video goes here</div>
      <div>
        <TestMap />
        <div className="flex justify-center">Guess</div>
      </div>
    </div>
  );
};

export default Game;
