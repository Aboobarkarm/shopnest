"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from '@/app/hooks/session';
import { productsDummyData, cartDummyData } from "@/Data";
import { TbCurrencyNaira } from "react-icons/tb";
import { toast } from 'react-toastify';


const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState(null); 
  const [cartItems, setCartItems] = useState({});
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

  const fetchCart = async () => {
    // check user exist later
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      // Use mock data
      const formattedCartItems = {};
      cartDummyData.forEach((item) => {
        formattedCartItems[item.productId] = item.quantity;
      });
      setCartItems(formattedCartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems({});
    };
  };

  // Filter products whenever `searchTerm` or `products` changes
  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  // Initial product and cart fetch
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  
  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      if (cartItems[productId] > 0) {
        totalCount += cartItems[productId];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo && cartItems[itemId] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[itemId];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  const addToCart = async (itemId) => {
    const cartData = structuredClone(cartItems);
    const product = products.find((p) => p._id === itemId);
    const currentQuantityInCart = cartData[itemId] || 0;

    if (product) {
      if (product.Stock > 0) {
        cartData[itemId] = currentQuantityInCart + 1;
        setCartItems(cartData);
        toast.success("Cart Added");
        console.log('cart added');

        updateStock(itemId, product.Stock - 1); // Decrease local stock

        // Mock API call (replace with real API later)
        try {
          // await axios.post("/api/cart/update", {
          //   productId: itemId,
          //   quantity: 1,
          // });
        } catch (error) {
          console.error("Error posting to cart API:", error);

          // Rollback cart and stock if API fails
          cartData[itemId] = currentQuantityInCart;
          setCartItems(cartData);
          updateStock(itemId, product.Stock);
        }
      } else {
        alert(`Product "${product.name}" is out of stock.`);
      };
    };
  };

  const updateStock = (itemId, newStock) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === itemId ? { ...product, Stock: newStock } : product
      )
    );
  };

  const updateCartQuantity = async (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    const product = products.find((p) => p._id === itemId); 
    const currentQuantityInCart = cartData[itemId] || 0;
    const stockDifference = quantity - currentQuantityInCart;

    if (product && quantity <= product.Stock + currentQuantityInCart && quantity >= 0) {
      cartData[itemId] = quantity;
      setCartItems(cartData);
      toast.success("Cart updated");

      updateStock(itemId, product.Stock - stockDifference);

      // Mock API call (replace with real API later)
      try {
        // if (quantity === 0) {
        //   await axios.delete(
        //     `/api/cart/delete?userId=${user?.id}&productId=${itemId}`
        //   );
        //   toast.success("Cart item removed");
        // } else {
        //   await axios.post("/api/cart/update", {
        //     productId: itemId,
        //     quantity,
        //   });
        // }
      } catch (error) {
        console.error("Error posting to cart API:", error);

        // Rollback changes on failure
        cartData[itemId] = currentQuantityInCart;
        setCartItems(cartData);
        updateStock(itemId, product.Stock);
      }
    } else if (product && quantity > product.Stock + currentQuantityInCart) {
      alert(`Only ${product.Stock + currentQuantityInCart} units of "${product.name}" are in stock.`);
    } else if (quantity < 0) {
      alert("Quantity cannot be negative.");
    };
  };

  const contextValue = {
    searchTerm,
    setSearchTerm,
    getCartCount,
    getCartAmount,
    addToCart,
    updateCartQuantity,
    updateStock,
    fetchCart,
    user,
    router,
    loading,
    products,
    filteredProducts,
    currency, 
    cartItems,
    setCartItems,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
