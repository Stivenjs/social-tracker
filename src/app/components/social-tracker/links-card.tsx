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
            // Skip if there's an error or no items or the first item itself indicates an error (like Instagram not_found)
            if (result.error || !result.items || result.items.length === 0 || result.items[0]?.error) {
              return null;
            }

            // Get profile URL based on platform
            let profileUrl = "";
            let profileName = "";
            const firstItem = result.items[0]; // Store first item for easier access

            switch (result.platform) {
              case "youtube":
                // Assuming YouTube structure is consistent for now
                profileUrl = firstItem?.channelUrl || "";
                profileName = firstItem?.channelName || username || "YouTube";
                break;
              case "instagram":
                 // Use inputUrl if available, otherwise construct from ownerUsername
                 profileUrl = firstItem?.inputUrl || (firstItem?.ownerUsername ? `https://www.instagram.com/${firstItem.ownerUsername}/` : '');
                 profileName = firstItem?.ownerUsername || username || "Instagram";
                break;
              case "tiktok":
                // Safely access authorMeta and its properties
                const authorMeta = firstItem?.authorMeta;
                profileUrl = authorMeta?.profileUrl || (authorMeta?.name ? `https://www.tiktok.com/@${authorMeta.name}` : ''); // Construct URL if profileUrl missing but name exists
                profileName = authorMeta?.name || username || "TikTok";
                break;
            }

            // Skip rendering if no valid profile URL could be determined
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
