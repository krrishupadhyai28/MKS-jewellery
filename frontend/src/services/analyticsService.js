import axiosInstance from "./axiosInstance";

const analyticsService = {
  // ==========================
  // Dashboard Overview
  // ==========================
  getDashboardStats: async () => {
    const response = await axiosInstance.get(
      "/analytics/dashboard"
    );

    return response.data;
  },

  // ==========================
  // Revenue Analytics
  // ==========================
  getRevenueAnalytics: async (params = {}) => {
    const response = await axiosInstance.get(
      "/analytics/revenue",
      {
        params,
      }
    );

    return response.data;
  },

  // ==========================
  // Sales Analytics
  // ==========================
  getSalesAnalytics: async (params = {}) => {
    const response = await axiosInstance.get(
      "/analytics/sales",
      {
        params,
      }
    );

    return response.data;
  },

  // ==========================
  // Customer Analytics
  // ==========================
  getCustomerAnalytics: async (params = {}) => {
    const response = await axiosInstance.get(
      "/analytics/customers",
      {
        params,
      }
    );

    return response.data;
  },

  // ==========================
  // Best Selling Products
  // ==========================
  getBestSellingProducts: async (limit = 10) => {
    const response = await axiosInstance.get(
      "/analytics/best-selling",
      {
        params: {
          limit,
        },
      }
    );

    return response.data;
  },

  // ==========================
  // Category Sales
  // ==========================
  getCategorySales: async (params = {}) => {
    const response = await axiosInstance.get(
      "/analytics/category-sales",
      {
        params,
      }
    );

    return response.data;
  },

  // ==========================
  // Monthly Sales
  // ==========================
  getMonthlySales: async (year) => {
    const response = await axiosInstance.get(
      "/analytics/monthly-sales",
      {
        params: {
          year,
        },
      }
    );

    return response.data;
  },

  // ==========================
  // Custom Date Range
  // ==========================
  getDateRangeAnalytics: async (
    startDate,
    endDate
  ) => {
    const response = await axiosInstance.get(
      "/analytics/date-range",
      {
        params: {
          startDate,
          endDate,
        },
      }
    );

    return response.data;
  },
};

export default analyticsService;