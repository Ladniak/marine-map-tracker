import { httpClient } from "./httpClient";

export function getSignals() {
  return httpClient("/api/signals");
}

export function createSignal(data) {
  return httpClient("/api/signals", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function deleteSignal(id) {
  return httpClient(`/api/signals/${id}`, {
    method: "DELETE",
  });
}
