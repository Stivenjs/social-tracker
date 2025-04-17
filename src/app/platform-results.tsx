"use client";

import {
  JsonResult,
  TiktokResult,
  YoutubeResult,
  InstagramResult,
} from "@/app/components/social-media";

// Function to render the appropriate component based on platform
export const renderPlatformResult = (platform: string, data: any) => {
  if (!data) return null;

  switch (platform) {
    case "youtube":
      return <YoutubeResult data={data} />;
    case "instagram":
      return <InstagramResult data={data} />;
    case "tiktok":
      return <TiktokResult data={data} />;

    default:
      return <JsonResult data={data} />;
  }
};
