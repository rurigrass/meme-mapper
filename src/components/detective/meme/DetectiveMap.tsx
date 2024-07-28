"use client";

import {
  ColorScheme,
  FeatureVisibility,
  Map,
  MapType,
  Marker,
} from "mapkit-react";
import { useTheme } from "next-themes";
import { Map as MapPic, Satellite } from "lucide-react";
import { useState } from "react";

type DetectiveMapTypes = {
  token: string;
};

const DetectiveMap = ({ token }: DetectiveMapTypes) => {
  const { theme } = useTheme();
  const [mapTypeId, setMapTypeId] = useState<MapType>(MapType.Standard);

  return (
    <div className="h-full w-full relative cursor-crosshair">
      <div className="absolute top-0 right-0 z-10">
        {mapTypeId === MapType.Hybrid ? (
          <MapPic
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
      {token && (
        <Map
          token={token}
          colorScheme={theme === "light" ? ColorScheme.Light : ColorScheme.Dark}
          showsZoomControl={false}
          showsCompass={FeatureVisibility.Hidden}
          showsMapTypeControl={false}
          allowWheelToZoom
          mapType={mapTypeId}
        ></Map>
      )}
    </div>
  );
};

export default DetectiveMap;
