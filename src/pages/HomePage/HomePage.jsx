import { useEffect, useState } from "react";
import MapView from "../../components/Map/MapView";
import ObjectsPanel from "../../components/panels/ObjectsPanel";
import StationsPanel from "../../components/panels/StationsPanel";
import SignalsPanel from "../../components/panels/SignalsPanel";
import SensorsPanel from "../../components/panels/SensorsPanel/SensorsPanel";

import { stations } from "../../mock/stations";
import { objects as initialObjects } from "../../mock/objects";
import { signals } from "../../mock/signals";

import module from "./HomePage.module.css";

export default function HomePage() {
  const [animatedObjects, setAnimatedObjects] = useState(initialObjects);

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

  return (
    <div className={module.trackerLayout}>
      <aside className={module.trackerPanel}>
        <h1 className={module.trackerTitle}>Tracked objects</h1>
        <div className={module.objectContainer}>
          <ObjectsPanel objects={animatedObjects} />
        </div>
      </aside>

      <main className={module.trackerMap}>
        <MapView
          className={module.mapWrapper}
          stations={stations}
          objects={animatedObjects}
          signals={signals}
        />
      </main>

      <aside className={module.trackerPanel}>
        <h2 className={module.trackerTitle}>Sensors</h2>
        <SensorsPanel stations={stations} signals={signals} />
      </aside>
    </div>
  );
}
