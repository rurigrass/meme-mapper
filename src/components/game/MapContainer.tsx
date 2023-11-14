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
  const [mapSize, setMapSize] = useState({ height: "250px", width: "300px" });
  const [mapType, setMapType] = useState<MapTypeEnum>(MapTypeEnum.SMALL);
  const [bigMapType, setBigMapType] = useState<MapTypeEnum>(MapTypeEnum.LARGE);
  const [lockMap, setLockMap] = useState<Boolean>(false);
  console.log(
    "IS LOCK ON? ",
    lockMap,
    "ACTUAL SIZE? ",
    mapType,
    "BIG MAP SIZE ",
    bigMapType
  );

  useEffect(() => {
    if (screenSize < 640) {
      //SMOL SCREEN
      switch (mapType) {
        case MapTypeEnum.EXTRALARGE:
          setMapSize({ height: "100%", width: "100%" });
          break;
        case MapTypeEnum.LARGE:
          setMapSize({ height: "400px", width: "100%" });
          break;
        case MapTypeEnum.MEDIUM:
          setMapSize({ height: "300px", width: "100%" });
          break;
        default:
          setMapSize({ height: "200px", width: "100%" });
          break;
      }
    } else if (screenSize > 1024) {
      //LARGE SCREEN
      switch (mapType) {
        case MapTypeEnum.EXTRALARGE:
          setMapSize({ height: "500px", width: "600px" });
          break;
        case MapTypeEnum.LARGE:
          setMapSize({ height: "400px", width: "500px" });
          break;
        case MapTypeEnum.MEDIUM:
          setMapSize({ height: "300px", width: "400px" });
          break;
        default:
          setMapSize({ height: "250px", width: "300px" });
          break;
      }
    } else {
      //MEDIUM SCREEN
      switch (mapType) {
        case MapTypeEnum.LARGE:
          setMapSize({ height: "400px", width: "500px" });
          break;
        default:
          setMapSize({ height: "300px", width: "300px" });
          break;
      }
    }
  }, [screenSize, mapType]);

  const expandMapSize = (currentSize: MapTypeEnum) => {
    // console.log("THE CURRENT SIZE ", currentSize);

    switch (currentSize) {
      case MapTypeEnum.SMALL:
        setBigMapType(MapTypeEnum.MEDIUM);
        setLockMap(false);
      case MapTypeEnum.MEDIUM:
        setBigMapType(MapTypeEnum.LARGE);
      case MapTypeEnum.LARGE:
        setBigMapType(MapTypeEnum.EXTRALARGE);
        break;
    }
  };

  const shrinkMapSize = (currentSize: MapTypeEnum) => {
    console.log("CURRENTTTTTTT ", currentSize);

    switch (currentSize) {
      case MapTypeEnum.EXTRALARGE:
        setBigMapType(MapTypeEnum.LARGE);
      case MapTypeEnum.LARGE:
        setBigMapType(MapTypeEnum.MEDIUM);
      case MapTypeEnum.MEDIUM:
        setBigMapType(MapTypeEnum.SMALL);
        setMapType(MapTypeEnum.SMALL);
        setLockMap(true);
        break;
    }
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
          className={`absolute flex top-0 ${
            screenSize < 640 ? "right-0" : "left-0"
          }   z-10`}
        >
          <ArrowBigUp
            className={`h-5 w-5 p-[0.1rem] m-1 bg-black rounded-xl fill-white hover:cursor-pointer ${
              screenSize < 640 ? "" : "-rotate-45"
            }`}
            onClick={() => expandMapSize(mapType)}
          />
          <ArrowBigDown
            className={`h-5 w-5 p-[0.1rem] m-1 bg-black rounded-xl fill-white hover:cursor-pointer ${
              screenSize < 640 ? "" : "-rotate-45"
            }`}
            onClick={() => shrinkMapSize(mapType)}
          />
          <div className="flex flex-col">
            <p className=" font-extrabold text-purple-600">
              MAP SIZE {mapType}
            </p>
            <p className=" font-extrabold text-purple-600">
              HOVER MAP SIZE {bigMapType}
            </p>
          </div>
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
