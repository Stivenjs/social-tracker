"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import {
  ExternalLink,
  Heart,
  Instagram,
  MessageSquare,
  Info,
} from "lucide-react";
import Image from "next/image";

interface InstagramResultProps {
  // Allow data to be potentially null or undefined if no results are found
  data?: {
    user?: {
      profile_pic_url?: string;
      is_verified?: boolean;
    };
    coauthorProducers?: {
      is_verified?: boolean;
    }[];
    ownerUsername?: string;
    displayUrl?: string;
    caption?: string;
    type?: string;
    takenAt?: string;
    likesCount?: number;
    commentsCount?: number;
    url?: string;
    shortCode?: string;
    error?: string;
    errorDescription?: string;
  } | null;
}

export const InstagramResult = ({ data }: InstagramResultProps) => {
  // Check if data is missing
  if (!data || data.error || !data.coauthorProducers?.[0]?.is_verified || "") {
    return (
      <Card className="overflow-hidden border-zinc-800 bg-zinc-900 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-0">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-zinc-700 p-0.5">
              {/* Placeholder Avatar */}
              <AvatarFallback className="bg-zinc-800 text-zinc-500">
                ?
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-zinc-500">Usuario Desconocido</p>
              <p className="text-xs text-zinc-600">Instagram</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Instagram className="mr-1 h-3 w-3" />
            Instagram
          </Badge>
        </CardHeader>
        <CardContent className="p-4 flex items-center justify-center text-center min-h-[150px]">
          <div className="flex flex-col items-center gap-2 text-zinc-500">
            <Info className="h-8 w-8" />
            <p className="text-sm">
              No se encontró un perfil verificado para este usuario en
              Instagram.
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t border-zinc-800 bg-zinc-900/50 p-4">
          {/* Optionally disable or hide the button */}
          <Button
            variant="outline"
            className="w-full gap-2 border-zinc-700 bg-transparent text-zinc-600 cursor-not-allowed"
            disabled
          >
            <ExternalLink className="h-4 w-4" />
            Ver en Instagram
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Original component rendering when data is present
  return (
    <Card className="overflow-hidden border-zinc-800 bg-zinc-900 shadow-lg transition-all hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-purple-500 p-0.5">
            <AvatarImage
              src={data.user?.profile_pic_url || "/placeholder.svg"}
            />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              {data.ownerUsername?.charAt(0) || "I"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-white">
              {data.ownerUsername || "Instagram User"}
            </p>
            <p className="text-xs text-zinc-400">Instagram</p>
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <Instagram className="mr-1 h-3 w-3" />
          Instagram
        </Badge>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative aspect-square w-full md:w-[240px] md:min-w-[240px] overflow-hidden rounded-lg bg-zinc-800 flex-shrink-0">
            {data.displayUrl ? (
              <div className="group relative h-full w-full">
                <Image
                  src={data.displayUrl || "/placeholder.svg"}
                  alt={data.caption || "Instagram post"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {data.type && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/50 text-white">
                      {data.type}
                    </Badge>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <Instagram className="h-16 w-16 text-zinc-600" />
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col mt-3 md:mt-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-white">
                {data.ownerUsername || "Instagram User"}
              </span>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs text-zinc-400">
                {data.takenAt &&
                  formatDistanceToNow(new Date(data.takenAt), {
                    addSuffix: true,
                    locale: es,
                  })}
              </span>
            </div>

            {data.caption && (
              <div className="text-sm text-zinc-100 mb-3">{data.caption}</div>
            )}

            <div className="flex items-center gap-6 text-xs text-zinc-400 mt-auto">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-red-500" />
                <span>{data.likesCount?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <span>{data.commentsCount?.toLocaleString() || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-zinc-800 bg-zinc-900/50 p-4">
        <Button
          asChild
          variant="outline"
          className="w-full gap-2 border-purple-500/50 bg-transparent text-purple-500 hover:bg-purple-500/10 hover:text-purple-400"
        >
          <a
            // Ensure fallback URL is reasonable even if shortCode is missing
            href={
              data.url ||
              (data.shortCode
                ? `https://www.instagram.com/p/${data.shortCode}`
                : "#")
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" />
            Ver en Instagram
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
