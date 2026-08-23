import axios from "axios";
import { API_V1_URL } from "../config/api";

const api = axios.create({
  baseURL: API_V1_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    const contentType = response.headers["content-type"] || "";

    if (!contentType.includes("application/json")) {
      throw new Error(
        "The API URL is not routed to the backend. Configure VITE_API_URL or proxy /api to the Node server."
      );
    }

    return response;
  },
  (error) => {
    if (error.response?.headers?.["content-type"]?.includes("text/html")) {
      error.message =
        "The API URL returned the frontend page instead of JSON. Configure VITE_API_URL or proxy /api to the Node server.";
    }

    return Promise.reject(error);
  }
);

export default api;