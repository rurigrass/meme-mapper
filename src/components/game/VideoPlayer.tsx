"use client";

import { useState } from "react";

interface VideoPlayerProps {
  fileUrl: string;
}

const VideoPlayer = ({ fileUrl }: VideoPlayerProps) => {
  const [muted, setMuted] = useState<boolean>(true);

  //MOUSE HOVER STUFF:
  // ${
  //   !muted
  //     ? "dark:hover:cursor-blob-mute-dark hover:cursor-blob-mute-light"
  //     : "dark:hover:cursor-blob-sound-dark hover:cursor-blob-sound-light"
  // }

  return (
    <div className={`relative`}>
      {muted && (
        <div
          onClick={() => setMuted(false)}
          className="absolute max-w-full bg-black opacity-50 inset-0 m-auto rounded-md "
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[4.6vw] font-bold text-white opacity-70 mix-blend-screen break-normal ">
            Click for Sound
          </div>
        </div>
      )}
      <video
        className={`rounded-md w-full hover:cursor-pointer`}
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
