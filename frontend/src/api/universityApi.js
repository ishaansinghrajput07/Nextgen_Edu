import api from "./axios";

export const getUniversities = async () => {
  const response = await api.get("/universities");

  return response.data;
};

export const getUniversityBySlug = async (slug) => {
  const response = await api.get(
    `/universities/${slug}`
  );

  return response.data;
};