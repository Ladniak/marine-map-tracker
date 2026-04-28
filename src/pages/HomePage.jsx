import { useEffect, useState } from "react";
import MapView from "../components/Map/MapView";
import StationsPanel from "../components/panels/StationsPanel";
import ObjectsPanel from "../components/panels/ObjectsPanel";
import SignalsPanel from "../components/panels/SignalsPanel";

import { stations } from "../mock/stations";
import { objects as initialObjects } from "../mock/objects";
import { signals } from "../mock/signals";

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
    <div className="page">
      <div className="page__map">
        <MapView
          stations={stations}
          objects={animatedObjects}
          signals={signals}
        />
      </div>

      <div className="page__sidebar">
        <StationsPanel stations={stations} />
        <ObjectsPanel objects={animatedObjects} />
        <SignalsPanel signals={signals} />
      </div>
    </div>
  );
}
