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

  console.log("MUTED?? ", muted);

  return (
    <div className={`relative`}>
      {/* {muted && ( */}
      <motion.div
        onClick={() => setMuted(!muted)}
        key="animation-on-muted"
        className="absolute max-w-full inset-0 m-auto rounded-md "
        animate={
          muted ? { opacity: 0.5, backgroundColor: "black" } : { opacity: 0 }
        }
        transition={{ type: "spring", delay: 0.2 }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[4.6vw] font-bold text-white opacity-70 mix-blend-screen break-normal ">
          Click for Sound
        </div>
      </motion.div>
      {/* )} */}
      <video
        className={`rounded-md w-full ${muted && "hover:cursor-pointer"} `}
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
