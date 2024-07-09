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
  // const { MAPKIT_TOKEN: token } = process.env;
  const { theme } = useTheme();
  console.log(token);

  return (
    <div className="h-full">
      {token && (
        <Map
          token={token as string}
          colorScheme={theme === "light" ? ColorScheme.Light : ColorScheme.Dark}
        ></Map>
      )}
    </div>
  );
};

export default DetectiveMap;
