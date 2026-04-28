import { Marker, Popup } from "react-leaflet";

export default function StationsLayer({
  stations,
  signals,
  selectedObject,
  onSelectStation,
}) {
  const visibleStations = selectedObject
    ? stations.filter((station) =>
        signals.some(
          (signal) =>
            selectedObject.signals.includes(signal.id) &&
            signal.stationId === station.id,
        ),
      )
    : stations;

  return (
    <>
      {visibleStations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
          eventHandlers={{
            click: () => onSelectStation(station.id),
          }}
        >
          <Popup>
            <div>
              <p>
                <strong>Station:</strong> {station.id}
              </p>
              <p>
                <strong>Latitude:</strong> {station.latitude}
              </p>
              <p>
                <strong>Longitude:</strong> {station.longitude}
              </p>
              <p>
                <strong>Magnetic correction:</strong>{" "}
                {station.magneticCorrection}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
