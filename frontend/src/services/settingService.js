import axiosInstance from "./axiosInstance";

const settingService = {
  // ==========================
  // Store Settings
  // ==========================
  getStoreSettings: async () => {
    const response = await axiosInstance.get("/settings/store");

    return response.data;
  },

  updateStoreSettings: async (data) => {
    const response = await axiosInstance.put(
      "/settings/store",
      data
    );

    return response.data;
  },

  // ==========================
  // Profile
  // ==========================
  getProfile: async () => {
    const response = await axiosInstance.get(
      "/settings/profile"
    );

    return response.data;
  },

  updateProfile: async (data) => {
    const response = await axiosInstance.put(
      "/settings/profile",
      data
    );

    return response.data;
  },

  // ==========================
  // Payment Settings
  // ==========================
  getPaymentSettings: async () => {
    const response = await axiosInstance.get(
      "/settings/payment"
    );

    return response.data;
  },

  updatePaymentSettings: async (data) => {
    const response = await axiosInstance.put(
      "/settings/payment",
      data
    );

    return response.data;
  },

  // ==========================
  // Shipping Settings
  // ==========================
  getShippingSettings: async () => {
    const response = await axiosInstance.get(
      "/settings/shipping"
    );

    return response.data;
  },

  updateShippingSettings: async (data) => {
    const response = await axiosInstance.put(
      "/settings/shipping",
      data
    );

    return response.data;
  },

  // ==========================
  // Notification Settings
  // ==========================
  getNotificationSettings: async () => {
    const response = await axiosInstance.get(
      "/settings/notification"
    );

    return response.data;
  },

  updateNotificationSettings: async (data) => {
    const response = await axiosInstance.put(
      "/settings/notification",
      data
    );

    return response.data;
  },

  // ==========================
  // Security Settings
  // ==========================
  getSecuritySettings: async () => {
    const response = await axiosInstance.get(
      "/settings/security"
    );

    return response.data;
  },

  updateSecuritySettings: async (data) => {
    const response = await axiosInstance.put(
      "/settings/security",
      data
    );

    return response.data;
  },
};

export default settingService;