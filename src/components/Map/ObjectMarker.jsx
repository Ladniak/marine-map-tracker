import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

function createObjectIcon(direction) {
  return L.divIcon({
    className: "object-icon-wrapper",
    html: `
      <div class="object-icon" style="transform: rotate(${direction}deg);">
        ▲
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

export default function ObjectMarker({ objectItem }) {
  const icon = createObjectIcon(objectItem.direction);

  return (
    <Marker position={[objectItem.latitude, objectItem.longitude]} icon={icon}>
      <Popup>
        <div>
          <p>
            <strong>Object:</strong> {objectItem.id}
          </p>
          <p>
            <strong>Latitude:</strong> {objectItem.latitude.toFixed(4)}
          </p>
          <p>
            <strong>Longitude:</strong> {objectItem.longitude.toFixed(4)}
          </p>
          <p>
            <strong>Speed:</strong> {objectItem.speed}
          </p>
          <p>
            <strong>Direction:</strong> {objectItem.direction.toFixed(1)}°
          </p>
          <p>
            <strong>Detected at:</strong>{" "}
            {new Date(objectItem.detectedAt).toLocaleString()}
          </p>
          <p>
            <strong>Signals:</strong> {objectItem.signals.join(", ")}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}
