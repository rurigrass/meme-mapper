"use client";

import { useRef, useState } from "react";
import { motion, spring } from "framer-motion";
import { useGesture } from "react-use-gesture";

interface MemeImageProps {
  fileUrl: string;
}

const MemeImage = ({ fileUrl }: MemeImageProps) => {
  let imageRef = useRef<HTMLImageElement | null>(null);

  useGesture(
    {
      onDrag: () => {
        console.log("dragging");
      },
    },
    {
      domTarget: imageRef,
    }
  );

  return (
    <>
      <div className={`overflow-hidden  rounded-lg`}>
        <div>
          <img
            src={fileUrl}
            ref={imageRef}
            className="relative w-full h-full max-w-none max-h-none "
            alt="meme"
          />
        </div>
      </div>
    </>
  );
};

export default MemeImage;
