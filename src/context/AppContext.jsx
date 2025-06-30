"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from '@/app/hooks/session';
import { productsDummyData } from "@/Data";
import { TbCurrencyNaira } from "react-icons/tb";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState(null); 
  const router = useRouter();
  const { user } = useSession();

  const fetchProducts = async () => {
    setCurrency(
      <span>
        <TbCurrencyNaira />
      </span>
    );

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProducts(productsDummyData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  // Filter products whenever `searchTerm` or `products` changes
  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  // Initial product fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  const getCartCount = () => 3; // Mock cart count

  const contextValue = {
    searchTerm,
    setSearchTerm,
    getCartCount,
    user,
    router,
    loading,
    products,
    filteredProducts,
    currency, 
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
