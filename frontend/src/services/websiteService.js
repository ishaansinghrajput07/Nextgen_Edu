import api from "./api";

export const getWebsiteStats = async () => {
  const { data } = await api.get("/website/stats");
  return data;
};