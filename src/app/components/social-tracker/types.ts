import type React from "react";
// Define the structure for a subscription
export interface Subscription {
  id: string;
  name: string;
  avatar?: string;
  platform: string;
}

// Props for the SocialTracker component
export interface SocialTrackerProps {
  username: string;
  setUsername: (username: string) => void;
  results: any[];
  loading: boolean;
  error: string;
  handleSubmit: (e: React.FormEvent, searchName?: string) => Promise<void>;
}

// Platform types
export type Platform = "tiktok" | "youtube" | "instagram" | "x" | "unknown";
