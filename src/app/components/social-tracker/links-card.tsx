"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { renderPlatformIcon } from "@/app/components/social-tracker/platform-icons";

interface LinksCardProps {
  username: string;
  results: any[];
}

export function LinksCard({ username, results }: LinksCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white w-full lg:w-72 h-fit">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Enlaces directos</CardTitle>
        <CardDescription className="text-gray-300">
          Perfiles de {username}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {results.map((result, index) => {
            // Skip if there's an error or no items
            if (result.error || !result.items || result.items.length === 0) {
              return null;
            }

            // Get profile URL based on platform
            let profileUrl = "";
            let profileName = "";

            switch (result.platform) {
              case "youtube":
                profileUrl = result.items[0]?.channelUrl || "";
                profileName = result.items[0]?.channelName || username;
                break;
              case "instagram":
                profileUrl = result.items[0]?.inputUrl || "";
                profileName = result.items[0]?.ownerUsername || username;
                break;
              case "tiktok":
                profileUrl = result.items[0]?.authorMeta.profileUrl || "";
                profileName = result.items[0]?.authorMeta.name || username;
            }

            if (!profileUrl) return null;

            return (
              <a
                key={index}
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
              >
                {renderPlatformIcon(result.platform)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{profileName}</p>
                  <p className="text-xs text-zinc-400 truncate max-w-full">
                    {profileUrl}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
