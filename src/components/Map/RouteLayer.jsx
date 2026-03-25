import { Polyline } from "react-leaflet";

export default function RouteLayer({ path }) {
  return <Polyline positions={path} color="blue" />;
}
