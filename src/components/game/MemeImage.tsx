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
  const [containerWidth, setContainerWidth] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef(null);

  // console.log(containerRef.current.innerHeight);
  // console.log(imgRef.current?.width);

  useEffect(() => {
    setContainerHeight(containerRef.current?.offsetHeight);
    // setContainerWidth(imgRef.current?.offsetWidth);
  }, []);

  console.log(containerWidth);

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

  return (
    <div className="flex items-center justify-center h-[60%] overflow-hidden">
      <div
        ref={containerRef}
        className={`rounded-lg overflow-hidden h-full  `}
        // style={{ width: containerWidth }}
      >
        <QuickPinchZoom
          onUpdate={onUpdate}
          centerContained
          doubleTapToggleZoom
          wheelScaleFactor={1500}
          shouldInterceptWheel={(event) => !(event.ctrlKey || event.metaKey)}
        >
          <img
            ref={imgRef}
            src={fileUrl}
            className="rounded-lg object-contain !important"
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
