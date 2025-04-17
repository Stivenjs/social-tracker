import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "instagram.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },

      {
        protocol: "https",
        hostname: "p16-common-sign-va.tiktokcdn-us.com",
      },
      {
        protocol: "https",
        hostname: "p16-sign-va.tiktokcdn.com",
      },
      {
        protocol: "https",
        hostname: "p16-pu-sign-no.tiktokcdn-eu.com",
      },
      {
        protocol: "https",
        hostname: "**.tiktokcdn.com",
      },
      {
        protocol: "https",
        hostname: "**.tiktokcdn-us.com",
      },
      {
        protocol: "https",
        hostname: "**.tiktokcdn-eu.com",
      },
      {
        protocol: "https",
        hostname: "p77-sign-va.tiktokcdn.com",
      },
      {
        protocol: "https",
        hostname: "p77-sign-sg.tiktokcdn.com",
      },
      {
        protocol: "https",
        hostname: "p77-sign-va-lite.tiktokcdn.com",
      },
      {
        protocol: "https",
        hostname: "**.cdntiktok.com",
      },
      // Instagram dominios
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      }
    ],
  },
};

export default nextConfig;
