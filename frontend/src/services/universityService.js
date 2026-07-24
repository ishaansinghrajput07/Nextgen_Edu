import api from "./api";

// =====================================
// Public - Approved Universities
// =====================================

export const getApprovedUniversities = async () => {
  const { data } = await api.get(
    "/university/public"
  );

  return data;
};

// =====================================
// Public - Single University
// =====================================

export const getUniversityBySlug = async (
  slug
) => {
  const { data } = await api.get(
    `/university/public/${slug}`
  );

  return data;
};

// =====================================
// Trusted Universities Slider
// =====================================

export const getTrustedUniversities =
  async () => {
    const { data } = await api.get(
      "/university/trusted"
    );

    return data;
  };