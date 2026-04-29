import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import StationsLayer from "./StationsLayer";
import ObjectsLayer from "./ObjectsLayer";
import SignalLayer from "./SignalLayer";

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
