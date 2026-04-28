import { Polyline, Popup } from "react-leaflet";

function getSignalEndPoint(latitude, longitude, azimuth, length = 0.02) {
  const angleRad = (azimuth * Math.PI) / 180;

  const newLat = latitude + length * Math.cos(angleRad);
  const newLng = longitude + length * Math.sin(angleRad);

  return [newLat, newLng];
}

export default function SignalsLayer({ stations, signals }) {
  return (
    <>
      {signals.map((signal) => {
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
              color: "#ff9800",
              weight: 3,
              opacity: 0.8,
              dashArray: "8, 8",
            }}
          >
            <Popup>
              <div>
                <p>
                  <strong>Signal:</strong> {signal.id}
                </p>
                <p>
                  <strong>Station ID:</strong> {signal.stationId}
                </p>
                <p>
                  <strong>Azimuth:</strong> {signal.azimuth}
                </p>
                <p>
                  <strong>Corrected azimuth:</strong> {signal.correctedAzimuth}
                </p>
                <p>
                  <strong>Timestamp:</strong>{" "}
                  {new Date(signal.timestamp).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Polyline>
        );
      })}
    </>
  );
}
