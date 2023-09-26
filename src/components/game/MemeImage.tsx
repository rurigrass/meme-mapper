"use client";

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface MemeImageProps {
  fileUrl: string;
}

const MemeImage = ({ fileUrl }: MemeImageProps) => {
  return (
    <div className="w-full h-[60%] lg:w-4/5 hover:cursor-grab selection:cursor-grabbing">
      <TransformWrapper centerOnInit initialScale={2}>
        <TransformComponent
          wrapperStyle={{
            width: "10%",
            height: "100%",
            borderRadius: "8px",
            // cursor: "grab",
          }}
        >
          <img
            src={fileUrl}
            className="relative h-full w-full rounded-lg"
            alt="meme"
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default MemeImage;
