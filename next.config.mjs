!process.env.SKIP_ENV_VALIDATION && (async () => await import("./env.mjs"))();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // enables typed rendering and progress routes
  },
};

export default nextConfig;
