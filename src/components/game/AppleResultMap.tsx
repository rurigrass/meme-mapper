"use client";
import { calculateZoom } from "@/lib/utils";
import {
  ColorScheme,
  FeatureVisibility,
  Map,
  Marker,
  Polyline,
} from "mapkit-react";

type AppleMapProps = {
  token: string;
  actualCoordinates: MarkerType;
  guessCoordinates: MarkerType;
  distance: number;
};

type MarkerType = {
  lat: number;
  lng: number;
};

const AppleResultMap = ({
  token,
  actualCoordinates,
  guessCoordinates,
  distance,
}: AppleMapProps) => {
  const zoom = calculateZoom(distance);

  const center = {
    centerLatitude: (actualCoordinates.lat + guessCoordinates.lat) / 2,
    centerLongitude: (actualCoordinates.lng + guessCoordinates.lng) / 2,
    latitudeDelta: zoom,
    longitudeDelta: zoom,
  };

  //THIS IS FOR THE LINE
  let coords = [
    { latitude: actualCoordinates.lat, longitude: actualCoordinates.lng },
    { latitude: guessCoordinates.lat, longitude: guessCoordinates.lng },
  ];

  return (
    <Map
      //   onLoad={onLoad}
      token={token}
      colorScheme={ColorScheme.Dark}
      showsZoomControl={false}
      showsCompass={FeatureVisibility.Hidden}
      initialRegion={center}
      // isZoomEnabled={false}
      allowWheelToZoom

      // excludedPOICategories={[PointOfInterestCategory.Airport]}
    >
      {guessCoordinates && (
        <Marker
          latitude={guessCoordinates.lat || 0}
          longitude={guessCoordinates.lng || 0}
        />
      )}
      {guessCoordinates && actualCoordinates ? (
        <Polyline
          points={coords}
          lineDash={[10]}
          lineWidth={4}
          strokeColor="yellow"
        />
      ) : null}
      {actualCoordinates && (
        <Marker
          latitude={actualCoordinates.lat || 0}
          longitude={actualCoordinates.lng || 0}
        />
      )}
    </Map>
  );
};

export default AppleResultMap;