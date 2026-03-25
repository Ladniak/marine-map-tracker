import { MapContainer, TileLayer } from "react-leaflet";
import StationsLayer from "./StationsLayer";
import RouteLayer from "./RouteLayer";
import MovingObject from "./MovingObject";

export default function MapView({
  route,
  stations,
  movingPosition,
  width = "600px",
  height = "400px",
}) {
  return (
    <div
      style={{
        width,
        height,
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[46.2, 30.3]}
        zoom={7}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <StationsLayer stations={stations} />
        <RouteLayer path={route} />
        <MovingObject position={movingPosition} />
      </MapContainer>
    </div>
  );
}
