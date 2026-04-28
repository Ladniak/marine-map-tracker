import module from "./Panel.module.css";

export default function ObjectsPanel({
  objects,
  selectedObjectId,
  onSelectObject,
  onClearSelection,
}) {
  return (
    <div className={module.Panel}>
      {selectedObjectId && (
        <button
          type="button"
          className={module.ClearButton}
          onClick={onClearSelection}
        >
          Clear selection
        </button>
      )}

      {objects.map((objectItem) => {
        const isActive = objectItem.id === selectedObjectId;

        return (
          <button
            key={objectItem.id}
            type="button"
            className={`${module.PanelWrapper} ${
              isActive ? module.ActivePanelWrapper : ""
            }`}
            onClick={() => onSelectObject(objectItem.id)}
          >
            <p>
              <strong>ID:</strong> {objectItem.id}
            </p>
            <p>
              <strong>Lat:</strong> {objectItem.latitude.toFixed(4)}
            </p>
            <p>
              <strong>Lng:</strong> {objectItem.longitude.toFixed(4)}
            </p>
            <p>
              <strong>Speed:</strong> {objectItem.speed}
            </p>
            <p>
              <strong>Direction:</strong> {objectItem.direction.toFixed(1)}°
            </p>
            <p>
              <strong>Detected:</strong>{" "}
              {new Date(objectItem.detectedAt).toLocaleString("uk-UA")}
            </p>
          </button>
        );
      })}
    </div>
  );
}
