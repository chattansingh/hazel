"use client";

import Link from "next/link";

import { useAuthStore } from "@/stores/auth";

export default function Home() {
  const { status, user, logout } = useAuthStore();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-orange-50 via-white to-amber-50">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-28 h-[22rem] w-[22rem] rounded-full bg-gradient-to-br from-orange-200/50 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-24 h-[20rem] w-[20rem] rounded-full bg-gradient-to-bl from-amber-200/45 to-transparent blur-3xl"
      />

      <main className="relative z-10 mx-auto w-full max-w-md px-5 pb-16 pt-14 md:max-w-[24rem] md:pt-20">
        <div className="rounded-3xl border border-slate-200/50 bg-white/95 p-7 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-8">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center rounded-full bg-orange-700/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-700">
              Hazel
            </span>
            <p className="mt-2.5 max-w-[18rem] text-[13px] leading-snug text-slate-500">
              Care That Knows Your Pet
            </p>
          </div>

          <div className="mt-8 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1 pt-0.5">
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900">
                Care That Knows Your Pet
              </h1>
            </div>
            <div className="h-11 w-11 shrink-0 rounded-2xl bg-gradient-to-br from-orange-600 to-orange-800 shadow-inner ring-1 ring-slate-200/70" />
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200/60 bg-slate-50/60 p-4">
            {status === "authenticated" && user ? (
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-slate-900">
                  Signed in as{" "}
                  <span className="font-medium text-slate-900">
                    {user.email}
                  </span>
                </p>
                <button
                  onClick={logout}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-orange-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/10 transition-shadow hover:bg-orange-800 hover:shadow-xl hover:shadow-orange-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700/20 focus-visible:ring-offset-2"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-slate-500">
                  You’re not signed in yet.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-xl bg-orange-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/10 transition-shadow hover:bg-orange-800 hover:shadow-xl hover:shadow-orange-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700/20 focus-visible:ring-offset-2"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200/90 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/30 focus-visible:ring-offset-2"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>

          <p className="mt-10 text-center text-xs leading-relaxed text-slate-500">
            Phase 1 focus: authentication. Next up: browse-first home + pet
            modal.
          </p>
        </div>
      </main>
    </div>
  );
}
