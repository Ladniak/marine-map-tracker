import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import StationsLayer from "./StationsLayer";
import ObjectsLayer from "./ObjectsLayer";
import SignalLayer from "./SignalLayer";

function InitialMapBounds({ stations, objects }) {
  const map = useMap();
  const hasCenteredRef = useRef(false);

  useEffect(() => {
    if (hasCenteredRef.current) return;

    const points = [
      ...stations.map((station) => [station.latitude, station.longitude]),

      ...objects.map((objectItem) => [
        objectItem.latitude,
        objectItem.longitude,
      ]),
    ].filter(
      ([lat, lng]) => typeof lat === "number" && typeof lng === "number",
    );

    if (points.length === 0) return;

    const bounds = L.latLngBounds(points);

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 13,
    });

    hasCenteredRef.current = true;
  }, [map, stations, objects]);

  return null;
}

export default function MapView({
  stations,
  objects,
  signals,
  selectedObject,
  onSelectStation,
  className,
}) {
  return (
    <div className={className}>
      <MapContainer
        center={[55.6761, 12.5683]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <InitialMapBounds stations={stations} objects={objects} />

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <SignalLayer
          stations={stations}
          signals={signals}
          selectedObject={selectedObject}
        />

        <StationsLayer
          stations={stations}
          signals={signals}
          selectedObject={selectedObject}
          onSelectStation={onSelectStation}
        />

        <ObjectsLayer objects={objects} />
      </MapContainer>
    </div>
  );
}
