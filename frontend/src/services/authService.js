import axiosInstance from "./axiosInstance";

const authService = {
  // ==========================
  // Login
  // ==========================
  login: async (credentials) => {
    const response = await axiosInstance.post(
      "/auth/login",
      credentials
    );

    return response.data;
  },

  // ==========================
  // Logout
  // ==========================
  logout: async () => {
    const response = await axiosInstance.post(
      "/auth/logout"
    );

    return response.data;
  },

  // ==========================
  // Forgot Password
  // ==========================
  forgotPassword: async (email) => {
    const response = await axiosInstance.post(
      "/auth/forgot-password",
      { email }
    );

    return response.data;
  },

  // ==========================
  // Verify OTP
  // ==========================
  verifyOTP: async (data) => {
    const response = await axiosInstance.post(
      "/auth/verify-otp",
      data
    );

    return response.data;
  },

  // ==========================
  // Reset Password
  // ==========================
  resetPassword: async (data) => {
    const response = await axiosInstance.post(
      "/auth/reset-password",
      data
    );

    return response.data;
  },

  // ==========================
  // Change Password
  // ==========================
  changePassword: async (data) => {
    const response = await axiosInstance.put(
      "/auth/change-password",
      data
    );

    return response.data;
  },

  // ==========================
  // Get Logged In Admin
  // ==========================
  getProfile: async () => {
    const response = await axiosInstance.get(
      "/auth/profile"
    );

    return response.data;
  },

  // ==========================
  // Update Profile
  // ==========================
  updateProfile: async (data) => {
    const response = await axiosInstance.put(
      "/auth/profile",
      data
    );

    return response.data;
  },
};

export default authService;