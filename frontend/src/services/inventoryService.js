import axiosInstance from "./axiosInstance";

const inventoryService = {
  // ==========================
  // Get All Inventory
  // ==========================
  getAllInventory: async (params = {}) => {
    const response = await axiosInstance.get("/inventory", {
      params,
    });

    return response.data;
  },

  // ==========================
  // Get Inventory By Product ID
  // ==========================
  getInventoryById: async (id) => {
    const response = await axiosInstance.get(
      `/inventory/${id}`
    );

    return response.data;
  },

  // ==========================
  // Create Inventory
  // ==========================
  createInventory: async (inventoryData) => {
    const response = await axiosInstance.post(
      "/inventory",
      inventoryData
    );

    return response.data;
  },

  // ==========================
  // Update Inventory
  // ==========================
  updateInventory: async (id, inventoryData) => {
    const response = await axiosInstance.put(
      `/inventory/${id}`,
      inventoryData
    );

    return response.data;
  },

  // ==========================
  // Update Stock
  // ==========================
  updateStock: async (id, stock) => {
    const response = await axiosInstance.patch(
      `/inventory/${id}/stock`,
      { stock }
    );

    return response.data;
  },

  // ==========================
  // Get Low Stock Products
  // ==========================
  getLowStockProducts: async () => {
    const response = await axiosInstance.get(
      "/inventory/low-stock"
    );

    return response.data;
  },

  // ==========================
  // Search Inventory
  // ==========================
  searchInventory: async (keyword) => {
    const response = await axiosInstance.get(
      "/inventory/search",
      {
        params: {
          keyword,
        },
      }
    );

    return response.data;
  },

  // ==========================
  // Delete Inventory
  // ==========================
  deleteInventory: async (id) => {
    const response = await axiosInstance.delete(
      `/inventory/${id}`
    );

    return response.data;
  },
};

export default inventoryService;