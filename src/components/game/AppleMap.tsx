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
};

type MarkerType = {
  lat: number;
  lng: number;
};

const AppleMap = ({ token, updateCoordinates }: AppleMapProps) => {
  const [guessMarker, setGuessMarker] = useState<MarkerType | undefined>();
  // const { NEXT_PUBLIC_MAPKIT_TOKEN: token } = process.env;

  useEffect(() => {
    updateCoordinates &&
      updateCoordinates(guessMarker?.lat ?? 0, guessMarker?.lng ?? 0);
  }, [guessMarker]);

  return (
    <Map
      token={token}
      // token="eyJhbGciOiJFUzI1NiIsImtpZCI6IjNCVTc3TFA4NEoiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJSVzc4SFg2UDI1IiwiaWF0IjoxNzAyMzAzMTU0LCJleHAiOjE3MzM5MjU1NTQsIm9yaWdpbiI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJ9.NI-QiHHZiYzB1YS1kKSbEapSVz43vPlU-DUG8jZu4YJdi6r_uPwpk2v8Ccy2iq8bKR7vcIxFpClkLGCDd1K7dg"
      allowWheelToZoom
      colorScheme={ColorScheme.Dark}
      showsZoomControl={false}
      showsCompass={FeatureVisibility.Hidden}
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
