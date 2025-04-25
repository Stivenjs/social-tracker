"use client";

import { useEffect, useState } from "react";
import type { Subscription } from "@/app/components/social-tracker/types";
import { toast } from "sonner";

export function useSubscriptionManager(username: string, results: any[]) {
  // State for subscriptions and current subscription status
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Load subscriptions from localStorage on component mount
  useEffect(() => {
    const savedSubscriptions = localStorage.getItem(
      "socialTrackerSubscriptions"
    );
    if (savedSubscriptions) {
      try {
        const parsedSubscriptions = JSON.parse(savedSubscriptions);
        if (Array.isArray(parsedSubscriptions)) {
          setSubscriptions(parsedSubscriptions);
        } else {
          console.error("Invalid subscriptions format in localStorage");
          localStorage.removeItem("socialTrackerSubscriptions");
        }
      } catch (e) {
        console.error("Failed to parse subscriptions from localStorage", e);
        localStorage.removeItem("socialTrackerSubscriptions");
      }
    }
  }, []);

  // Update localStorage whenever subscriptions change
  useEffect(() => {
    localStorage.setItem(
      "socialTrackerSubscriptions",
      JSON.stringify(subscriptions)
    );
  }, [subscriptions]);

  // Check if the currently searched user is subscribed
  useEffect(() => {
    setIsSubscribed(
      subscriptions.some(
        (sub) => sub.name.toLowerCase() === username.toLowerCase()
      )
    );
  }, [username, subscriptions]);

  // Function to handle subscribing to the current user
  const handleSubscribe = () => {
    if (!username || !results.length) return;

    // Prevent duplicates
    if (isSubscribed) {
      toast.info(`Ya estás suscrito a ${username}`);
      return;
    }

    // Find avatar and platform from results
    let platform = "unknown";
    let avatar = "";
    const platformPriority = ["instagram", "youtube", "tiktok", "x"]; // Prioritize platforms for avatar/icon

    for (const p of platformPriority) {
      const result = results.find(
        (r) => r.platform === p && !r.error && r.items?.length > 0
      );
      if (result) {
        platform = p;
        switch (p) {
          case "instagram":
            avatar = result.items[0]?.user?.profile_pic_url;
            break;
          case "youtube":
            avatar = result.items[0]?.channelThumbnail;
            break;
          case "tiktok":
            avatar = result.items[0]?.authorMeta?.avatar;
            break;
          case "x":
            avatar = result.items[0]?.user?.profile_image_url;
            break;
        }
        if (avatar) break; // Found an avatar, stop searching
      }
    }
    // If no avatar found, try finding the first successful platform without avatar
    if (!avatar) {
      const firstSuccess = results.find((r) => !r.error && r.items?.length > 0);
      if (firstSuccess) {
        platform = firstSuccess.platform;
      }
    }

    const newSubscription: Subscription = {
      id: Date.now().toString(), // Simple unique ID
      name: username,
      avatar: avatar || undefined, // Use undefined if no avatar found
      platform: platform,
    };

    setSubscriptions((prev) => [...prev, newSubscription]);
    toast.success(`Suscrito a ${username}`);
  };

  // Function to handle unsubscribing
  const handleUnsubscribe = () => {
    if (!username) return;
    setSubscriptions((prev) =>
      prev.filter((sub) => sub.name.toLowerCase() !== username.toLowerCase())
    );
    toast.success(`Suscribir a ${username}`);
  };

  return {
    subscriptions,
    isSubscribed,
    handleSubscribe,
    handleUnsubscribe,
  };
}
