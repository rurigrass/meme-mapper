"use client";
import { ColorScheme, Map, Marker } from "mapkit-react";

interface AppleMapProps {
  token: string;
}

const AppleMap = ({ token }: AppleMapProps) => {
  return (
    <Map token={token} allowWheelToZoom colorScheme={ColorScheme.Dark}>
      <Marker latitude={46.52} longitude={6.57} />
    </Map>
  );
};

export default AppleMap;
