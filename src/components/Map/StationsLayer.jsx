import { Marker } from "react-leaflet";

export default function StationsLayer({ stations }) {
  return (
    <>
      {stations.map((pos, i) => (
        <Marker key={i} position={pos} />
      ))}
    </>
  );
}
