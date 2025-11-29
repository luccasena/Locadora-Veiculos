"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { UserUpdate } from "@/types/user/UserUpdate";

interface AuthContextType {
  user: UserUpdate | null;
  userType: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserUpdate | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [userType, setUserType] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userType");
    }
    return null;
  });

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, userType, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
