"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuthStore } from "@/stores/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { register, error, status } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const busy = status === "authenticating";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirm) {
      setLocalError("Passwords do not match.");
      return;
    }

    try {
      await register(email, password);
      router.push("/");
    } catch {
      // Store already has a server error message when available.
      setLocalError(null);
    }
  }

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

          <h1 className="mt-8 text-center text-2xl font-semibold tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="mt-3 text-center text-sm leading-relaxed text-slate-500">
            One minute setup. We’ll personalize the catalog right after.
          </p>

          <form onSubmit={onSubmit} className="mt-10 space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-900">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                className="mt-2 w-full rounded-xl border border-slate-200/90 bg-white px-3.5 py-3 text-sm text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] placeholder:text-slate-400 outline-none transition-[box-shadow,border-color] focus:border-slate-300 focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus:ring-2 focus:ring-orange-700/20"
                placeholder="you@domain.com"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-900">
                Password
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="mt-2 w-full rounded-xl border border-slate-200/90 bg-white px-3.5 py-3 text-sm text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] placeholder:text-slate-400 outline-none transition-[box-shadow,border-color] focus:border-slate-300 focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus:ring-2 focus:ring-orange-700/20"
                placeholder="At least 8 characters"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-900">
                Confirm password
              </span>
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="mt-2 w-full rounded-xl border border-slate-200/90 bg-white px-3.5 py-3 text-sm text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] placeholder:text-slate-400 outline-none transition-[box-shadow,border-color] focus:border-slate-300 focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus:ring-2 focus:ring-orange-700/20"
                placeholder="Repeat password"
              />
            </label>

            {(localError || error) && (
              <div className="rounded-xl border border-rose-200/80 bg-rose-50 px-3 py-2.5 text-sm text-rose-700">
                {localError ?? error}
              </div>
            )}

            <button
              disabled={busy}
              className="inline-flex w-full items-center justify-center rounded-xl bg-orange-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/10 transition-shadow hover:bg-orange-800 hover:shadow-xl hover:shadow-orange-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
            >
              {busy ? "Creating…" : "Create account"}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-orange-700 underline decoration-orange-700/25 underline-offset-[5px] transition-colors hover:text-orange-800"
            >
              Log in
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
