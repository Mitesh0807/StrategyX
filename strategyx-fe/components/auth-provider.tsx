"use client";

import type React from "react";
import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { authService } from "@/lib/services/auth-service";
import { LoginCredentials, SignupData, User } from "@/lib/types/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: async () => {
      try {
        const response = await authService.getCurrentUser();
        return response.data;
      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, 
  });

  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    queryClient.setQueryData(QUERY_KEYS.AUTH.ME, response.data);
  };

  const signup = async (userData: SignupData) => {
    const response = await authService.signup(userData);
    queryClient.setQueryData(QUERY_KEYS.AUTH.ME, response.data);
  };

  const logout = async () => {
    await authService.logout();
    queryClient.setQueryData(QUERY_KEYS.AUTH.ME, null);
    queryClient.clear();
  };

  const value: AuthContextType = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

 return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  ); 
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
