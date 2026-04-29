import { useMemo, useState } from "react";
import MapView from "../../components/Map/MapView";
import ObjectsPanel from "../../components/panels/ObjectsPanel";
import SensorsPanel from "../../components/panels/SensorsPanel/SensorsPanel";

import { stations } from "../../mock/stations";
import { objects as initialObjects } from "../../mock/objects";
import { signals } from "../../mock/signals";

import module from "./HomePage.module.css";

function normalizeAngle(angle) {
  return (angle + 360) % 360;
}

function getBearingIntersection(stationA, bearingA, stationB, bearingB) {
  const refLat =
    (((stationA.latitude + stationB.latitude) / 2) * Math.PI) / 180;
  const cosRef = Math.cos(refLat);

  const x1 = stationA.longitude * cosRef;
  const y1 = stationA.latitude;

  const x2 = stationB.longitude * cosRef;
  const y2 = stationB.latitude;

  const angleA = (bearingA * Math.PI) / 180;
  const angleB = (bearingB * Math.PI) / 180;

  const dx1 = Math.sin(angleA);
  const dy1 = Math.cos(angleA);

  const dx2 = Math.sin(angleB);
  const dy2 = Math.cos(angleB);

  const denominator = dx1 * dy2 - dy1 * dx2;

  if (Math.abs(denominator) < 0.000001) {
    return null;
  }

  const t = ((x2 - x1) * dy2 - (y2 - y1) * dx2) / denominator;

  const intersectionX = x1 + t * dx1;
  const intersectionY = y1 + t * dy1;

  return {
    latitude: intersectionY,
    longitude: intersectionX / cosRef,
  };
}

export default function HomePage() {
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [mobilePanel, setMobilePanel] = useState(null);

  const signalsWithObjects = useMemo(() => {
    return signals.map((signal) => {
      const relatedObjects = initialObjects.filter((objectItem) =>
        objectItem.signals.includes(signal.id),
      );

      return {
        ...signal,
        objectIds: relatedObjects.map((objectItem) => objectItem.id),
      };
    });
  }, []);

  const triangulatedObjects = useMemo(() => {
    return initialObjects.map((objectItem) => {
      const objectSignals = objectItem.signals
        .map((signalId) => signals.find((signal) => signal.id === signalId))
        .filter(Boolean);

      if (objectSignals.length < 2) {
        return objectItem;
      }

      const firstSignal = objectSignals[0];
      const secondSignal = objectSignals[1];

      const firstStation = stations.find(
        (station) => station.id === firstSignal.stationId,
      );

      const secondStation = stations.find(
        (station) => station.id === secondSignal.stationId,
      );

      if (!firstStation || !secondStation) {
        return objectItem;
      }

      const intersection = getBearingIntersection(
        firstStation,
        firstSignal.correctedAzimuth,
        secondStation,
        secondSignal.correctedAzimuth,
      );

      if (!intersection) {
        return objectItem;
      }

      return {
        ...objectItem,
        latitude: intersection.latitude,
        longitude: intersection.longitude,
        direction: normalizeAngle(objectItem.direction),
        triangulated: true,
      };
    });
  }, []);

  const selectedObject = triangulatedObjects.find(
    (objectItem) => objectItem.id === selectedObjectId,
  );

  const selectedObjectSignals = useMemo(() => {
    if (!selectedObject) return [];

    return selectedObject.signals
      .map((signalId) => {
        const signal = signalsWithObjects.find((item) => item.id === signalId);

        if (!signal) return null;

        return {
          ...signal,
          objectIds: [selectedObject.id],
        };
      })
      .filter(Boolean);
  }, [selectedObject, signalsWithObjects]);

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

  const mapSignals = selectedObject ? selectedObjectSignals : [];
  const sensorSignals = selectedObject
    ? selectedObjectSignals
    : signalsWithObjects;

  return (
    <div className={module.trackerLayout}>
      <aside className={module.trackerPanel}>
        <h1 className={module.trackerTitle}>Tracked objects</h1>

        <ObjectsPanel
          objects={triangulatedObjects}
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
          objects={triangulatedObjects}
          signals={mapSignals}
          selectedObject={selectedObject}
          onSelectStation={handleSelectStation}
        />
      </main>

      <aside className={module.trackerPanel}>
        <h2 className={module.trackerTitle}>Sensors</h2>

        <SensorsPanel
          stations={stations}
          signals={sensorSignals}
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
                objects={triangulatedObjects}
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
                signals={sensorSignals}
                selectedObject={selectedObject}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
