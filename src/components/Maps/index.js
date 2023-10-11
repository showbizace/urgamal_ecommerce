import React, { useEffect, useRef, useState } from "react";

const GMap = ({ lat, lng }) => {
  const googleMapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const googleMap = initGoogleMap();
    setMap(googleMap);
  }, [lat, lng]);

  useEffect(() => {
    if (!map) return;

    new window.google.maps.Marker({
      position: { lat, lng },
      map: map,
    });
  }, [map]);

  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat, lng },
      zoom: 16,
    });
  };

  return (
    <div
      ref={googleMapRef}
      className="w-full h-80 md:h-full rounded-lg border shadow-lg"
    />
  );
};

export default GMap;
