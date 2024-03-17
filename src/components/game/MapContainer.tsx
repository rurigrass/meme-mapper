import { motion } from "framer-motion";
import TestMap from "./TestMap";
import {
  ArrowBigDown,
  ArrowBigUp,
  Pin,
  PinOff,
  Map,
  Satellite,
  PersonStanding,
} from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import AppleMap from "./AppleMap";
import { MapType } from "mapkit-react";

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
  marker: Coordinates | undefined;
  makeGuess: () => void;
}

const MapContainer = ({
  screenSize,
  setMarker,
  marker,
  makeGuess,
}: MapContainerProps) => {
  const token = process.env.NEXT_PUBLIC_MAPKIT_TOKEN;
  const [mapSize, setMapSize] = useState({ height: "250px", width: "300px" });
  const [mapType, setMapType] = useState<MapTypeEnum>(MapTypeEnum.SMALL);
  const [bigMapType, setBigMapType] = useState<MapTypeEnum>(MapTypeEnum.LARGE);
  const [lockMap, setLockMap] = useState<Boolean>(false);
  const [mapTypeId, setMapTypeId] = useState<MapType>(MapType.Standard);

  console.log(marker);

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
      //LARGE  SCREEN
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
        case MapTypeEnum.EXTRALARGE:
          setMapSize({ height: "500px", width: "600px" });
          break;
        case MapTypeEnum.LARGE:
          setMapSize({ height: "400px", width: "500px" });
          break;
        case MapTypeEnum.MEDIUM:
          setMapSize({ height: "350px", width: "400px" });
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
        setMapType(MapTypeEnum.MEDIUM);
        setBigMapType(MapTypeEnum.MEDIUM);
        break;
      case MapTypeEnum.MEDIUM:
        setMapType(MapTypeEnum.LARGE);
        setBigMapType(MapTypeEnum.LARGE);
        break;
      case MapTypeEnum.LARGE:
        setMapType(MapTypeEnum.EXTRALARGE);
        setBigMapType(MapTypeEnum.EXTRALARGE);
        break;
    }
  };

  const shrinkMapSize = (currentSize: MapTypeEnum) => {
    switch (currentSize) {
      case MapTypeEnum.MEDIUM:
        setBigMapType(MapTypeEnum.SMALL);
        setMapType(MapTypeEnum.SMALL);
        break;
      case MapTypeEnum.LARGE:
        setMapType(MapTypeEnum.MEDIUM);
        setBigMapType(MapTypeEnum.MEDIUM);
        break;
      case MapTypeEnum.EXTRALARGE:
        setMapType(MapTypeEnum.LARGE);
        setBigMapType(MapTypeEnum.LARGE);
        break;
    }
  };

  return (
    <motion.div
      className="absolute bottom-0 right-0 lg:bottom-1.5 lg:right-2 overflow-hidden rounded-lg"
      animate={{
        height: mapSize.height,
        width: mapSize.width,
      }}
      onMouseOver={() => !lockMap && setMapType(bigMapType)}
      onMouseOut={() => !lockMap && setMapType(MapTypeEnum.SMALL)}
    >
      <div className="relative h-full cursor-crosshair">
        {/* ARROW STUFF */}
        <div
          className={`absolute w-full flex justify-between top-0 ${
            screenSize < 640 ? "right-0" : "left-0"
          }   z-10`}
        >
          <div className="flex">
            <ArrowBigUp
              className={`h-5 w-5 p-[0.1rem] m-1 bg-white dark:bg-black  dark:fill-white rounded-xl hover:cursor-pointer ${
                screenSize < 640 ? "" : "-rotate-45"
              }`}
              onClick={() => expandMapSize(mapType)}
            />
            <ArrowBigDown
              className={`h-5 w-5 p-[0.1rem] m-1 bg-white dark:bg-black  dark:fill-white rounded-xl  hover:cursor-pointer ${
                screenSize < 640 ? "" : "-rotate-45"
              }`}
              onClick={() => shrinkMapSize(mapType)}
            />
            {lockMap ? (
              <PinOff
                className={`h-5 w-5 p-[0.1rem] m-1 bg-white dark:bg-black  dark:fill-white rounded-xl  hover:cursor-pointer`}
                onClick={() => setLockMap(false)}
              />
            ) : (
              <Pin
                className={`h-5 w-5 p-[0.1rem] m-1 bg-white dark:bg-black  dark:fill-white rounded-xl  hover:cursor-pointer`}
                onClick={() => setLockMap(true)}
              />
            )}
          </div>
          {/* <div>
          </div> */}
          <div className="flex">
            {/* {marker?.lat !== 0 && marker?.lng !== 0 && (
              <Link
              href={`http://www.google.com/maps?layer=c&cbll=${
                marker?.lat || 0
              },${marker?.lng || 0}`}
              rel="noopener noreferrer"
              target="_blank"
              >
              <PersonStanding className="h-5 w-5 p-[0.1rem] m-1 bg-black rounded-xl hover:cursor-pointer" />
              </Link>
            )} */}
            {mapTypeId === MapType.Hybrid ? (
              <Map
                className="h-5 w-5 p-[0.1rem] m-1 bg-white dark:bg-black  dark:fill-white rounded-xl  hover:cursor-pointer"
                onClick={() => setMapTypeId(MapType.Standard)}
              />
            ) : (
              <Satellite
                className="h-5 w-5 p-[0.1rem] m-1 bg-white dark:bg-black  dark:fill-white rounded-xl  hover:cursor-pointer"
                onClick={() => setMapTypeId(MapType.Hybrid)}
              />
            )}
          </div>
        </div>
        {/* <TestMap
          //   initCoordinates={{ lat: meme.lat, lng: meme.lng }}
          updateCoordinates={(lat: number, lng: number) =>
            setMarker({ lat, lng })
          }
          mapTypeId={mapTypeId}
        /> */}
        <AppleMap
          token={token as string}
          updateCoordinates={(lat: number, lng: number) =>
            setMarker({ lat, lng })
          }
          mapTypeId={mapTypeId}
        />
        <div className="absolute bottom-0 w-full z-20">
          <Button
            className="flex justify-center w-full py-2 rounded-t-none bg-green-600 hover:bg-green-500 text-white font-bold disabled:bg-green-800
            disabled:opacity-70"
            disabled={marker === undefined}
            onClick={makeGuess}
          >
            Guess
          </Button>
        </div>
      </div>
    </motion.div>
    // <motion.div
    //   className="absolute bottom-0 right-0 overflow-hidden rounded-lg"
    //   animate={{
    //     height: mapSize.height,
    //     width: mapSize.width,
    //   }}
    //   onMouseOver={() => !lockMap && setMapType(bigMapType)}
    //   onMouseOut={() => !lockMap && setMapType(MapTypeEnum.SMALL)}
    // >
    //   <div className="relative h-full">
    //     {/* ARROW STUFF */}
    //     <div
    //       className={`absolute w-full flex justify-between top-0 ${
    //         screenSize < 640 ? "right-0" : "left-0"
    //       }   z-10`}
    //     >
    //       {token && <AppleMap token={token} />}
    //     </div>
    //   </div>
    // </motion.div>
  );
};

export default MapContainer;
