import { describe, it, expect } from "vitest";

import {
  normalizeAngle,
  angleDifference,
  calculateBearing,
  buildHistoryPath,
} from "../utils/trackingUtils";

describe("normalizeAngle", () => {
  it("normalizes angle greater than 360", () => {
    expect(normalizeAngle(370)).toBe(10);
  });

  it("normalizes negative angle", () => {
    expect(normalizeAngle(-20)).toBe(340);
  });
});

describe("angleDifference", () => {
  it("calculates simple angle difference", () => {
    expect(angleDifference(10, 20)).toBe(10);
  });

  it("calculates shortest circular difference", () => {
    expect(angleDifference(350, 10)).toBe(20);
  });
});

describe("calculateBearing", () => {
  it("returns north direction", () => {
    const bearing = calculateBearing(50, 20, 51, 20);

    expect(Math.round(bearing)).toBe(0);
  });
});

describe("buildHistoryPath", () => {
  it("builds map coordinates array", () => {
    const history = [
      {
        latitude: 55.1,
        longitude: 12.1,
      },
      {
        latitude: 55.2,
        longitude: 12.2,
      },
    ];

    expect(buildHistoryPath(history)).toEqual([
      [55.1, 12.1],
      [55.2, 12.2],
    ]);
  });
});
