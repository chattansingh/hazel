"use client";

import type { MockProduct } from "@/data/mock-products";

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

function categoryStyles(category: MockProduct["category"]) {
  switch (category) {
    case "Food":
      return "bg-orange-700/10 text-orange-800";
    case "Pharmacy":
      return "bg-amber-100 text-amber-900";
    case "Toys":
      return "bg-slate-100 text-slate-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
}

export function TrendingProducts({ products }: { products: MockProduct[] }) {
  return (
    <section aria-labelledby="trending-heading">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2
            id="trending-heading"
            className="text-lg font-semibold tracking-tight text-slate-900"
          >
            Trending now
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Curated picks pet parents love this week.
          </p>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
        {products.map((p) => (
          <li key={p.id}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-orange-100/90 via-white to-amber-50">
                <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-40">
                  {p.category === "Food" ? "🍽" : p.category === "Pharmacy" ? "💊" : "🧸"}
                </div>
                <span
                  className={`absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${categoryStyles(p.category)}`}
                >
                  {p.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-3.5">
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
                  {p.name}
                </h3>
                <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500">
                  {p.description}
                </p>
                <p className="mt-2 text-sm font-semibold tabular-nums text-slate-900">
                  {formatPrice(p.price)}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
