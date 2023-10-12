/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_APP_GOOGLE_API_URL: process.env.NEXT_APP_GOOGLE_API_URL,
  },
  images: {
    domains: ["source.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.urga.mn",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
