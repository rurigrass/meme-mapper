"use client";

import Map from "@/components/game/Map";
import TestMap from "@/components/game/TestMap";
import { db } from "@/lib/db";
import { MemeType } from "@/lib/validators/meme";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Result from "../result/Result";
import { distanceToScore, haversineDistance } from "@/lib/utils";
import VideoPlayer from "./VideoPlayer";
import MemeImage from "./MemeImage";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import MapContainer from "./MapContainer";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth";
import ResultsScreen from "../result/ResultsScreen";

interface GameProps {
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
  session: Session | null;
}

type Coordinates = {
  lat: number;
  lng: number;
};

const Game = ({ meme, session }: GameProps) => {
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
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

  //NEW ONE
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //CALCULATE AND PUSH THE SCORE
  const calcScore = () => {
    if (marker) {
      const guessCoordinates = marker;
      const actualCoordinates = { lat: meme.lat, lng: meme.lng };
      let distance = haversineDistance(actualCoordinates, guessCoordinates);
      const finalScore = distanceToScore(distance);
      setScore(finalScore);
      if (distance < 1) {
        setDistanceUnit("m"), (distance = distance * 1000);
      }
      setDistance(distance);
      setShowResult(true);
      pushScoreToDb(finalScore);
    } else {
      // Handle the case when marker is undefined
      console.error("Marker is undefined.");
    }
  };

  // const pushScoreToDb = (finalScore: number) => {
  //   console.log(finalScore);
  // };

  const { mutate: pushScoreToDb, isLoading } = useMutation({
    mutationFn: async (score: number) => {
      // if (session) {
      const payload = {
        memeId: meme.id,
        score,
      };
      // console.log(payload);
      const { data } = await axios.post("/api/game/push-score", payload);
      // console.log("DATA FROM THE POST: ", data);
      //it doesnt return anything
      // }
    },
  });

  return (
    <div className="relative h-full">
      {!showResult ? (
        <>
          {meme.fileUrl.toString().includes("video/upload") ? (
            <VideoPlayer fileUrl={meme.fileUrl as string} />
          ) : (
            //should have a specific height attribute
            <MemeImage fileUrl={meme.fileUrl as string} />
            // <MemeImage fileUrl="https://www.telegraph.co.uk/content/dam/news/2016/11/29/nickelback-look-at-this-graph_trans_NvBQzQNjv4BqAz3ogyoD1YDpdxYGZ0Xf4hOO1hauYrvb5hh90b3Ok8U.PNG?imwidth=680" />
          )}
          <MapContainer
            screenSize={screenSize}
            setMarker={(coordinates: Coordinates) => setMarker(coordinates)}
            marker={marker}
            makeGuess={calcScore}
          />
        </>
      ) : isLoading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-6xl">Loading...</p>
        </div>
      ) : (
        // <Result
        // memeId={meme.id}
        // actualCoordinates={{ lat: meme.lat, lng: meme.lng }}
        // guessCoordinates={marker || { lat: 0, lng: 0 }}
        // distance={distance}
        // distanceUnit={distanceUnit}
        // score={score}
        // />
        <ResultsScreen
          memeId={meme.id}
          actualCoordinates={{ lat: meme.lat, lng: meme.lng }}
          guessCoordinates={marker || { lat: 0, lng: 0 }}
          distance={distance}
          distanceUnit={distanceUnit}
          score={score}
        />
      )}
    </div>
  );
};

export default Game;
