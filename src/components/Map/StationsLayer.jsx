import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

function createStationIcon() {
  return L.divIcon({
    className: "station-marker-wrapper",
    html: `
      <div class="station-marker">
        <div class="station-marker__pulse"></div>
        <div class="station-marker__body">
          <div class="station-marker__dot"></div>
        </div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

function StationPopup({ station }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div>
      <p>
        <strong>Station:</strong> {station.id}
      </p>

      {!isDetailsOpen ? (
        <>
          <p>
            <strong>Latitude:</strong> {station.latitude?.toFixed?.(4)}
          </p>
          <p>
            <strong>Longitude:</strong> {station.longitude?.toFixed?.(4)}
          </p>
        </>
      ) : (
        <>
          <p>
            <strong>Magnetic correction:</strong>{" "}
            {station.magneticCorrection ?? "—"}
          </p>
          <p>
            <strong>Status:</strong> ACTIVE
          </p>
          <p>
            <strong>Type:</strong> Coastal sensor
          </p>
          <p>
            <strong>Tracking mode:</strong> Azimuth DF
          </p>
        </>
      )}

      <button
        type="button"
        onClick={() => setIsDetailsOpen((prev) => !prev)}
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "8px 12px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: isDetailsOpen ? "#455a64" : "#1976d2",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 600,
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        {isDetailsOpen ? "Back" : "Details"}
      </button>
    </div>
  );
}

const stationIcon = createStationIcon();

export default function StationsLayer({ stations, onSelectStation }) {
  return (
    <>
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
          icon={stationIcon}
          eventHandlers={{
            click: () => onSelectStation?.(station.id),
          }}
        >
          <Popup>
            <StationPopup station={station} />
          </Popup>
        </Marker>
      ))}
    </>
  );
}
