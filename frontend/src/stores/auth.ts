import { create } from "zustand";
import { persist } from "zustand/middleware";

import { apiFetch, ApiError } from "@/lib/api";

export type User = { id: number; email: string };
export type AuthResponse = { user: User; access_token: string; token_type: "bearer" };

type AuthState = {
  user: User | null;
  token: string | null;
  status: "anonymous" | "authenticating" | "authenticated";
  error: string | null;

  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hydrateSession: () => Promise<void>;
};

function errMessage(e: unknown): string {
  if (typeof e === "object" && e && "message" in e) {
    const msg = (e as ApiError).message;
    if (typeof msg === "string") return msg;
  }
  return "Something went wrong";
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      status: "anonymous",
      error: null,

      register: async (email, password) => {
        set({ status: "authenticating", error: null });
        try {
          const resp = await apiFetch<AuthResponse>("/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, password }),
          });
          set({ user: resp.user, token: resp.access_token, status: "authenticated" });
        } catch (e) {
          set({ status: "anonymous", error: errMessage(e) });
          throw e;
        }
      },

      login: async (email, password) => {
        set({ status: "authenticating", error: null });
        try {
          const resp = await apiFetch<AuthResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
          });
          set({ user: resp.user, token: resp.access_token, status: "authenticated" });
        } catch (e) {
          set({ status: "anonymous", error: errMessage(e) });
          throw e;
        }
      },

      logout: () => set({ user: null, token: null, status: "anonymous", error: null }),

      hydrateSession: async () => {
        const token = get().token;
        if (!token) return;
        set({ status: "authenticating", error: null });
        try {
          const me = await apiFetch<User>("/auth/me", { token });
          set({ user: me, status: "authenticated", error: null });
        } catch {
          set({ user: null, token: null, status: "anonymous", error: null });
        }
      },
    }),
    {
      name: "hazel-auth",
      partialize: (s) => ({ user: s.user, token: s.token }),
    },
  ),
);

