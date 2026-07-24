import api from "./api";

export const getPublicCourses = async () => {
  const { data } = await api.get("/course/public");
  return data;
};

export const getPublicCourseBySlug = async (slug) => {
  const { data } = await api.get(`/course/public/${slug}`);
  return data;
};

export const getRelatedCourses = async (slug) => {
  const { data } = await api.get(
    `/course/public/related/${slug}`
  );

  return data;
};