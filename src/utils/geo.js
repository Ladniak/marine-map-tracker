export function getAngle(from, to) {
  const dy = to[0] - from[0];
  const dx = to[1] - from[1];
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}
