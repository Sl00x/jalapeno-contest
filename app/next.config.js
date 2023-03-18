/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@tremor/react"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
