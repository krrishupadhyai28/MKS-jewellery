import axiosInstance from "./axiosInstance";

const couponService = {
  // ==========================
  // Get All Coupons
  // ==========================
  getAllCoupons: async (params = {}) => {
    const response = await axiosInstance.get("/coupons", {
      params,
    });

    return response.data;
  },

  // ==========================
  // Get Coupon By ID
  // ==========================
  getCouponById: async (id) => {
    const response = await axiosInstance.get(
      `/coupons/${id}`
    );

    return response.data;
  },

  // ==========================
  // Create Coupon
  // ==========================
  createCoupon: async (couponData) => {
    const response = await axiosInstance.post(
      "/coupons",
      couponData
    );

    return response.data;
  },

  // ==========================
  // Update Coupon
  // ==========================
  updateCoupon: async (id, couponData) => {
    const response = await axiosInstance.put(
      `/coupons/${id}`,
      couponData
    );

    return response.data;
  },

  // ==========================
  // Delete Coupon
  // ==========================
  deleteCoupon: async (id) => {
    const response = await axiosInstance.delete(
      `/coupons/${id}`
    );

    return response.data;
  },

  // ==========================
  // Validate Coupon
  // ==========================
  validateCoupon: async (code) => {
    const response = await axiosInstance.post(
      "/coupons/validate",
      {
        code,
      }
    );

    return response.data;
  },

  // ==========================
  // Search Coupons
  // ==========================
  searchCoupons: async (keyword) => {
    const response = await axiosInstance.get(
      "/coupons/search",
      {
        params: {
          keyword,
        },
      }
    );

    return response.data;
  },

  // ==========================
  // Filter Coupons
  // ==========================
  filterCoupons: async (filters) => {
    const response = await axiosInstance.get(
      "/coupons/filter",
      {
        params: filters,
      }
    );

    return response.data;
  },
};

export default couponService;