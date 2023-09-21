"use client";

import { useState } from "react";
import { motion, spring } from "framer-motion";

interface MemeImageProps {
  fileUrl: string;
}

const MemeImage = ({ fileUrl }: MemeImageProps) => {
  console.log(fileUrl);

  return (
    <>
      <div
        className={`max-h-[calc(80dvh)] md:max-w-[75%] md:w-auto  overflow-hidden`}
      >
        <img src={fileUrl} className="h-full w-full rounded-lg" alt="meme" />
      </div>
    </>
  );
};

export default MemeImage;
