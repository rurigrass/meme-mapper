"use client";

import {
  ColorScheme,
  FeatureVisibility,
  Map,
  MapType,
  Marker,
} from "mapkit-react";
import { useTheme } from "next-themes";

const DetectiveMap = () => {
  const { MAPKIT_TOKEN: token } = process.env;
  const { theme } = useTheme();

  return (
    <Map
      token={token as string}
      colorScheme={theme === "light" ? ColorScheme.Light : ColorScheme.Dark}
    ></Map>
  );
};

export default DetectiveMap;
