/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_KEY: "dasdasdasd",
  },
  images: {
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
