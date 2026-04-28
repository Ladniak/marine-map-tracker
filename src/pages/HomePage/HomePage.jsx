import { useEffect, useMemo, useState } from "react";
import MapView from "../../components/Map/MapView";
import ObjectsPanel from "../../components/panels/ObjectsPanel";
import SensorsPanel from "../../components/panels/SensorsPanel/SensorsPanel";

import { stations } from "../../mock/stations";
import { objects as initialObjects } from "../../mock/objects";
import { signals } from "../../mock/signals";

import module from "./HomePage.module.css";

export default function HomePage() {
  const [animatedObjects, setAnimatedObjects] = useState(initialObjects);
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [mobilePanel, setMobilePanel] = useState(null);

  useEffect(() => {
    let step = 0;

    const interval = setInterval(() => {
      setAnimatedObjects((prevObjects) =>
        prevObjects.map((objectItem) => {
          if (!objectItem.path || objectItem.path.length === 0) {
            return objectItem;
          }

          const nextPoint = objectItem.path[step % objectItem.path.length];
          const nextPointAfter =
            objectItem.path[(step + 1) % objectItem.path.length];

          const dx = nextPointAfter[1] - nextPoint[1];
          const dy = nextPointAfter[0] - nextPoint[0];
          const angle = (Math.atan2(dx, dy) * 180) / Math.PI;

          return {
            ...objectItem,
            latitude: nextPoint[0],
            longitude: nextPoint[1],
            direction: angle,
          };
        }),
      );

      step += 1;
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const selectedObject = animatedObjects.find(
    (objectItem) => objectItem.id === selectedObjectId,
  );

  const signalsWithObjects = useMemo(() => {
    return signals.map((signal) => {
      const relatedObjects = animatedObjects.filter((objectItem) =>
        objectItem.signals.includes(signal.id),
      );

      return {
        ...signal,
        objectIds: relatedObjects.map((objectItem) => objectItem.id),
      };
    });
  }, [animatedObjects]);

  const handleSelectStation = (stationId) => {
    const stationSignals = signalsWithObjects.filter(
      (signal) => signal.stationId === stationId,
    );

    const firstRelatedObjectId = stationSignals
      .flatMap((signal) => signal.objectIds)
      .at(0);

    if (firstRelatedObjectId) {
      setSelectedObjectId(firstRelatedObjectId);
    }
  };

  return (
    <div className={module.trackerLayout}>
      <aside className={module.trackerPanel}>
        <h1 className={module.trackerTitle}>Tracked objects</h1>

        <ObjectsPanel
          objects={animatedObjects}
          selectedObjectId={selectedObjectId}
          onSelectObject={setSelectedObjectId}
          onClearSelection={() => setSelectedObjectId(null)}
        />
      </aside>

      <main className={module.trackerMap}>
        <div className={module.mobileHeader}>
          <button
            type="button"
            className={module.mobileHeaderButton}
            onClick={() => setMobilePanel("objects")}
          >
            Objects
          </button>

          <h1 className={module.mobileTitle}>Target Tracker</h1>

          <button
            type="button"
            className={module.mobileHeaderButton}
            onClick={() => setMobilePanel("sensors")}
          >
            Sensors
          </button>
        </div>

        <MapView
          className={module.mapWrapper}
          stations={stations}
          objects={animatedObjects}
          signals={signalsWithObjects}
          selectedObject={selectedObject}
          onSelectStation={handleSelectStation}
        />
      </main>

      <aside className={module.trackerPanel}>
        <h2 className={module.trackerTitle}>Sensors</h2>

        <SensorsPanel
          stations={stations}
          signals={signalsWithObjects}
          selectedObject={selectedObject}
        />
      </aside>

      {mobilePanel && (
        <div
          className={module.mobileOverlay}
          onClick={() => setMobilePanel(null)}
        >
          <div
            className={module.mobileDrawer}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={module.mobileDrawerHeader}>
              <h2>
                {mobilePanel === "objects" ? "Tracked objects" : "Sensors"}
              </h2>

              <button
                type="button"
                className={module.closeButton}
                onClick={() => setMobilePanel(null)}
              >
                ✕
              </button>
            </div>

            {mobilePanel === "objects" && (
              <ObjectsPanel
                objects={animatedObjects}
                selectedObjectId={selectedObjectId}
                onSelectObject={(id) => {
                  setSelectedObjectId(id);
                  setMobilePanel(null);
                }}
                onClearSelection={() => {
                  setSelectedObjectId(null);
                  setMobilePanel(null);
                }}
              />
            )}

            {mobilePanel === "sensors" && (
              <SensorsPanel
                stations={stations}
                signals={signalsWithObjects}
                selectedObject={selectedObject}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
