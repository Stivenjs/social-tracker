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
import { ExternalLink, Play, Youtube } from "lucide-react";
import Image from "next/image";

interface YoutubeResultProps {
  data: {
    channelName?: string;
    date?: string;
    thumbnailUrl?: string;
    title?: string;
    duration?: string;
    viewCount?: number;
    text?: string;
    hashtags?: string[];
    url?: string;
  };
}

export const YoutubeResult = ({ data }: YoutubeResultProps) => {
  const formattedDate = data.date
    ? formatDistanceToNow(new Date(data.date), { addSuffix: true, locale: es })
    : "Fecha desconocida";

  return (
    <Card className="overflow-hidden border-zinc-800 bg-zinc-900 shadow-lg transition-all hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-red-500 p-0.5">
            <AvatarImage
              src={`https://www.youtube.com/s/desktop/12d6b690/img/favicon_144x144.png`}
            />
            <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-700 text-white">
              {data.channelName?.[0] || "Y"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-white">{data.channelName}</p>
            <p className="text-xs text-zinc-400">YouTube</p>
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white">
          <Youtube className="mr-1 h-3 w-3" />
          YouTube
        </Badge>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative aspect-video w-full md:w-[240px] md:min-w-[240px] overflow-hidden rounded-lg bg-zinc-800 flex-shrink-0">
            <div className="group relative h-full w-full">
              <Image
                src={data.thumbnailUrl || "/placeholder.svg"}
                alt={data.title || "YouTube video"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Play className="h-12 w-12 text-white" />
              </div>
              {data.duration && (
                <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
                  {data.duration}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col mt-3 md:mt-0">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold leading-tight text-white mb-1 line-clamp-1">
                {data.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-2">
                <span>{data.channelName}</span>
                <span>•</span>
                <span>
                  {data.viewCount?.toLocaleString() || 0} visualizaciones
                </span>
                <span>•</span>
                <span>{formattedDate}</span>
              </div>
            </div>

            {data.text && (
              <div className="text-xs text-zinc-300 line-clamp-2 mb-2">
                {data.text}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-auto">
              {data.hashtags &&
                data.hashtags.length > 0 &&
                data.hashtags.map((tag: string, i: number) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-zinc-800 text-red-400 hover:bg-zinc-700"
                  >
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-zinc-800 bg-zinc-900/50 p-4">
        <Button
          asChild
          variant="outline"
          className="w-full gap-2 border-red-500/50 bg-transparent text-red-500 hover:bg-red-500/10 hover:text-red-400"
        >
          <a href={data.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Ver en YouTube
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
