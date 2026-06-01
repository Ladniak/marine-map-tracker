export function normalizeAngle(angle) {
  return (angle + 360) % 360;
}

export function angleDifference(a, b) {
  const diff = Math.abs(normalizeAngle(a) - normalizeAngle(b));

  return Math.min(diff, 360 - diff);
}

export function calculateBearing(fromLat, fromLng, toLat, toLng) {
  const avgLatRad = (((fromLat + toLat) / 2) * Math.PI) / 180;

  const y = toLat - fromLat;
  const x = (toLng - fromLng) * Math.cos(avgLatRad);

  return normalizeAngle((Math.atan2(x, y) * 180) / Math.PI);
}

export function buildHistoryPath(history) {
  return history
    .map((point) => [point.latitude, point.longitude])
    .filter(
      ([latitude, longitude]) =>
        typeof latitude === "number" && typeof longitude === "number",
    );
}
