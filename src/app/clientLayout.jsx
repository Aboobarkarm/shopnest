// app/ClientLayout.jsx
"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppContextProvider } from "@/context/AppContext";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAuthRoute = ["/auth/login"].includes(pathname);

  return (
     <AppContextProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!isAuthRoute && <Navbar />}
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
          />
          {children}
          {!isAuthRoute && <Footer />}
        </div>
      </div>
     </AppContextProvider>
  );
}
