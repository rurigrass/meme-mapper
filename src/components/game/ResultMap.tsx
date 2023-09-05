"use client";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  Circle,
} from "@react-google-maps/api";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const OPTIONS = {
  minZoom: 4,
  maxZoom: 18,
};

type ResultMapProps = {
  actualCoordinates: { lat: number; lng: number };
  guessCoordinates: { lat: number; lng: number };
  distance: number;
};

const ResultMap = ({
  actualCoordinates,
  guessCoordinates,
  distance,
}: ResultMapProps) => {
  const center = {
    lat: (actualCoordinates.lat + guessCoordinates.lat) / 2,
    lng: (actualCoordinates.lng + guessCoordinates.lng) / 2,
  };

  //   const zoom

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
  });
  // const [isBig, setIsBig] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const onLoad = useCallback((map: google.maps.Map | null) => setMap(map), []);

  //   const dropPin = (e: any) => {
  //     e.event.target;
  //   };

  useEffect(() => {
    if (map) {
      map.setOptions({
        scrollwheel: true,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false,
      });
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend({ lat: guessCoordinates.lat, lng: guessCoordinates.lng });
      bounds.extend({ lat: actualCoordinates.lat, lng: actualCoordinates.lng });
      map.fitBounds(bounds);
    }
  }, [map, guessCoordinates, actualCoordinates]);

  //   console.log("guess marker", guessMarker);
  //   new google.maps.Circle();

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      //   onUnmount={onUnmount}
      zoom={3}
    >
      {/* <Circle center={center} radius={distance * 500} /> */}
      {guessCoordinates && (
        <MarkerF
          icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
          position={{
            lat: guessCoordinates.lat || 0,
            lng: guessCoordinates.lng || 0,
          }}
        />
      )}
      {actualCoordinates && (
        <MarkerF
          icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
          position={{
            lat: actualCoordinates?.lat || 0,
            lng: actualCoordinates?.lng || 0,
          }}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default ResultMap;
