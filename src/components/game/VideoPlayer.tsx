"use client";

import { useState } from "react";
import { motion, spring } from "framer-motion";

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

  //OLD DIMENSIONS max-h-[calc(60dvh)] lg:max-h-[calc(90dvh)] w-auto
  //ALSO THESE h-[60%] w-auto lg:h-[80%]
  return (
    <div className="flex items-center h-full w-full justify-center lg:justify-start ">
      <div className={` relative`}>
        <motion.div
          onClick={() => setMuted(!muted)}
          key="animation-on-muted"
          className="absolute max-w-full inset-0 m-auto rounded-lg "
          animate={
            muted ? { opacity: 0.5, backgroundColor: "#000" } : { opacity: 0 }
          }
          transition={{ type: "spring", delay: 0.2 }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[4.6vw] font-bold text-white opacity-70 mix-blend-screen break-normal ">
            Click for Sound
          </div>
        </motion.div>
        <video
          className={`rounded-lg ${muted && "hover:cursor-pointer"} `}
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
    </div>
  );
};

export default VideoPlayer;
