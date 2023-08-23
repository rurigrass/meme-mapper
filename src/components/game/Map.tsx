"use client";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { SetStateAction, useCallback, useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "200px",
};

const center = {
  lat: 48.8566,
  lng: 2.3522,
};

type MarkerType = {
  lat: number | undefined;
  lng: number | undefined;
};

type SetPropsType = {
  initCoordinates?: { lat: number; lng: number };
  //try this one
  updateCoordinates: (lat: number, lng: number) => void;
  // updateCoordinates: any;
};

const Map = ({ initCoordinates, updateCoordinates }: SetPropsType) => {
  //   console.log("marker ", marker);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [guessMarker, setGuessMarker] = useState<MarkerType | null>(
    (initCoordinates && initCoordinates) || null
  );

  console.log("the init coordinates ", initCoordinates);

  console.log("The guess marker ", guessMarker);

  const onLoad = useCallback((map: google.maps.Map | null) => setMap(map), []);

  //   const dropPin = (e: any) => {
  //     e.event.target;
  //   };

  //   useEffect(() => {
  //     updateCoordinates(guessMarker?.lat, guessMarker?.lng);
  //   }, [guessMarker]);

  useEffect(() => {
    if (map) {
      // dunno what this is
      //   const bounds = new google.maps.LatLngBounds();
      //   bounds.extend({
      //     lat: marker.lat,
      //     lng: marker.lng,
      //   });
      //   map.fitBounds(bounds);
      //   map.setZoom(1.5);

      map.setOptions({
        scrollwheel: true,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false,
        draggableCursor: "crosshair",
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
          lat: e.latLng?.lat(),
          lng: e.latLng?.lng(),
        }),
          // marker.onChange(e.latLng)
          updateCoordinates(e.latLng?.lat(), e.latLng?.lng());
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
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
