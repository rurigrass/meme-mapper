"use client";
import { ColorScheme, FeatureVisibility, Map, Marker } from "mapkit-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type AppleMapRequestProps = {
  token: string;
  initCoordinates?: { lat: number | undefined; lng: number | undefined };
  updateCoordinates?: (lat: number, lng: number) => void;
};

type MarkerType = {
  lat: number;
  lng: number;
};

const AppleMapRequest = ({
  token,
  initCoordinates,
  updateCoordinates,
}: AppleMapRequestProps) => {
  const { theme } = useTheme();
  const [guessMarker, setGuessMarker] = useState<MarkerType | undefined>(
    initCoordinates
      ? { lat: initCoordinates.lat!, lng: initCoordinates.lng! }
      : undefined
  );

  useEffect(() => {
    if (guessMarker) {
      updateCoordinates && updateCoordinates(guessMarker.lat, guessMarker.lng);
    }
  }, [guessMarker]);

  let center = {
    centerLatitude: initCoordinates ? initCoordinates.lat || 48.8566 : 48.8566,
    centerLongitude: initCoordinates ? initCoordinates.lng || 2.3522 : 2.3522,
    latitudeDelta: 100,
    longitudeDelta: 100,
  };

  return (
    <Map
      token={token}
      initialRegion={center}
      allowWheelToZoom
      colorScheme={theme === "light" ? ColorScheme.Light : ColorScheme.Dark}
      showsZoomControl={false}
      showsCompass={FeatureVisibility.Hidden}
      showsMapTypeControl={true}
      onSingleTap={(e) => {
        const newCoordinates = {
          lat: e.toCoordinates().latitude,
          lng: e.toCoordinates().longitude,
        };
        setGuessMarker(newCoordinates);
        updateCoordinates &&
          updateCoordinates(newCoordinates.lat, newCoordinates.lng);
      }}
    >
      {guessMarker && (
        <Marker latitude={guessMarker.lat} longitude={guessMarker.lng} />
      )}
    </Map>
  );
};

export default AppleMapRequest;
