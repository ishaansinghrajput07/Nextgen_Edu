import axios from "axios";
import { API_URL } from "../config/api";

const admissionApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

admissionApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default admissionApi;