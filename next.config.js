/* eslint-disable @typescript-eslint/no-var-requires */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/, /_middleware\.js$/],
});
const headers = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "sameorigin",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "same-origin",
  },
  {
    key: "Permissions-Policy",
    value: "geolocation=*", // allow specified policies here
  },
];

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "res.cloudinary.com"],
  },
  eslint: {
    dirs: ["pages", "lib", "context", "components", "config"],
  },
  experimental: {
    esmExternals: true,
  },
  swcMinify: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers,
      },
    ];
  },
});
