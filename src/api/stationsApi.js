import { httpClient } from "./httpClient";

export function getStations() {
  return httpClient("/station");
}

export function getStationById(id) {
  return httpClient(`/station/${id}`);
}
