import { useState, useEffect } from "react";
import MapView from "../components/Map/MapView";

const stations = [
  [46.4825, 30.7233],
  [45.341, 28.837],
];

const route = [
  [46.4825, 30.7233],
  [46.3, 30.5],
  [46.1, 30.2],
  [45.8, 29.9],
  [45.5, 29.3],
  [45.341, 28.837],
];

export default function HomePage() {
  const [position, setPosition] = useState(route[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < route.length - 1) {
          const next = prev + 1;
          setPosition(route[next]);
          return next;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <MapView
        route={route}
        stations={stations}
        movingPosition={position}
        width="700px"
        height="500px"
      />

      <div
        style={{
          flex: 1,
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <h2>Панель даних</h2>
        <p>Станція: {index}</p>
        <p>
          Координати: {position[0].toFixed(4)}, {position[1].toFixed(4)}
        </p>
      </div>
    </div>
  );
}
