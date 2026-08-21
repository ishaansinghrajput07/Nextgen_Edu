import axios from "axios";
import { API_V1_URL } from "../config/api";

const api = axios.create({
  baseURL: API_V1_URL,
  withCredentials: true,
});

export default api;