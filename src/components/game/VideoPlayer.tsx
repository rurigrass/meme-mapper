"use client";

import { useEffect, useRef, useState } from "react";
import { motion, spring } from "framer-motion";

interface VideoPlayerProps {
  fileUrl: string;
}

const VideoPlayer = ({ fileUrl }: VideoPlayerProps) => {
  const [muted, setMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const coverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // console.log("CONTAINER ", containerRef.current?.offsetHeight);
    if (containerRef.current && videoRef.current && coverRef.current) {
      videoRef.current.style.maxHeight = `${containerRef.current?.offsetHeight}px`;
      videoRef.current.style.maxWidth = `${containerRef.current?.offsetWidth}px`;
      videoRef.current.style.height = `auto`;
      videoRef.current.style.width = `auto`;
      coverRef.current.style.height = `${containerRef.current.offsetHeight}px`;
      coverRef.current.style.width = `${containerRef.current.offsetWidth}px`;
      coverRef.current.style.height = `auto`;
      coverRef.current.style.width = `auto`;
      // console.log("hello ", videoRef.current);
    }
  }, []);

  const fullscreen = (element: HTMLVideoElement) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullScreen) {
      (element as any).msRequestFullScreen();
    }
  };

  //OLD DIMENSIONS max-h-[calc(60dvh)] lg:max-h-[calc(90dvh)] w-auto
  //ALSO THESE h-[60%] w-auto lg:h-[80%]
  return (
    <div
      ref={containerRef}
      className="flex relative items-center justify-center h-full w-full lg:justify-center overflow-hidden"
    >
      <div
        ref={coverRef}
        className={`  ${
          muted && "hover:cursor-pointer"
        } relative h-0 w-0 select-none`}
        //TODO: doubleclick to fullscreen works. however the controls are still there like click to pause.
        //TODO: size of video player doesn't change on screensize change this has to be done within the useEffect
        // onDoubleClick={() => videoRef.current && fullscreen(videoRef.current)}
      >
        <video
          ref={videoRef}
          className={`  object-contain rounded-lg !important h-0 w-0`}
          autoPlay
          loop
          playsInline
          muted={muted}
          onClick={() => setMuted(!muted)}
        >
          <source src={fileUrl as string} type="video/mp4" />
        </video>
        <motion.div
          onClick={() => setMuted(!muted)}
          key="animation-on-muted"
          className="absolute top-0 h-full w-full rounded-lg text-center"
          animate={
            muted ? { opacity: 0.5, backgroundColor: "#000" } : { opacity: 0 }
          }
          transition={{ type: "spring", delay: 0.2 }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[3vw] font-bold text-white opacity-70 mix-blend-screen break-normal ">
            Click for Sound
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoPlayer;
