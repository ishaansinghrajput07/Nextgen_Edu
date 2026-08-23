const configuredApiOrigin = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export const API_ORIGIN =
  configuredApiOrigin || (import.meta.env.DEV ? "http://localhost:8000" : "");

export const API_CONFIGURATION_ERROR =
  !configuredApiOrigin && !import.meta.env.DEV
    ? "Production API URL is not configured. Set VITE_API_URL to the public backend URL."
    : null;

export const API_V1_URL = `${API_ORIGIN}/api/v1`;
export const API_URL = `${API_ORIGIN}/api`;
