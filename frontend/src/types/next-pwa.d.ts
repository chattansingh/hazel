declare module "next-pwa" {
  // Minimal typing to satisfy Next.js typecheck in this repo.
  const withPWA: (config?: unknown) => (nextConfig: unknown) => unknown;
  export default withPWA;
}

