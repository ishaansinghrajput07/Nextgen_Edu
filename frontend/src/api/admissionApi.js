import axios from "axios";

const admissionApi = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export default admissionApi;