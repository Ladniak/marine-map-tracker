import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import MapView from "../../components/Map/MapView";
import ObjectsPanel from "../../components/panels/ObjectsPanel";
import SensorsPanel from "../../components/panels/SensorsPanel/SensorsPanel";

import { useStores } from "../../api/context/StoreContext";

import module from "./HomePage.module.css";

function HomePage() {
  const [mobilePanel, setMobilePanel] = useState(null);

  const { trackingStore } = useStores();

  useEffect(() => {
    trackingStore.loadInitialData();

    const intervalId = setInterval(() => {
      trackingStore.refreshData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [trackingStore]);

  if (trackingStore.loading) {
    return <p className={module.statusMessage}>Loading data...</p>;
  }

  if (trackingStore.error) {
    return <p className={module.statusMessage}>Error: {trackingStore.error}</p>;
  }

  return (
    <div className={module.trackerLayout}>
      <aside className={module.trackerPanel}>
        <h1 className={module.trackerTitle}>Tracked objects</h1>

        <ObjectsPanel
          objects={trackingStore.adaptedObjects}
          selectedObjectId={trackingStore.selectedObjectId}
          onSelectObject={trackingStore.setSelectedObjectId}
          onClearSelection={trackingStore.clearSelection}
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
          stations={trackingStore.adaptedStations}
          objects={trackingStore.adaptedObjects}
          signals={trackingStore.mapSignals}
          selectedObject={trackingStore.selectedObject}
          historyPath={trackingStore.selectedObjectHistoryPath}
          onSelectStation={trackingStore.handleSelectStation}
        />
      </main>

      <aside className={module.trackerPanel}>
        <h2 className={module.trackerTitle}>Sensors</h2>

        <SensorsPanel
          stations={trackingStore.visibleStations}
          signals={trackingStore.sensorSignals}
          selectedObject={trackingStore.selectedObject}
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
                objects={trackingStore.adaptedObjects}
                selectedObjectId={trackingStore.selectedObjectId}
                onSelectObject={(id) => {
                  trackingStore.setSelectedObjectId(id);
                  setMobilePanel(null);
                }}
                onClearSelection={() => {
                  trackingStore.clearSelection();
                  setMobilePanel(null);
                }}
              />
            )}

            {mobilePanel === "sensors" && (
              <SensorsPanel
                stations={trackingStore.visibleStations}
                signals={trackingStore.sensorSignals}
                selectedObject={trackingStore.selectedObject}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default observer(HomePage);
