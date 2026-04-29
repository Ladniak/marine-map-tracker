import { Polyline, Popup } from "react-leaflet";

export default function SignalLayer({ stations, signals, selectedObject }) {
  if (!selectedObject) {
    return null;
  }

  return (
    <>
      {signals.map((signal) => {
        const station = stations.find((item) => item.id === signal.stationId);

        if (!station) return null;

        const start = [station.latitude, station.longitude];
        const end = [selectedObject.latitude, selectedObject.longitude];

        return (
          <Polyline
            key={signal.id}
            positions={[start, end]}
            pathOptions={{
              color: "#ff3d00",
              weight: 4,
              opacity: 1,
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
                  <strong>Azimuth:</strong> {signal.azimuth}°
                </p>
                <p>
                  <strong>Corrected:</strong> {signal.correctedAzimuth}°
                </p>
                <p>
                  <strong>Object:</strong> {selectedObject.id}
                </p>
              </div>
            </Popup>
          </Polyline>
        );
      })}
    </>
  );
}
