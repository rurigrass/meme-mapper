"use client";

import {
  ColorScheme,
  FeatureVisibility,
  Map,
  MapType,
  Marker,
} from "mapkit-react";
import { useTheme } from "next-themes";

type DetectiveMapTypes = {
  token: string;
};

const DetectiveMap = ({ token }: DetectiveMapTypes) => {
  const { theme } = useTheme();

  return (
    <div className=" h-full w-full rounded-md overflow-hidden">
      {token && (
        <Map
          token={token}
          colorScheme={theme === "light" ? ColorScheme.Light : ColorScheme.Dark}
          showsMapTypeControl={false}
          showsCompass={FeatureVisibility.Hidden}
          showsZoomControl={false}
          allowWheelToZoom
        ></Map>
      )}
    </div>
  );
};

export default DetectiveMap;
