"use client";

import { LogOut, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

import { useAuth } from "./auth-provider";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return null;
  }

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
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              href={ROUTES.HOME}
              className="flex items-center space-x-2 font-bold text-lg"
            >
              <Package className="h-6 w-6" />
              <span>ProductManager</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                href={ROUTES.PRODUCTS}
                className="text-foreground hover:text-primary transition-colors"
              >
                Products
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.firstName} {user?.lastName}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
