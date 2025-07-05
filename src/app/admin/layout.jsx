"use client";
import React from "react";
import SideBar from '@/components/admin/Sidebar';
import Navbar from '@/components/admin/Navbar';
import { AppContextProvider } from "@/context/AppContext"; 

const Layout = ({ children }) => {
  return (
    <AppContextProvider>
      <Navbar />
      <div className="flex w-full">
        <SideBar />
        {children}
      </div>
    </AppContextProvider>
  );
};

export default Layout;
