"use client";

import MemeImage from "@/components/game/MemeImage";
import VideoPlayer from "@/components/game/VideoPlayer";
import { memeTypeApproved } from "@/lib/types";

type DetectiveMemeTypes = {
  meme: memeTypeApproved;
};

const DetectiveMemeContainer = ({ meme }: DetectiveMemeTypes) => {
  return (
    <>
      {meme.fileUrl.toString().includes("video/upload") ? (
        <VideoPlayer fileUrl={meme.fileUrl} />
      ) : (
        <MemeImage fileUrl={meme.fileUrl} />
      )}
    </>
  );
};

export default DetectiveMemeContainer;
