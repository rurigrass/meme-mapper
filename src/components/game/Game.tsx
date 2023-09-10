"use client";

import Map from "@/components/game/Map";
import TestMap from "@/components/game/TestMap";
import { db } from "@/lib/db";
import { MemeType } from "@/lib/validators/meme";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Result from "./Result";
import { haversineDistance } from "@/lib/utils";
import VideoPlayer from "./VideoPlayer";

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

type Coordinates = {
  lat: number;
  lng: number;
};

const Game = ({ meme }: PageProps) => {
  //TOGGLE GAME AND RESULT SCREEN
  const [showResult, setShowResult] = useState<Boolean>(false);
  const [distance, setDistance] = useState<number>(0);
  //PINSTUFF
  const [marker, setMarker] = useState<Coordinates | undefined>(undefined);

  //UI SHIZZLE
  const [expandMap, setExpandMap] = useState(false);

  //SCREENSIZE SHIZZLE
  const initialScreenSize = window.innerWidth;
  //it would probs be best to have screensizes saved in an object like a plus object or something
  const [smallScreen, setSmallScreen] = useState(
    (initialScreenSize < 640) as boolean
  );
  const [bigScreen, setBigScreen] = useState(
    (initialScreenSize > 1024) as boolean
  );
  //ScreenSize checker //  probs need a bigScreen one too
  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 640);
      setBigScreen(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //CALCULATE AND PUSH THE SCORE
  const calcScore = (
    guessCoordinates: Coordinates,
    actualCoordinates: Coordinates
  ) => {
    const distance = haversineDistance(actualCoordinates, guessCoordinates);

    setDistance(distance);
    setShowResult(true);
  };

  return (
    <div className="relative h-full mb-1.5">
      {!showResult ? (
        <>
          {meme && <VideoPlayer fileUrl={meme.fileUrl as string} />}
          <motion.div
            className={`absolute bottom-0 right-0 overflow-hidden rounded-lg flex flex-col `}
            onMouseOver={() => setExpandMap(true)}
            onMouseOut={() => setExpandMap(false)}
            // instead of big screen small screen it could just take screensize or something? less hooks
            animate={{
              height: expandMap ? 600 : 300,
              width: expandMap
                ? `${bigScreen ? "50%" : "100%"}`
                : `${smallScreen ? "100%" : "500px"}`,
            }}
          >
            <TestMap
              //   initCoordinates={{ lat: meme.lat, lng: meme.lng }}
              updateCoordinates={(lat: number, lng: number) =>
                setMarker({ lat, lng })
              }
            />
            {marker && (
              <Button
                className="flex justify-center py-2 rounded-t-none bg-green-600 hover:bg-green-500 text-white font-bold"
                onClick={() =>
                  (marker.lat && marker.lng) !== undefined
                    ? calcScore(marker, { lat: meme.lat, lng: meme.lng })
                    : console.log("nothing")
                }
                disabled={marker.lat === 0 && marker.lng === 0}
              >
                Guess
              </Button>
            )}
          </motion.div>
        </>
      ) : (
        marker && (
          <Result
            actualCoordinates={{ lat: meme.lat, lng: meme.lng }}
            guessCoordinates={marker}
            distance={distance}
          />
        )
      )}
    </div>
  );
};

export default Game;
