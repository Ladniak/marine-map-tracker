import { Polyline, Popup } from "react-leaflet";

export default function HistoryPathLayer({ historyPath }) {
  if (!historyPath || historyPath.length < 2) {
    return null;
  }

  return (
    <Polyline
      positions={historyPath}
      pathOptions={{
        color: "#2e7d32",
        weight: 4,
        opacity: 0.85,
      }}
    >
      <Popup>
        <div>
          <p>
            <strong>Object movement history</strong>
          </p>
          <p>
            <strong>Points:</strong> {historyPath.length}
          </p>
        </div>
      </Popup>
    </Polyline>
  );
}
