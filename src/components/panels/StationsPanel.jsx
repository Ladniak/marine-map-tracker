export default function StationsPanel({ stations }) {
  return (
    <div className="panel">
      <h2>Stations</h2>

      {stations.map((station) => (
        <div key={station.id} className="panel-item">
          <p>
            <strong>ID:</strong> {station.id}
          </p>
          <p>
            <strong>Lat:</strong> {station.latitude}
          </p>
          <p>
            <strong>Lng:</strong> {station.longitude}
          </p>
          <p>
            <strong>Magnetic correction:</strong> {station.magneticCorrection}
          </p>
        </div>
      ))}
    </div>
  );
}
