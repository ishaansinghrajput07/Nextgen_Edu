import axiosInstance from "./axiosInstance";

const commissionApi = {
  // =====================================================
  // ADMIN
  // =====================================================

  // Admin Commission Report
  getAdminCommissionReport: async (params = {}) => {
    const response = await axiosInstance.get(
      "/commissions/admin/report",
      { params }
    );

    return response.data;
  },

  // Commission History
  getCommissionHistory: async (params = {}) => {
    const response = await axiosInstance.get(
      "/commissions/history",
      { params }
    );

    return response.data;
  },

  // Export Commission Report
  exportCommissionReport: async (params = {}) => {
    const response = await axiosInstance.get(
      "/commissions/export",
      { params }
    );

    return response.data;
  },

  // Create Commission
  createCommission: async (data) => {
    const response = await axiosInstance.post(
      "/commissions/create",
      data
    );

    return response.data;
  },

  // =====================================================
  // PAYMENTS
  // =====================================================

  // Add Commission Payment
  addCommissionPayment: async (id, data) => {
    const response = await axiosInstance.post(
      `/commissions/payment/${id}`,
      data
    );

    return response.data;
  },

  // Update Commission Payment
  updateCommissionPayment: async (
    id,
    paymentId,
    data
  ) => {
    const response = await axiosInstance.put(
      `/commissions/payment/${id}/${paymentId}`,
      data
    );

    return response.data;
  },

  // Delete Commission Payment
  deleteCommissionPayment: async (
    id,
    paymentId
  ) => {
    const response = await axiosInstance.delete(
      `/commissions/payment/${id}/${paymentId}`
    );

    return response.data;
  },

  // =====================================================
  // COUNSELLOR
  // =====================================================

  // My Commission
  getMyCommission: async () => {
    const response = await axiosInstance.get(
      "/commissions/my"
    );

    return response.data;
  },

  // Counsellor Dashboard
  getCounsellorCommissionDashboard: async () => {
    const response = await axiosInstance.get(
      "/commissions/dashboard"
    );

    return response.data;
  },
};

export default commissionApi;