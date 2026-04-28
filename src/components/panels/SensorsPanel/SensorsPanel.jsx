import module from "./SensorsPanel.module.css";
import CompassGauge from "../../Map/CompassGauge";

function Inclinometer() {
  return (
    <div className={module.inclinometer}>
      <div className={module.inclinometerLineVertical} />
      <div className={module.inclinometerLineHorizontal} />
    </div>
  );
}

export default function SensorsPanel({ stations, signals }) {
  return (
    <div className={module.sensorsPanel}>
      {stations.map((station, index) => {
        const stationSignal = signals.find(
          (signal) => signal.stationId === station.id,
        );

        const angle = stationSignal?.correctedAzimuth ?? 0;

        return (
          <div key={station.id} className={module.sensorCard}>
            <div className={module.sensorHeader}>Sensor {index + 1}</div>

            <p className={module.sensorName}>{station.id}</p>

            <p className={module.label}>Compass</p>
            <CompassGauge angle={angle} />

            <p className={module.value}>Azimuth: {angle}°</p>

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
