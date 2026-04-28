export default function SignalsPanel({ signals }) {
  return (
    <div className="panel">
      <h2>Signals</h2>

      {signals.map((signal) => (
        <div key={signal.id} className="panel-item">
          <p>
            <strong>ID:</strong> {signal.id}
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
            <strong>Timestamp:</strong> {signal.timestamp}
          </p>
        </div>
      ))}
    </div>
  );
}
