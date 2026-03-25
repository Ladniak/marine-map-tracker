import { Marker } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-rotatedmarker";
import { getAngle } from "../../utils/geo";

const icon = L.divIcon({
  className: "custom-icon",
  html: "🚢",
  iconSize: [30, 30],
});

export default function MovingObject({ position }) {
  const markerRef = useRef();
  const prevPos = useRef(position);

  useEffect(() => {
    if (markerRef.current) {
      const marker = markerRef.current;
      const angle = getAngle(prevPos.current, position);
      marker.setRotationAngle(angle);
      prevPos.current = position;
    }
  }, [position]);

  return <Marker ref={markerRef} position={position} icon={icon} />;
}
