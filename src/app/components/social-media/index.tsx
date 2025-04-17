"use client";

import { TiktokResult } from "@/app/components/social-media/tiktok-result";
import { YoutubeResult } from "@/app/components/social-media/youtube-result";
import { InstagramResult } from "@/app/components/social-media/instagram-result";
import { JsonResult } from "@/app/components/social-media/json-result";

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

// Export all components for direct imports
export { TiktokResult } from "@/app/components/social-media/tiktok-result";
export { YoutubeResult } from "@/app/components/social-media/youtube-result";
export { InstagramResult } from "@/app/components/social-media/instagram-result";
export { JsonResult } from "@/app/components/social-media/json-result";
