import { Polyline } from "react-leaflet";

export default function ObjectPathsLayer({ objects }) {
  return (
    <>
      {objects.map((objectItem) => {
        if (!objectItem.path || objectItem.path.length < 2) return null;

        return (
          <Polyline
            key={objectItem.id}
            positions={objectItem.path}
            pathOptions={{
              color: "#d62828",
              weight: 2,
              opacity: 0.5,
            }}
          />
        );
      })}
    </>
  );
}
