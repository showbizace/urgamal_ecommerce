import React, { useEffect, useRef, useState } from 'react';

const GMap = ({ lng, lat }) => {
  const googleMapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const googleMap = initGoogleMap();
    setMap(googleMap);
  }, []);

  useEffect(() => {
    if (!map) return;

    new window.google.maps.Marker({
      position: { lat: lng, lng: lat },
      map: map
    });
  }, [map])

  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: lng, lng: lat },
      zoom: 8
    });
  }

  return <div
    ref={googleMapRef}
    className="w-full h-80 md:h-full rounded-lg border shadow-lg"
  />
}

export default GMap;