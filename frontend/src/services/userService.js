import axiosInstance from "./axiosInstance";

const userService = {
  // ==========================
  // Get All Users
  // ==========================
  getAllUsers: async (params = {}) => {
    const response = await axiosInstance.get("/users", {
      params,
    });

    return response.data;
  },

  // ==========================
  // Get User By ID
  // ==========================
  getUserById: async (id) => {
    const response = await axiosInstance.get(
      `/users/${id}`
    );

    return response.data;
  },

  // ==========================
  // Create User
  // ==========================
  createUser: async (userData) => {
    const response = await axiosInstance.post(
      "/users",
      userData
    );

    return response.data;
  },

  // ==========================
  // Update User
  // ==========================
  updateUser: async (id, userData) => {
    const response = await axiosInstance.put(
      `/users/${id}`,
      userData
    );

    return response.data;
  },

  // ==========================
  // Change User Status
  // ==========================
  updateUserStatus: async (id, status) => {
    const response = await axiosInstance.patch(
      `/users/${id}/status`,
      {
        status,
      }
    );

    return response.data;
  },

  // ==========================
  // Delete User
  // ==========================
  deleteUser: async (id) => {
    const response = await axiosInstance.delete(
      `/users/${id}`
    );

    return response.data;
  },

  // ==========================
  // Search Users
  // ==========================
  searchUsers: async (keyword) => {
    const response = await axiosInstance.get(
      "/users/search",
      {
        params: {
          keyword,
        },
      }
    );

    return response.data;
  },

  // ==========================
  // Filter Users
  // ==========================
  filterUsers: async (filters) => {
    const response = await axiosInstance.get(
      "/users/filter",
      {
        params: filters,
      }
    );

    return response.data;
  },
};

export default userService;