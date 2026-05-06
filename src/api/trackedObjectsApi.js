import { httpClient } from "./httpClient";

export function getTrackedObjects() {
  return httpClient("/trackedObject");
}
