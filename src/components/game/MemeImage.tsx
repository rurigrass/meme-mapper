import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

interface MemeImageProps {
  fileUrl: string;
}

const MemeImage = ({ fileUrl }: MemeImageProps) => {
  //   const image =
  // "https://www.telegraph.co.uk/content/dam/news/2016/11/29/nickelback-look-at-this-graph_trans_NvBQzQNjv4BqAz3ogyoD1YDpdxYGZ0Xf4hOO1hauYrvb5hh90b3Ok8U.PNG?imwidth=680";
  const [isDragging, setIsDragging] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  // const [containerWidth, setContainerWidth] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // console.log(containerRef.current.innerHeight);
  // console.log(imgRef.current?.width);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
    // setContainerWidth(imgRef.current?.offsetWidth);
  }, []);

  const onUpdate = useCallback(
    ({ x, y, scale }: { x: number; y: number; scale: number }) => {
      const img = imgRef.current;
      if (img) {
        const value = make3dTransformValue({ x, y, scale });

        img.style.setProperty("transform", value);
        img.style.cursor = isDragging ? "grabbing" : "grab";
      }
    },
    [isDragging]
  );

  //OLD CLASS STUFF h-[60%] lg:h-[80%] lg:w-[75%]
  return (
    <div className="flex items-center justify-center h-full w-full lg:justify-start overflow-hidden">
      <div
        ref={containerRef}
        className={`rounded-lg overflow-hidden h-full w-full`}
        // style={{ width: containerWidth }}
      >
        <QuickPinchZoom
          // containerProps={{
          //   style: {},
          // }}
          onUpdate={onUpdate}
          centerContained
          doubleTapToggleZoom
          shouldInterceptWheel={(event) => event.ctrlKey || event.metaKey}
          wheelScaleFactor={300}
        >
          <img
            //change to next Image yep
            // alt="poop"
            // height={100}
            // width={
            //   100
            // }

            ref={imgRef}
            src={fileUrl}
            className="object-contain rounded-lg !important"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            style={{ height: containerHeight }}
          />
        </QuickPinchZoom>
      </div>
    </div>
  );
};

export default MemeImage;
