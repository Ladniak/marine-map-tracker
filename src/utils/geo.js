export function normalizeAngle(angle) {
  return (angle + 360) % 360;
}

export function calculateBearing(fromLat, fromLng, toLat, toLng) {
  const avgLatRad = (((fromLat + toLat) / 2) * Math.PI) / 180;

  const y = toLat - fromLat;
  const x = (toLng - fromLng) * Math.cos(avgLatRad);

  const angle = (Math.atan2(x, y) * 180) / Math.PI;

  return normalizeAngle(angle);
}

export function getSignalEndPoint(
  latitude,
  longitude,
  azimuth,
  length = 0.035,
) {
  const angleRad = (azimuth * Math.PI) / 180;
  const latRad = (latitude * Math.PI) / 180;

  const newLat = latitude + length * Math.cos(angleRad);
  const newLng = longitude + (length * Math.sin(angleRad)) / Math.cos(latRad);

  return [newLat, newLng];
}

export function getBearingIntersection(stationA, bearingA, stationB, bearingB) {
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
