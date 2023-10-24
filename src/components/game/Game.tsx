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
import MemeImage from "./MemeImage";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

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
  const [distanceUnit, setDistanceUnit] = useState<string>("km");
  const [score, setScore] = useState<number>(0);
  //PINSTUFF
  const [marker, setMarker] = useState<Coordinates | undefined>(undefined);

  //UI SHIZZLE
  const [expandMap, setExpandMap] = useState(false);
  const [lockMap, setLockMap] = useState(false);

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
    let distance = haversineDistance(actualCoordinates, guessCoordinates);
    if (distance < 1) {
      setDistanceUnit("m"), (distance = distance * 1000);
    }
    setDistance(distance);
    setShowResult(true);
  };

  return (
    <div className="relative h-full mb-1.5">
      {!showResult ? (
        <>
          {meme.fileUrl.toString().includes("video/upload") ? (
            <VideoPlayer fileUrl={meme.fileUrl as string} />
          ) : (
            //should have a specific height attribute
            // <MemeImage fileUrl={meme.fileUrl as string} />
            <MemeImage fileUrl="https://www.telegraph.co.uk/content/dam/news/2016/11/29/nickelback-look-at-this-graph_trans_NvBQzQNjv4BqAz3ogyoD1YDpdxYGZ0Xf4hOO1hauYrvb5hh90b3Ok8U.PNG?imwidth=680" />
          )}
          <motion.div
            className={`absolute bottom-0 right-0 overflow-hidden rounded-lg flex flex-col `}
            // instead of big screen small screen it could just take screensize or something? less hooks
            animate={{
              height: expandMap ? 500 : "39%",
              width: expandMap
                ? `${bigScreen ? "50%" : "100%"}`
                : `${smallScreen ? "100%" : "500px"}`,
            }}
          >
            <div
              className={`h-full overflow-hidden flex flex-col rounded-lg relative`}
              onMouseOver={() => setExpandMap(true)}
              onMouseOut={() => setExpandMap(false)}
            >
              {smallScreen && (
                <div className="absolute top-0 right-0 z-10">
                  {expandMap ? (
                    <ArrowBigDown
                      className="h-5 w-5 p-[0.1rem] m-1 bg-black rounded-xl fill-white    hover:cursor-pointer"
                      onClick={() => setExpandMap(!expandMap)}
                    />
                  ) : (
                    <ArrowBigUp
                      className="h-5 w-5 p-[0.1rem] m-1 bg-black rounded-xl fill-white   hover:cursor-pointer"
                      onClick={() => setExpandMap(!expandMap)}
                    />
                  )}
                </div>
              )}
              <TestMap
                //   initCoordinates={{ lat: meme.lat, lng: meme.lng }}
                updateCoordinates={(lat: number, lng: number) =>
                  setMarker({ lat, lng })
                }
              />
              <div className=" bg-white">
                {marker && (
                  <Button
                    className="flex justify-center w-full py-2 rounded-t-none bg-green-600 hover:bg-green-500 text-white font-bold"
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
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        marker && (
          <Result
            actualCoordinates={{ lat: meme.lat, lng: meme.lng }}
            guessCoordinates={marker}
            distance={distance}
            distanceUnit={distanceUnit}
            score={score}
          />
        )
      )}
    </div>
  );
};

export default Game;
