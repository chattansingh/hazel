# Project Overview: Pet Tech E-Commerce MVP

## The Goal
Build a working Progressive Web App (PWA) prototype to demonstrate to investors. The core differentiator is a "Personalization Engine." The platform looks like a standard e-commerce store, but instantly re-renders its product catalog based on a user's specific pet profile (e.g., filtering for a specific breed, age).

## Tech Stack (Strict Requirements)
* **Frontend:** Next.js (App Router), React, Tailwind CSS.
* **State Management:** Zustand (for the slide-out cart and global user state).
* **PWA:** Must include standard PWA configurations (manifest, offline caching).
* **Backend:** Python, FastAPI.
* **Database:** SQLite (local file for the MVP).
* **Design Paradigm:** Mobile-first, clean, modern, and frictionless.

---

## Core Data Models (SQLite / Mock Data)

**1. Product Model:**
* Requires: `id`, `name`, `price`, `description`, `category` (Food, Pharmacy, Toys).
* Requires: `tags` (String of comma-separated values like "dog, puppy, large-breed, dental"). *This is critical for the recommendation engine.*
* We will seed the database with 100 mock products heavily weighted toward supplements, toys and other pet products.

**2. Pet Profile Model:**
* Requires: `species` (Dog, Cat).
* Requires: `breed` (e.g., Golden Retriever).
* Requires: `age_category` (Puppy/Kitten, Adult, Senior).
* Requires: `health_focus` (e.g., Dental, Joint Care, Digestion).

---

## The MVP User Journey (Scope of Work)

**Phase 1: Basic Authentication**
Build the full “account access” slice end-to-end (FastAPI + Next.js) so investors can register, log in, and land in the app with authenticated state.

**User-facing scope**
* **Register:** Email + password + confirm password.
* **Login:** Email + password.
* **Logout:** Clears session and returns user to public experience.
* **Protected navigation:** Users can’t access authenticated routes without a valid session.

**Backend (FastAPI) scope**
* **SQLite model:** `User`
  * Fields: `id` (int PK), `email` (unique, indexed), `password_hash`, `created_at`, `updated_at`.
  * Constraints: email uniqueness enforced at DB level.
* **Password security**
  * Store only a **salted hash** (never raw passwords).
  * Enforce minimum password rules (keep it simple, e.g. length-based) and clear validation errors.
* **JWT authentication**
  * Issue a JWT on successful login (and optionally right after registration).
  * Include standard claims: `sub` (user id), `exp`, `iat`.
  * Provide a dependency/guard for protected endpoints.
* **API endpoints (contract)**
  * `POST /auth/register`
    * Body: `{ "email": string, "password": string }`
    * Responses:
      * `201`: `{ "user": { "id": number, "email": string }, "access_token": string, "token_type": "bearer" }`
      * `409`: email already exists
      * `422`: validation error
  * `POST /auth/login`
    * Body: `{ "email": string, "password": string }`
    * Responses:
      * `200`: `{ "user": { "id": number, "email": string }, "access_token": string, "token_type": "bearer" }`
      * `401`: invalid credentials
  * `GET /auth/me` (protected)
    * Header: `Authorization: Bearer <token>`
    * Response `200`: `{ "id": number, "email": string }`
* **CORS:** Configure so the Next.js frontend can call the API in local dev and demo environments.

**Frontend (Next.js App Router) scope**
* **Routes**
  * Public: `/login`, `/register`
  * Protected: `/` (temporary: show a simple authenticated “Welcome” and a link/button to log out)
* **Session storage approach (for MVP)**
  * Store JWT in a client-side store (Zustand) and persist via `localStorage` so refresh keeps the session.
  * Attach the JWT on API requests via `Authorization` header.
* **Route protection strategy**
  * Client-side guard for protected pages: if no token, redirect to `/login`.
  * On app load, call `/auth/me` to validate the token; if invalid/expired, clear session and redirect.
* **UI/UX requirements**
  * Mobile-first, minimal friction, premium feel.
  * Inline validation + clear error messages (e.g., “Email already in use”, “Wrong password”).
  * Loading states for auth actions; disable buttons while submitting.

**Out of scope for Phase 1**
* Social login (Google/Apple), OTP, magic links, MFA.
* Password reset flows.
* Role-based access control.
* Server-side session cookies / refresh tokens (keep it simple for MVP).

**Phase 1 “Done” checklist (acceptance criteria)**
* A new user can register, is immediately logged in, and sees the protected home.
* An existing user can log in and persists across refresh.
* Invalid credentials and duplicate emails show correct errors (no generic “something went wrong”).
* Visiting `/` while logged out redirects to `/login`.
* Logging out clears session and prevents access to protected routes.

**Phase 2: The "Browse First" Home Page**
* Default state shows "Trending Products" and general pet care.
* Must feature a prominent, frictionless UI modal to "Add Your Pet."

**Phase 3: The Personalization Engine (The Hook)**
* When a user inputs a pet (e.g., "Hazel, Dog, Adult, Dental"), the frontend sends this to FastAPI.
* FastAPI queries the SQLite database using SQL `LIKE` operators against the product `tags`.
* The Home Page re-renders to say "Recommended for Hazel" and displays the highly specific filtered products.

**Phase 4: Cart & Checkout Summary**
* Global slide-out cart using Zustand.
* Local storage persistence so the cart survives a page refresh.
* Frictionless "Confirm Mock Order" button (No Stripe/Razorpay integration required yet).

---

## AI Developer Instructions (Rules for Cursor)
1.  **Act as a Senior Full-Stack Engineer.** Write clean, modular, and heavily commented code.
2.  **One Step at a Time.** Do not attempt to build the entire app in one prompt. Wait for my specific instructions (e.g., "Let's build the FastAPI login route first").
3.  **UI/UX Focus.** When writing Next.js frontend code, ensure the Tailwind design is polished, looks premium enough for an investor demo, and functions perfectly on mobile screen sizes.
4.  **Keep it lean.** Do not add unnecessary libraries or complex architectural patterns unless strictly required for the features listed above.