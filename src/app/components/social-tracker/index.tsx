"use client";

import type React from "react";
import { useState } from "react";
import { useSubscriptionManager } from "./subscription-manager";
import { Sidebar } from "./sidebar";
import { MobileSidebar } from "./mobile-sidebar";
import { SearchHeader } from "./search-header";
import { WelcomeScreen } from "./welcome-screen";
import { LoadingScreen } from "./loading-screen";
import { ResultsCard } from "./results-card";
import { LinksCard } from "./links-card";
import type { SocialTrackerProps } from "./types";

export function SocialTracker({
  username,
  setUsername,
  results,
  loading,
  error,
  handleSubmit,
}: SocialTrackerProps) {
  // New state for the username that was actually searched
  const [searchedUsername, setSearchedUsername] = useState("");

  // Use the subscription manager hook
  const { subscriptions, isSubscribed, handleSubscribe, handleUnsubscribe } =
    useSubscriptionManager(searchedUsername, results);

  // State for mobile sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to search for a user from the subscription list
  const searchSubscription = (subscriptionName: string) => {
    setUsername(subscriptionName); // Update the input field visually
    // Simulate form submission and pass the name directly
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    setSearchedUsername(subscriptionName); // Update searched username
    handleSubmit(fakeEvent, subscriptionName);
  };

  // Modify handleSubmit to update searchedUsername
  const originalHandleSubmit = handleSubmit;
  const newHandleSubmit = async (e: React.FormEvent, nameOverride?: string) => {
    setSearchedUsername(nameOverride || username); // Update searched username before search
    await originalHandleSubmit(e, nameOverride);
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* Desktop Sidebar */}
      <Sidebar
        subscriptions={subscriptions}
        searchSubscription={searchSubscription}
        loading={loading}
      />

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        subscriptions={subscriptions}
        searchSubscription={searchSubscription}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <SearchHeader
          username={username}
          setUsername={setUsername}
          handleSubmit={newHandleSubmit}
          loading={loading}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col gap-6">
            {/* Welcome screen when no results */}
            {!results.length && !loading && !error && <WelcomeScreen />}

            {/* Loading indicator */}
            {loading && <LoadingScreen />}

            {/* Scraping Results */}
            {results.length > 0 && (
              <div className="flex flex-col lg:flex-row gap-6">
                <ResultsCard
                  username={username}
                  results={results}
                  isSubscribed={isSubscribed}
                  handleSubscribe={handleSubscribe}
                  handleUnsubscribe={handleUnsubscribe}
                  searchedUsername={searchedUsername}
                />

                {/* Social Media Links Card */}
                <LinksCard
                  username={username}
                  results={results}
                  searchedUsername={searchedUsername}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
