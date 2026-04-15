"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/auth";

const PUBLIC_PATHS = new Set<string>(["/login", "/register"]);

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, hydrateSession, status } = useAuthStore();
  const [persistReady, setPersistReady] = useState(false);

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setPersistReady(true);
    }
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setPersistReady(true);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (token) void hydrateSession();
  }, [hydrateSession, token]);

  useEffect(() => {
    if (!persistReady) return;
    const isPublic = PUBLIC_PATHS.has(pathname);
    if (!isPublic && !token && status !== "authenticating") {
      router.replace("/login");
    }
  }, [pathname, persistReady, router, status, token]);

  return <>{children}</>;
}

