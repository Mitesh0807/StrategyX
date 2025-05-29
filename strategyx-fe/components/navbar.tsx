"use client";
import { LogOut, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/lib/constants";

import { useAuth } from "./auth-provider";

export function Navbar() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push(ROUTES.HOME);
    } catch (error) {
      router.push(ROUTES.HOME);
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="h-16 border-b flex items-center transition-all duration-100">
      <div className="container mx-auto px-6 flex items-center justify-between w-full">
        {isLoading ? (
          <>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded" />
              <Skeleton className="h-6 w-32 rounded" />
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-9 w-20 rounded" />
            </div>
          </>
        ) : isAuthenticated ? (
          <>
            <div className="flex items-center space-x-10">
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6" />
                <span className="font-bold text-xl">ProductManager</span>
              </div>
              <div>
                <Link
                  href="/products"
                  className="text-sm font-medium hover:underline"
                >
                  Products
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                Welcome, {user?.firstName} {user?.lastName}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </>
        ) : (
          <div className="w-full" aria-hidden />
        )}
      </div>
    </nav>
  );
}
