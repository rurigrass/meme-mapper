"use client";
import { ColorScheme, FeatureVisibility, Map, Marker } from "mapkit-react";
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
  const [guessMarker, setGuessMarker] = useState<MarkerType | undefined>();

  let center = {
    centerLatitude:
      (initCoordinates && initCoordinates.lat !== undefined
        ? guessMarker?.lat
        : initCoordinates?.lat) || 48.8566,
    centerLongitude:
      (initCoordinates && initCoordinates.lng !== undefined
        ? guessMarker?.lng
        : initCoordinates?.lng) || 2.3522,
    latitudeDelta: 100,
    longitudeDelta: 100,
  };

  useEffect(() => {
    updateCoordinates &&
      updateCoordinates(guessMarker?.lat ?? 0, guessMarker?.lng ?? 0);
  }, [guessMarker]);

  return (
    <Map
      token={token}
      // token="eyJhbGciOiJFUzI1NiIsImtpZCI6IjNCVTc3TFA4NEoiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJSVzc4SFg2UDI1IiwiaWF0IjoxNzAyMzAzMTU0LCJleHAiOjE3MzM5MjU1NTQsIm9yaWdpbiI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJ9.NI-QiHHZiYzB1YS1kKSbEapSVz43vPlU-DUG8jZu4YJdi6r_uPwpk2v8Ccy2iq8bKR7vcIxFpClkLGCDd1K7dg"
      initialRegion={center}
      allowWheelToZoom
      colorScheme={ColorScheme.Dark}
      showsZoomControl={false}
      showsCompass={FeatureVisibility.Hidden}
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

export default AppleMapRequest;
