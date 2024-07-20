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
    <>
      {token && (
        <Map
          token={token}
          colorScheme={theme === "light" ? ColorScheme.Light : ColorScheme.Dark}
          showsZoomControl={false}
          showsCompass={FeatureVisibility.Hidden}
          showsMapTypeControl={false}
          allowWheelToZoom
        ></Map>
      )}
    </>
  );
};

export default DetectiveMap;
