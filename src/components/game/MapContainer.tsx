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

  useEffect(() => {
    console.log("MAPTYPE ", mapType);
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

  return (
    <motion.div
      className="absolute bottom-0 right-0 h-80 w-80 overflow-hidden rounded-lg"
      animate={{
        height: mapSize.height,
        width: mapSize.width,
      }}
      onMouseOver={() => !lockMap && setMapType(bigMapType)}
      onMouseOut={() => !lockMap && setMapType(MapTypeEnum.SMALL)}
    >
      <TestMap
        //   initCoordinates={{ lat: meme.lat, lng: meme.lng }}
        updateCoordinates={(lat: number, lng: number) =>
          setMarker({ lat, lng })
        }
      />
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
