import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import StationsLayer from "./StationsLayer";
import ObjectsLayer from "./ObjectsLayer";
import SignalsLayer from "./SignalLayer";
import ObjectPathsLayer from "./ObjectPathsLayer";

export default function MapView({ stations, objects, signals, className }) {
  return (
    <div className={className}>
      <MapContainer
        center={[55.6761, 12.5683]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <SignalsLayer stations={stations} signals={signals} />
        <StationsLayer stations={stations} />
        <ObjectPathsLayer objects={objects} />
        <ObjectsLayer objects={objects} />
      </MapContainer>
    </div>
  );
}
