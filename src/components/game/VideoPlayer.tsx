"use client";

import { useState } from "react";

interface VideoPlayerProps {
  fileUrl: string;
}

const VideoPlayer = ({ fileUrl }: VideoPlayerProps) => {
  const [muted, setMuted] = useState<boolean>(true);
  // "brightness-50 text-5xl font-bold text-black mix-blend-screen"`
  return (
    <div className={`relative`}>
      {/* <div> */}
      {muted && (
        <div className="absolute max-w-full bg-black opacity-50 inset-0 m-auto rounded-md ">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-5xl font-bold text-white opacity-70 mix-blend-screen px-2 ">
            Click for Sound
          </div>
        </div>
      )}
      {/* </div> */}
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
        {muted && "hi"}
        <source src={fileUrl as string} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
