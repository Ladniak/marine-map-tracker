import { Marker, Popup } from "react-leaflet";

export default function StationsLayer({ stations }) {
  return (
    <>
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
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
