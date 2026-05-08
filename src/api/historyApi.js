import { httpClient } from "./httpClient";

export function getObjectHistory(id) {
  return httpClient(`/history/${id}`);
}
