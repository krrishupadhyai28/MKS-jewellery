import axiosInstance from "./axiosInstance";

const orderService = {
  // ==========================
  // Get All Orders
  // ==========================
  getAllOrders: async (params = {}) => {
    const response = await axiosInstance.get("/orders", {
      params,
    });

    return response.data;
  },

  // ==========================
  // Get Order By ID
  // ==========================
  getOrderById: async (id) => {
    const response = await axiosInstance.get(
      `/orders/${id}`
    );

    return response.data;
  },

  // ==========================
  // Create Order
  // ==========================
  createOrder: async (orderData) => {
    const response = await axiosInstance.post(
      "/orders",
      orderData
    );

    return response.data;
  },

  // ==========================
  // Update Order
  // ==========================
  updateOrder: async (id, orderData) => {
    const response = await axiosInstance.put(
      `/orders/${id}`,
      orderData
    );

    return response.data;
  },

  // ==========================
  // Update Order Status
  // ==========================
  updateOrderStatus: async (id, status) => {
    const response = await axiosInstance.patch(
      `/orders/${id}/status`,
      {
        status,
      }
    );

    return response.data;
  },

  // ==========================
  // Cancel Order
  // ==========================
  cancelOrder: async (id) => {
    const response = await axiosInstance.patch(
      `/orders/${id}/cancel`
    );

    return response.data;
  },

  // ==========================
  // Delete Order
  // ==========================
  deleteOrder: async (id) => {
    const response = await axiosInstance.delete(
      `/orders/${id}`
    );

    return response.data;
  },

  // ==========================
  // Search Orders
  // ==========================
  searchOrders: async (keyword) => {
    const response = await axiosInstance.get(
      "/orders/search",
      {
        params: {
          keyword,
        },
      }
    );

    return response.data;
  },

  // ==========================
  // Filter Orders
  // ==========================
  filterOrders: async (filters) => {
    const response = await axiosInstance.get(
      "/orders/filter",
      {
        params: filters,
      }
    );

    return response.data;
  },
};

export default orderService;