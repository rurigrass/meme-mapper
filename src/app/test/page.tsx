import AppleResultMap from "@/components/game/AppleResultMap";
import { haversineDistance } from "@/lib/utils";

const page = ({}) => {
  const token = process.env.MAPKIT_TOKEN;
  const guessCoordinates = { lat: 40.4168, lng: -3.7038 };
  const actualCoordinates = { lat: 40.4168, lng: -3.7034 };
  const distance = haversineDistance(actualCoordinates, guessCoordinates);
  return (
    <div className="h-[50%] w-[50%]">
      {token && (
        <AppleResultMap
          token={token}
          guessCoordinates={guessCoordinates}
          actualCoordinates={actualCoordinates}
          distance={distance}
        />
      )}
    </div>
  );
};

export default page;
