"use client";

import { useState } from "react";

interface VideoPlayerProps {
  fileUrl: string;
}

const VideoPlayer = ({ fileUrl }: VideoPlayerProps) => {
  const [muted, setMuted] = useState<boolean>(true);
  return (
    <div className={`${muted && "h-full brightness-50"}`}>
      <video
        className={`rounded-md ${
          !muted
            ? "dark:hover:cursor-blob-mute-dark hover:cursor-blob-mute-light"
            : "dark:hover:cursor-blob-sound-dark hover:cursor-blob-sound-light"
        } `}
        autoPlay
        loop
        //   controls
        playsInline
        muted={muted}
        onClick={() => setMuted(!muted)}
      >
        <source src={fileUrl as string} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
