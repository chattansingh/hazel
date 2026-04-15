"use client";

import { useState } from "react";

import { AddPetModal } from "@/app/_components/AddPetModal";
import { TrendingProducts } from "@/app/_components/TrendingProducts";
import { MOCK_TRENDING_PRODUCTS } from "@/data/mock-products";
import { useAuthStore } from "@/stores/auth";

export default function Home() {
  const { user, logout } = useAuthStore();
  const [petModalOpen, setPetModalOpen] = useState(false);

  const firstName =
    user?.email?.split("@")[0]?.replace(/\./g, " ") ?? "there";

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

      <div className="relative z-10 mx-auto w-full max-w-lg px-4 pb-28 pt-4 sm:px-5 sm:pt-6">
        <header className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="h-10 w-10 shrink-0 rounded-2xl bg-gradient-to-br from-orange-600 to-orange-800 shadow-inner ring-1 ring-slate-200/70" />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-800">
                Hazel
              </p>
              <p className="truncate text-sm font-medium text-slate-900">
                Hi, {firstName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="shrink-0 rounded-xl border border-slate-200/90 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700/20 focus-visible:ring-offset-2"
          >
            Log out
          </button>
        </header>

        <section className="mt-6 rounded-3xl border border-slate-200/60 bg-white/90 p-5 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-800">
            Care That Knows Your Pet
          </p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-slate-900">
            Everything they need, tailored to them.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Browse trusted food, wellness, and play—then add your pet so we can
            personalize picks.
          </p>
          <button
            type="button"
            onClick={() => setPetModalOpen(true)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/10 transition-shadow hover:bg-orange-800 hover:shadow-xl hover:shadow-orange-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700/20 focus-visible:ring-offset-2 sm:w-auto sm:min-w-[200px]"
          >
            <span className="text-base font-light leading-none">+</span>
            Add your pet
          </button>
        </section>

        <div className="mt-8">
          <TrendingProducts products={MOCK_TRENDING_PRODUCTS} />
        </div>

        {user?.email ? (
          <p className="mt-10 text-center text-xs leading-relaxed text-slate-500">
            Signed in as{" "}
            <span className="font-medium text-slate-700">{user.email}</span>
          </p>
        ) : null}
      </div>

      <AddPetModal open={petModalOpen} onClose={() => setPetModalOpen(false)} />
    </div>
  );
}
