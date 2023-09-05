"use client";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 48.8566,
  lng: 2.3522,
};

const bounds = {
  north: 80,
  south: -80,
  west: -180,
  east: 180,
};

type MarkerType = {
  lat: number;
  lng: number;
};

type TestMapProps = {
  initCoordinates?: { lat: number; lng: number };
  //try this one
  updateCoordinates?: (lat: number, lng: number) => void;
};

const TestMap = ({ initCoordinates, updateCoordinates }: TestMapProps) => {
  //   console.log("marker ", marker);
  // var mk1 = new google.maps.Marker({
  //   position: { lat: 12, lng: 34 },
  //   map: map,
  // });
  // console.log("MARKERINO ", mk1);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
  });
  // const [isBig, setIsBig] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [guessMarker, setGuessMarker] = useState<MarkerType | undefined>();

  const onLoad = useCallback((map: google.maps.Map | null) => setMap(map), []);

  //   const dropPin = (e: any) => {
  //     e.event.target;
  //   };

  useEffect(() => {
    updateCoordinates &&
      updateCoordinates(guessMarker?.lat ?? 0, guessMarker?.lng ?? 0);
  }, [guessMarker]);

  useEffect(() => {
    if (map) {
      map.setOptions({
        scrollwheel: true,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false,
        draggableCursor: "crosshair",
        minZoom: 2,
        restriction: {
          latLngBounds: bounds,
        },
      });
    }
  }, [
    map,
    //  marker
  ]);

  //   console.log("guess marker", guessMarker);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      onLoad={onLoad}
      //   onUnmount={onUnmount}

      onClick={(e) => {
        setGuessMarker({
          lat: e.latLng?.lat() || 0,
          lng: e.latLng?.lng() || 0,
        }),
          // marker.onChange(e.latLng);
          updateCoordinates &&
            updateCoordinates(e.latLng?.lat() ?? 0, e.latLng?.lng() ?? 0);
      }}
    >
      {guessMarker && (
        <MarkerF
          icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
          position={{
            lat: guessMarker.lat || 0,
            lng: guessMarker.lng || 0,
          }}
        />
      )}
      {initCoordinates && (
        <MarkerF
          icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
          position={{
            lat: initCoordinates?.lat || 0,
            lng: initCoordinates?.lng || 0,
          }}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default TestMap;
