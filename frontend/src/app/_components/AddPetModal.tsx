"use client";

import { useEffect, useId, useState } from "react";

type AddPetModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AddPetModal({ open, onClose }: AddPetModalProps) {
  const titleId = useId();
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState<"Dog" | "Cat">("Dog");
  const [breed, setBreed] = useState("");
  const [ageCategory, setAgeCategory] = useState<
    "Puppy/Kitten" | "Adult" | "Senior"
  >("Adult");
  const [healthFocus, setHealthFocus] = useState("Dental");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function handleBackdropClick() {
    onClose();
  }

  function handlePanelClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    onClose();
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-orange-700/20";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
      onClick={handleBackdropClick}
    >
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={handlePanelClick}
        className="relative z-10 flex max-h-[min(92vh,720px)] w-full max-w-lg flex-col rounded-t-3xl border border-slate-200/80 bg-white shadow-2xl sm:max-h-[85vh] sm:rounded-3xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2
            id={titleId}
            className="text-lg font-semibold tracking-tight text-slate-900"
          >
            Add your pet
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700/20"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSave}
          className="min-h-0 flex-1 overflow-y-auto px-5 py-4"
        >
          <p className="text-sm leading-relaxed text-slate-500">
            Tell us about your companion—we’ll use this soon to tailor picks for
            you.
          </p>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-900">
                Pet name <span className="font-normal text-slate-500">(optional)</span>
              </span>
              <input
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className={inputClass}
                placeholder="e.g. Hazel"
                autoComplete="off"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-900">Species</span>
              <select
                value={species}
                onChange={(e) =>
                  setSpecies(e.target.value as "Dog" | "Cat")
                }
                className={inputClass}
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-900">Breed</span>
              <input
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className={inputClass}
                placeholder="e.g. Golden Retriever"
                autoComplete="off"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-900">
                Life stage
              </span>
              <select
                value={ageCategory}
                onChange={(e) =>
                  setAgeCategory(
                    e.target.value as "Puppy/Kitten" | "Adult" | "Senior",
                  )
                }
                className={inputClass}
              >
                <option value="Puppy/Kitten">Puppy / Kitten</option>
                <option value="Adult">Adult</option>
                <option value="Senior">Senior</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-900">
                Health focus
              </span>
              <select
                value={healthFocus}
                onChange={(e) => setHealthFocus(e.target.value)}
                className={inputClass}
              >
                <option value="Dental">Dental</option>
                <option value="Joint Care">Joint care</option>
                <option value="Digestion">Digestion</option>
                <option value="Skin & Coat">Skin & coat</option>
              </select>
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row-reverse">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-orange-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/10 transition-shadow hover:bg-orange-800 hover:shadow-xl hover:shadow-orange-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700/20 focus-visible:ring-offset-2 sm:w-auto sm:min-w-[140px]"
            >
              Save for later
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/30 focus-visible:ring-offset-2 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
