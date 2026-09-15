import axios from "axios";

const admissionApi = axios.create({
  baseURL: "http://localhost:8000/api",
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