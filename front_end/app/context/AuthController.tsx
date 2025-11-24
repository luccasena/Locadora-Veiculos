"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: any;
  userType: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedType = localStorage.getItem("userType");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedType) setUserType(storedType);
  }, []);

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
