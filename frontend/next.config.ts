import type { NextConfig } from "next";
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Next 16 enables Turbopack by default; next-pwa injects webpack config.
  // Keep builds unblocked by providing an empty Turbopack config.
  turbopack: {},
};

export default withPWA({
  dest: "public",
  disable: isDev,
  register: true,
  skipWaiting: true,
})(nextConfig);
