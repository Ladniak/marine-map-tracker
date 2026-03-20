import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { useState, useEffect } from "react";
import RotatingMarker from "./components/RotatingMarker";

// Початкові станції
const stations = [
  [46.4825, 30.7233],
  [45.341, 28.837],
];

// Початковий маршрут
const route = [
  [46.4825, 30.7233],
  [46.3, 30.5],
  [46.1, 30.2],
  [45.8, 29.9],
  [45.5, 29.3],
  [45.341, 28.837],
];

export default function App() {
  const [position, setPosition] = useState(route[0]);
  const [path, setPath] = useState([route[0]]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < route.length - 1) {
          const next = prev + 1;
          setPosition(route[next]);
          setPath((p) => [...p, route[next]]);
          return next;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[46.2, 30.3]} zoom={7} style={{ height: "100vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Станції */}
      {stations.map((pos, i) => (
        <Marker key={i} position={pos} />
      ))}

      {/* Маршрут */}
      <Polyline positions={path} />

      {/* Рухомий об'єкт */}
      <RotatingMarker position={position} />
    </MapContainer>
  );
}
