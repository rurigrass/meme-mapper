import { motion } from "framer-motion";
import TestMap from "./TestMap";
import { ArrowBigDown, ArrowBigUp, Pin } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

type Coordinates = {
  lat: number;
  lng: number;
};

enum MapTypeEnum {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  EXTRALARGE = "EXTRALARGE",
}

interface MapContainerProps {
  screenSize: number;
  setMarker: (coordinates: Coordinates) => void;
}

const MapContainer = ({ screenSize, setMarker }: MapContainerProps) => {
  const [mapSize, setMapSize] = useState({ height: "100px", width: "100px" });
  const [mapType, setMapType] = useState<MapTypeEnum>(MapTypeEnum.MEDIUM);
  const [bigMapType, setBigMapType] = useState<MapTypeEnum>(MapTypeEnum.LARGE);
  const [lockMap, setLockMap] = useState<Boolean>(false);

  console.log("SCREENSIZE ", screenSize);

  useEffect(() => {
    if (screenSize < 640) {
      //SMOL SCREEN
      switch (mapType) {
        case MapTypeEnum.LARGE:
          setMapSize({ height: "500px", width: "100%" });
          break;
        default:
          setMapSize({ height: "200px", width: "100%" });
          break;
      }
    } else if (screenSize > 1024) {
      //LARGE SCREEN
      switch (mapType) {
        case MapTypeEnum.LARGE:
          setMapSize({ height: "400px", width: "500px" });
          break;
        default:
          setMapSize({ height: "250px", width: "300px" });
          break;
      }
    } else {
      //MEDIUM SCREEN
      setMapSize({ height: "300px", width: "300px" });
    }
  }, [screenSize, mapType]);

  const changeMapSize = (currentSize: MapTypeEnum) => {
    console.log("CURRENT SIZE OF MAP ", currentSize);
  };

  return (
    <motion.div
      className="absolute bottom-0 right-0 overflow-hidden rounded-lg"
      animate={{
        height: mapSize.height,
        width: mapSize.width,
      }}
      onMouseOver={() => !lockMap && setMapType(bigMapType)}
      onMouseOut={() => !lockMap && setMapType(MapTypeEnum.SMALL)}
    >
      <div className="relative h-full">
        {/* ARROW STUFF */}
        <div
          className={`absolute top-0 ${
            screenSize < 640 ? "right-0" : "left-0 -rotate-45"
          }   z-10`}
        >
          <ArrowBigUp
            className="h-5 w-5 p-[0.1rem] m-1 bg-black rounded-xl fill-white hover:cursor-pointer"
            onClick={() => changeMapSize(bigMapType)}
          />
        </div>
        <TestMap
          //   initCoordinates={{ lat: meme.lat, lng: meme.lng }}
          updateCoordinates={(lat: number, lng: number) =>
            setMarker({ lat, lng })
          }
        />
      </div>
    </motion.div>

    // <motion.div
    //   className={`absolute bottom-0 right-0 lg:right-5 overflow-hidden rounded-lg flex flex-col `}
    // >
    //   <TestMap
    //     //   initCoordinates={{ lat: meme.lat, lng: meme.lng }}
    //     updateCoordinates={(lat: number, lng: number) =>
    //       setMarker({ lat, lng })
    //     }
    //   />
    //   {/* <div className=" bg-white">
    //     {marker && (
    //       <Button
    //         className="flex justify-center w-full py-2 rounded-t-none bg-green-600 hover:bg-green-500 text-white font-bold"
    //         onClick={() =>
    //           (marker.lat && marker.lng) !== undefined
    //             ? calcScore(marker, { lat: meme.lat, lng: meme.lng })
    //             : console.log("nothing")
    //         }
    //         disabled={marker.lat === 0 && marker.lng === 0}
    //       >
    //         Guess
    //       </Button>
    //     )}
    //   </div> */}
    // </motion.div>
  );
};

export default MapContainer;
