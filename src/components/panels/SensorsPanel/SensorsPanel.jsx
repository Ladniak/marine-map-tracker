import module from "./SensorsPanel.module.css";
import CompassGauge from "../../Map/CompassGauge/CompassGauge";

function Inclinometer() {
  return (
    <div className={module.inclinometer}>
      <div className={module.inclinometerLineVertical} />
      <div className={module.inclinometerLineHorizontal} />
    </div>
  );
}

export default function SensorsPanel({ stations, signals, selectedObject }) {
  return (
    <div className={module.sensorsPanel}>
      {selectedObject && (
        <p className={module.activeObjectLabel}>
          Active object: <strong>{selectedObject.id}</strong>
        </p>
      )}

      {stations.map((station, index) => {
        const stationSignals = signals.filter(
          (signal) => String(signal.stationId) === String(station.id),
        );

        const stationSignal = stationSignals.at(0);
        const angle = stationSignal?.correctedAzimuth ?? null;
        const objectIds = stationSignal?.objectIds ?? [];

        return (
          <div key={station.id} className={module.sensorCard}>
            <div className={module.sensorHeader}>Sensor {index + 1}</div>

            <p className={module.sensorName}>{station.id}</p>

            <p className={module.label}>Compass</p>

            {angle !== null ? (
              <CompassGauge angle={angle} />
            ) : (
              <p className={module.noSignal}>No azimuth data</p>
            )}

            <p className={module.value}>
              Azimuth:{" "}
              {angle !== null ? `${Number(angle).toFixed(1)}°` : "No signal"}
            </p>

            <p className={module.value}>
              Objects:{" "}
              {objectIds.length > 0
                ? objectIds.join(", ")
                : "waiting for triangulation..."}
            </p>

            <p className={module.label}>Inclinometer</p>
            <Inclinometer />

            <p className={module.value}>
              Lon: {station.longitude} Lat: {station.latitude}
            </p>
          </div>
        );
      })}
    </div>
  );
}
