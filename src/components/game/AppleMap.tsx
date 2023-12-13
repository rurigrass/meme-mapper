"use client";
import {
  ColorScheme,
  FeatureVisibility,
  Map,
  MapType,
  Marker,
  PointOfInterestCategory,
} from "mapkit-react";
import { useEffect, useState } from "react";

type AppleMapProps = {
  token: string;
  updateCoordinates?: (lat: number, lng: number) => void;
  mapTypeId: string;
};

type MarkerType = {
  lat: number;
  lng: number;
};

const standart = "standard";

const AppleMap = ({ token, updateCoordinates, mapTypeId }: AppleMapProps) => {
  const [guessMarker, setGuessMarker] = useState<MarkerType | undefined>();
  // const { NEXT_PUBLIC_MAPKIT_TOKEN: token } = process.env;

  useEffect(() => {
    updateCoordinates &&
      updateCoordinates(guessMarker?.lat ?? 0, guessMarker?.lng ?? 0);
  }, [guessMarker]);

  return (
    <Map
      token={token}
      allowWheelToZoom
      colorScheme={ColorScheme.Dark}
      showsZoomControl={false}
      showsCompass={FeatureVisibility.Hidden}
      showsMapTypeControl={false}
      mapType={MapType.Standard}
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
