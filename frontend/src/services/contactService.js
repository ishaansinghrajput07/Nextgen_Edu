import api from "./api";

export const submitLead = async (leadData) => {
  const { data } = await api.post("/contact/contacts", leadData);
  return data;
};