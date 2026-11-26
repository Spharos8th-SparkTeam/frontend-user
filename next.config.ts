import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.goodsmile.info" },
      { protocol: "https", hostname: "assets.tcgdex.net" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "animate.godohosting.com" },
      { protocol: "https", hostname: "chiikawamarket.jp" },
      { protocol: "https", hostname: "images.brickset.com" },
      { protocol: "https", hostname: "images.ygoprodeck.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
