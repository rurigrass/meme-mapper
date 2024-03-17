"use client";
import {
  ColorScheme,
  FeatureVisibility,
  Map,
  MapType,
  Marker,
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
  const { theme } = useTheme();

  const center = {
    centerLatitude: 48.8566,
    centerLongitude: 2.3522,
    latitudeDelta: 100,
    longitudeDelta: 100,
  };

  // useEffect(() => {
  //   updateCoordinates &&
  //     updateCoordinates(guessMarker?.lat ?? 0, guessMarker?.lng ?? 0);
  // }, [guessMarker]);

  return (
    <>
      {center && (
        <Map
          token={token}
          initialRegion={center}
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
      )}
    </>
  );
};

export default AppleMap;
