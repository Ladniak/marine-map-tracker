import ObjectMarker from "./ObjectMarker";

export default function ObjectsLayer({ objects }) {
  return (
    <>
      {objects.map((objectItem) => (
        <ObjectMarker key={objectItem.id} objectItem={objectItem} />
      ))}
    </>
  );
}
