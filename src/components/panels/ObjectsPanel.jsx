import module from "./Panel.module.css";

export default function ObjectsPanel({ objects }) {
  return (
    <div className={module.Panel}>
      <h2>Objects</h2>

      {objects.map((objectItem) => (
        <div key={objectItem.id} className={module.PanelWrapper}>
          <p>
            <strong>ID:</strong> {objectItem.id}
          </p>
          <p>
            <strong>Lat:</strong> {objectItem.latitude}
          </p>
          <p>
            <strong>Lng:</strong> {objectItem.longitude}
          </p>
          <p>
            <strong>Speed:</strong> {objectItem.speed}
          </p>
          <p>
            <strong>Direction:</strong> {objectItem.direction}°
          </p>
          <p>
            <strong>Detected:</strong> {objectItem.detectedAt}
          </p>
        </div>
      ))}
    </div>
  );
}
