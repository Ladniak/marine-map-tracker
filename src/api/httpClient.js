const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function httpClient(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${url}`);
  }

  if (response.status === 204) return null;

  return response.json();
}
