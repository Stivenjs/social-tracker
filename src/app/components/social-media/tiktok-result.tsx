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
import { ExternalLink, Play, Info } from "lucide-react"; 
import Image from "next/image";

interface TiktokResultProps {
  // Allow data to be potentially null or undefined
  data?: {
    authorMeta?: {
      avatar?: string;
      nickName?: string;
      name?: string;
    };
    createTimeISO?: string;
    text?: string;
    videoMeta?: {
      coverUrl?: string;
      duration?: number;
    };
    playCount?: number;
    webVideoUrl?: string;
    mentions?: string[];
    error?: string;
    errorDescription?: string;
  } | null;
}

export const TiktokResult = ({ data }: TiktokResultProps) => {
  // Check if data is missing
   if (!data || data.error) {
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
               <p className="font-semibold text-zinc-500">
                 Usuario Desconocido
               </p>
               <p className="text-xs text-zinc-600">TikTok</p>
             </div>
           </div>
           <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
             <Image
               src="/tiktok.svg"
               alt="TikTok logo"
               width={24}
               height={24}
             />
             TikTok
           </Badge>
         </CardHeader>
         <CardContent className="p-4 flex items-center justify-center text-center min-h-[150px]">
           <div className="flex flex-col items-center gap-2 text-zinc-500">
             <Info className="h-8 w-8" />
             <p className="text-sm">
               No se encontró información para este usuario en TikTok.
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
             Ver en TikTok
           </Button>
         </CardFooter>
       </Card>
     );
   }

  // Original component rendering when data is present
  const formattedDate = data.createTimeISO
    ? formatDistanceToNow(new Date(data.createTimeISO), {
        addSuffix: true,
        locale: es,
      })
    : "Fecha desconocida";

  return (
    <Card className="overflow-hidden border-zinc-800 bg-zinc-900 shadow-lg transition-all hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-pink-500 p-0.5">
            <AvatarImage src={data.authorMeta?.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white">
              {data.authorMeta?.nickName?.[0] || "T"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-white">
              {data.authorMeta?.nickName || "TikTok User"} {/* Added fallback */}
            </p>
            <p className="text-xs text-zinc-400">@{data.authorMeta?.name || "username"}</p> {/* Added fallback */}
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <Image src="/tiktok.svg" alt="TikTok logo" width={24} height={24} />
          TikTok
        </Badge>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative aspect-video w-full md:w-[240px] md:min-w-[240px] overflow-hidden rounded-lg bg-zinc-800 flex-shrink-0">
            {data.videoMeta?.coverUrl ? (
              <div className="group relative h-full w-full">
                <Image
                  src={data.videoMeta.coverUrl || "/placeholder.svg"}
                  alt={data.text || "TikTok video"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Play className="h-12 w-12 text-white" />
                </div>
                {data.videoMeta?.duration && (
                  <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
                    {/* Format duration if needed */}
                    {data.videoMeta.duration}s
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                {/* Simplified TikTok SVG or use an icon */}
                <Image src="/tiktok.svg" alt="TikTok placeholder" width={64} height={64} className="text-zinc-600 opacity-50" />
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col mt-3 md:mt-0">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold leading-tight text-white mb-1">
                {data.text
                  ? data.text.substring(0, 60) +
                    (data.text.length > 60 ? "..." : "")
                  : "Video de TikTok"} {/* Fallback title */}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-2">
                <span>{data.authorMeta?.nickName || "Usuario"}</span> {/* Fallback */}
                <span>•</span>
                <span>
                  {data.playCount?.toLocaleString() || 0} visualizaciones
                </span>
                <span>•</span>
                <span>{formattedDate}</span>
              </div>
            </div>

            <div className="text-xs text-zinc-300 line-clamp-2 mb-2">
              {data.text || "Sin descripción."} {/* Fallback description */}
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {data.mentions &&
                data.mentions.length > 0 &&
                data.mentions.map((mention: string, i: number) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-zinc-800 text-blue-400 hover:bg-zinc-700"
                  >
                    {mention}
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
          className="w-full gap-2 border-pink-500/50 bg-transparent text-pink-500 hover:bg-pink-500/10 hover:text-pink-400"
        >
          <a href={data.webVideoUrl || '#'} target="_blank" rel="noopener noreferrer"> {/* Fallback href */}
            <ExternalLink className="h-4 w-4" />
            Ver en TikTok
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
