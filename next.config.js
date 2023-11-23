/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["source.unsplash.com", "m.media-amazon.com"],
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
