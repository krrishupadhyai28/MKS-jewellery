import { createContext, useContext, useEffect, useState } from "react";

const CustomerAuthContext = createContext();

export function CustomerAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("customerToken");
    const userData = localStorage.getItem("customer");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  // Updated login function to include the customer role
  const login = (token, userData) => {
    const customer = {
      ...userData,
      role: "customer",
    };

    localStorage.setItem("customerToken", token);
    localStorage.setItem("customer", JSON.stringify(customer));

    setUser(customer);
  };

  const logout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customer");

    setUser(null);
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        role: user?.role || null, // Updated to expose the user's role
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  return useContext(CustomerAuthContext);
}