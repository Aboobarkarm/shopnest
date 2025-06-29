// context/AppContext.js
"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // ✅ Mock session & cart data
  const user = { name: "Abubakar", email: "abubakar@example.com" };
  const isSpecificUser = true;
  const isSuperAdmin = false;

  const logout = () => {
    console.log("Mock logout triggered");
  };
  
  const getCartCount = () => 3; // Mock cart count

  const contextValue = {
    searchTerm,
    setSearchTerm,
    getCartCount,
    user,
    isSpecificUser,
    isSuperAdmin,
    logout,
    router,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
