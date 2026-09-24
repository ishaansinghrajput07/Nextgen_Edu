const configuredApiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export const API_V1_URL =
  configuredApiUrl || (import.meta.env.DEV ? "http://localhost:8000/api/v1" : "/api/v1");

export const API_ORIGIN = API_V1_URL.replace(/\/api\/v1$/, "");
export const API_URL = `${API_ORIGIN}/api`;
