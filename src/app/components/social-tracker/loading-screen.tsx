"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function LoadingScreen(/*{ username }: LoadingScreenProps*/) {
  const skeletonCount = 3;

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-pulse">
      <Card className="bg-zinc-900 border-zinc-800 text-white flex-1">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <Skeleton className="h-6 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-9 w-36 flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <div
                key={`res-skeleton-${index}`}
                className="border border-zinc-800 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-6 rounded-full" /> {/* Icono */}
                  <Skeleton className="h-5 w-24" /> {/* Nombre plataforma */}
                </div>
                <Skeleton className="h-16 w-full" /> {/* Contenido principal */}
                <Skeleton className="h-4 w-3/4" /> {/* Línea extra */}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skeleton para LinksCard (Ajusta según la estructura real de LinksCard) */}
      <Card className="bg-zinc-900 border-zinc-800 text-white lg:w-72 xl:w-80 flex-shrink-0">
        <CardHeader>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <div
              key={`link-skeleton-${index}`}
              className="flex items-center gap-3"
            >
              <Skeleton className="h-5 w-5 rounded-full" /> {/* Icono */}
              <Skeleton className="h-4 w-full" /> {/* Link */}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
