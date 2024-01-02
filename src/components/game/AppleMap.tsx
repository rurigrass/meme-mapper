"use client";
import { calculateZoom } from "@/lib/utils";
import {
  ColorScheme,
  CoordinateRegion,
  FeatureVisibility,
  Map,
  MapType,
  Marker,
  PointOfInterestCategory,
} from "mapkit-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type AppleMapProps = {
  token: string;
  updateCoordinates?: (lat: number, lng: number) => void;
  mapTypeId: MapType;
};

type MarkerType = {
  lat: number;
  lng: number;
};

const AppleMap = ({ token, updateCoordinates, mapTypeId }: AppleMapProps) => {
  const [guessMarker, setGuessMarker] = useState<MarkerType | undefined>();
  // const { NEXT_PUBLIC_MAPKIT_TOKEN: token } = process.env;
  const { theme } = useTheme();

  useEffect(() => {
    updateCoordinates &&
      updateCoordinates(guessMarker?.lat ?? 0, guessMarker?.lng ?? 0);
  }, [guessMarker]);

  // const zoom = calculateZoom(1000);
  // let center = {
  //   centerLatitude: (actualCoordinates.lat + guessCoordinates.lat) / 2,
  //   centerLongitude: (actualCoordinates.lng + guessCoordinates.lng) / 2,
  //   latitudeDelta: zoom,
  //   longitudeDelta: zoom,
  // }

  return (
    <Map
      token={token as string}
      initialRegion={{
        centerLatitude: 40.4168,
        centerLongitude: 3.7038,
        latitudeDelta: 180,
        longitudeDelta: 180,
      }}
      allowWheelToZoom
      colorScheme={theme === "light" ? ColorScheme.Light : ColorScheme.Dark}
      showsZoomControl={false}
      showsCompass={FeatureVisibility.Hidden}
      showsMapTypeControl={false}
      mapType={mapTypeId}
      // excludedPOICategories={[PointOfInterestCategory.Airport]}

      onSingleTap={(e) => {
        setGuessMarker({
          lat: e.toCoordinates().latitude || 0,
          lng: e.toCoordinates().longitude || 0,
        }),
          // marker.onChange(e.latLng);
          updateCoordinates &&
            updateCoordinates(
              e.toCoordinates().latitude ?? 0,
              e.toCoordinates().longitude ?? 0
            );
      }}
    >
      {guessMarker && (
        <Marker
          latitude={guessMarker.lat || 0}
          longitude={guessMarker.lng || 0}
        />
      )}
    </Map>
  );
};

export default AppleMap;
