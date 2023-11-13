import { motion } from "framer-motion";
import TestMap from "./TestMap";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { Button } from "../ui/button";

type Coordinates = {
  lat: number;
  lng: number;
};

interface MapContainerProps {
  screenSize: number;
  setMarker: (coordinates: Coordinates) => void;
}

const MapContainer = ({ screenSize, setMarker }: MapContainerProps) => {
  return (
    <div className="absolute bottom-0 right-0 h-80 w-80">
      <TestMap
        //   initCoordinates={{ lat: meme.lat, lng: meme.lng }}
        updateCoordinates={(lat: number, lng: number) =>
          setMarker({ lat, lng })
        }
      />
    </div>

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
