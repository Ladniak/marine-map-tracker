import { Polyline, Popup } from "react-leaflet";

function getSignalEndPoint(latitude, longitude, azimuth, length = 0.02) {
  const angleRad = (azimuth * Math.PI) / 180;

  const newLat = latitude + length * Math.cos(angleRad);
  const newLng = longitude + length * Math.sin(angleRad);

  return [newLat, newLng];
}

export default function SignalsLayer({ stations, signals, selectedObject }) {
  const visibleSignals = selectedObject
    ? signals.filter((signal) => selectedObject.signals.includes(signal.id))
    : signals;

  return (
    <>
      {visibleSignals.map((signal) => {
        const station = stations.find((item) => item.id === signal.stationId);

        if (!station) return null;

        const start = [station.latitude, station.longitude];

        const end = getSignalEndPoint(
          station.latitude,
          station.longitude,
          signal.correctedAzimuth,
        );

        return (
          <Polyline
            key={signal.id}
            positions={[start, end]}
            pathOptions={{
              color: selectedObject ? "#ff3d00" : "#ff9800",
              weight: selectedObject ? 4 : 3,
              opacity: selectedObject ? 1 : 0.75,
              dashArray: "8, 8",
            }}
          >
            <Popup>
              <div>
                <p>
                  <strong>Signal:</strong> {signal.id}
                </p>
                <p>
                  <strong>Station:</strong> {signal.stationId}
                </p>
                <p>
                  <strong>Azimuth:</strong> {signal.azimuth}
                </p>
                <p>
                  <strong>Corrected:</strong> {signal.correctedAzimuth}
                </p>
                <p>
                  <strong>Objects:</strong>{" "}
                  {signal.objectIds?.length
                    ? signal.objectIds.join(", ")
                    : "No object"}
                </p>
              </div>
            </Popup>
          </Polyline>
        );
      })}
    </>
  );
}
