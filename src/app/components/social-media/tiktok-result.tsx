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
import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";

interface TiktokResultProps {
  data: {
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
  };
}

export const TiktokResult = ({ data }: TiktokResultProps) => {
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
              {data.authorMeta?.nickName}
            </p>
            <p className="text-xs text-zinc-400">@{data.authorMeta?.name}</p>
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
                    {data.videoMeta.duration}s
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <svg
                  className="h-16 w-16 text-zinc-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.589 6.686C19.3 6.48811 19.0407 6.2408 18.823 5.95309C18.4031 5.41373 18.1575 4.76962 18.1218 4.10303C18.1218 4.02003 18.1138 3.94103 18.1078 3.86103H15.0938V15.9C15.0938 16.2051 15.0938 16.5092 15.0778 16.8103C15.0778 16.8883 15.0658 16.9633 15.0578 17.0413C15.0578 17.0683 15.0578 17.0943 15.0498 17.1213C15.0213 17.3462 14.9329 17.5611 14.7937 17.7453C14.6544 17.9296 14.4689 18.0766 14.2547 18.1713C14.0681 18.2581 13.8656 18.3043 13.6597 18.3073C13.2967 18.3073 12.9477 18.1713 12.6737 17.9283C12.3987 17.6863 12.2227 17.3453 12.1897 16.9823C12.1762 16.8772 12.1697 16.7715 12.1697 16.6653C12.1697 16.0593 12.4127 15.4963 12.8127 15.0963C13.0667 14.8423 13.3927 14.6663 13.7517 14.5903C13.9487 14.5433 14.1517 14.5313 14.3557 14.5493V11.5323C14.1828 11.5109 14.0088 11.5 13.8347 11.5C13.2987 11.5 12.7747 11.6 12.2947 11.792C11.8138 11.9841 11.3745 12.2698 11.0017 12.633C10.7027 12.9303 10.4447 13.2693 10.2387 13.6413C10.2147 13.6793 10.1917 13.7183 10.1687 13.7583C9.98471 14.0703 9.84471 14.4013 9.74871 14.7493C9.69671 14.9373 9.65671 15.1303 9.63071 15.3243C9.61394 15.4462 9.60547 15.5692 9.60547 15.6923C9.60547 15.7583 9.60547 15.8243 9.61147 15.8893C9.61147 15.9553 9.61147 16.0213 9.62347 16.0863C9.62347 16.1523 9.62947 16.2183 9.63547 16.2833C9.64147 16.3483 9.65347 16.4143 9.66547 16.4793C9.67147 16.5143 9.67747 16.5493 9.68347 16.5833C9.77947 17.1833 9.99147 17.7593 10.3087 18.2693C10.4367 18.4683 10.5827 18.6583 10.7447 18.8353C11.0767 19.2003 11.4827 19.4933 11.9347 19.6933C12.3867 19.8933 12.8807 20.0003 13.3807 20.0003C13.5471 20.0003 13.7137 19.9863 13.8797 19.9583C14.4767 19.8583 15.0417 19.6173 15.5257 19.2593C16.0097 18.9013 16.3967 18.4353 16.6567 17.9043C16.9167 17.3733 17.0467 16.7933 17.0467 16.2003V10.1213C17.4557 10.4133 17.8977 10.6543 18.3617 10.8363C18.8257 11.0183 19.3117 11.1413 19.8037 11.2033V8.2033C19.3697 8.1413 18.9487 8.0143 18.5547 7.8293C18.8827 7.5003 19.1827 7.1333 19.4497 6.7353L19.589 6.686Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col mt-3 md:mt-0">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold leading-tight text-white mb-1">
                {data.text
                  ? data.text.substring(0, 60) +
                    (data.text.length > 60 ? "..." : "")
                  : "TikTok Video"}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-2">
                <span>{data.authorMeta?.nickName}</span>
                <span>•</span>
                <span>
                  {data.playCount?.toLocaleString() || 0} visualizaciones
                </span>
                <span>•</span>
                <span>{formattedDate}</span>
              </div>
            </div>

            <div className="text-xs text-zinc-300 line-clamp-2 mb-2">
              {data.text}
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
          <a href={data.webVideoUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Ver en TikTok
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
