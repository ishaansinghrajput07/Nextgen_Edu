import axios from "axios";
import { API_V1_URL } from "../config/api";

const notificationApi = axios.create({
  baseURL: API_V1_URL,
  withCredentials: true,
});

notificationApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default notificationApi;