"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ROUTES } from "@/lib/constants";
import { serverApiClient } from "@/lib/services/server-api-client";
import type { User } from "@/lib/types";

export async function getServerUser(): Promise<User | null> {
  try {
    const response = await serverApiClient.getCurrentUser();

    return response.data || null;
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getServerUser();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  return user;
}

export async function setAuthCookie(token: string, sessionId?: string) {
  const cookieStore = await cookies();

  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  if (sessionId) {
    cookieStore.set("session-id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete("auth-token");
  cookieStore.delete("session-id");
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;
  const sessionId = cookieStore.get("session-id")?.value;

  return !!(authToken || sessionId);
}
