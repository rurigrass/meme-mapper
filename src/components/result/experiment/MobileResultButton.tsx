"use client";
import { useState } from "react";

const MobileResultButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log(isOpen);

  return (
    <div className="absolute bottom-1 right-1 ">
      <div
        className="h-10 w-24 sm:h-12 sm:w-32 bg-gray-300 flex items-center justify-center rounded-lg hover:cursor-pointer"
        // style={{ backgroundColor: primaryColour }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        meme
      </div>
    </div>
  );
};

export default MobileResultButton;
