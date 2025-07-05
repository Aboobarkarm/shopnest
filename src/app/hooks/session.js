'use client';

import { useState, useEffect } from 'react';

export function useSession() {

  const [session, setSession] = useState({
    user: null,
    isSpecificUser: false,
    isSuperAdmin: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Simulate delay like real API
    const timer = setTimeout(() => {
      const mockUser = {
        name: "Abubakar",
        email: "abubakar@example.com",
        role: "SUPERADMIN",
        id: "12345",
      };

      setSession({
        user: mockUser,
        isSpecificUser: mockUser.role === "ADMIN",
        isSuperAdmin: mockUser.role === "SUPERADMIN",
        loading: false,
        error: null,
      });
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  const logout = () => {
    console.log("✅ Mock logout triggered");

    setSession({
      user: null,
      isSpecificUser: false,
      isSuperAdmin: false,
      loading: false,
      error: null,
    });
  };

  return { ...session, logout };
};
