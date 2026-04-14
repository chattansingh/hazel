"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/stores/auth";

const PUBLIC_PATHS = new Set<string>(["/login", "/register"]);

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, hydrateSession, status } = useAuthStore();

  useEffect(() => {
    if (token) void hydrateSession();
  }, [hydrateSession, token]);

  useEffect(() => {
    const isPublic = PUBLIC_PATHS.has(pathname);
    if (!isPublic && !token && status !== "authenticating") {
      router.replace("/login");
    }
  }, [pathname, router, status, token]);

  return <>{children}</>;
}

