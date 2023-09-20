"use client";

import { useState } from "react";
import { motion, spring } from "framer-motion";

interface MemeImageProps {
  fileUrl: string;
}

const MemeImage = ({ fileUrl }: MemeImageProps) => {
  console.log(fileUrl);

  return <div className={`relative`}>image goes here</div>;
};

export default MemeImage;
