"use client";

import { Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import type { Platform } from "@/app/components/social-tracker/types";

export function renderPlatformIcon(platform: Platform | string) {
  switch (platform) {
    case "x":
      return (
        <div className="rounded-full bg-black p-2">
          <Twitter className="h-5 w-5" />
        </div>
      );
    case "youtube":
      return (
        <div className="rounded-full bg-red-600 p-2">
          <Youtube className="h-5 w-5" />
        </div>
      );
    case "instagram":
      return (
        <div className="rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-2">
          <Instagram className="h-5 w-5" />
        </div>
      );
    case "tiktok":
      return (
        <div className="rounded-full bg-white p-2">
          <Image
            src="/tiktok.svg"
            alt="TikTok"
            width={27}
            height={27}
            className="h-5 w-5"
          />
        </div>
      );
    default:
      return null;
  }
}
