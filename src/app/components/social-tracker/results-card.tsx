"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, BellOff } from "lucide-react";
import { renderPlatformIcon } from "@/app/components/social-tracker/platform-icons";
import { renderPlatformResult } from "@/app/components/social-media";

interface ResultsCardProps {
  username: string;
  results: any[];
  isSubscribed: boolean;
  handleSubscribe: () => void;
  handleUnsubscribe: () => void;
  searchedUsername: string;
}

export function ResultsCard({
  username,
  results,
  isSubscribed,
  handleSubscribe,
  handleUnsubscribe,
  searchedUsername,
}: ResultsCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white flex-1">
      {/* Add Subscribe button to Card Header */}
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Resultados de búsqueda para: {searchedUsername}</CardTitle>
          <CardDescription className="text-gray-300 mt-2">
            Datos encontrados en diferentes plataformas
          </CardDescription>
        </div>
        {/* Subscribe/Unsubscribe Button */}
        <Button
          size="sm"
          className={`flex-shrink-0 ${
            isSubscribed
              ? "bg-[#d60b52] border-[#d60b52] text-white hover:bg-[#d60b52] hover:text-white cursor-pointer"
              : "bg-[#d60b52] border-[#d60b52] text-white hover:bg-[#d60b52] hover:text-white cursor-pointer"
          }`}
          onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
          disabled={!searchedUsername} // Disable if no search has been performed
        >
          {isSubscribed ? (
            <>
              <BellOff className="mr-1.5 h-4 w-4" />
              Cancelar suscripción
            </>
          ) : (
            <>
              <Bell className="mr-1.5 h-4 w-4" />
              Suscribirse
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="border border-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                {renderPlatformIcon(result.platform)}
                <h3 className="text-lg font-semibold capitalize">
                  {result.platform}
                </h3>
              </div>

              {result.error ? (
                <div className="text-red-400 text-sm">
                  Error: {result.error}
                </div>
              ) : result.items && result.items.length > 0 ? (
                renderPlatformResult(result.platform, result.items[0])
              ) : (
                <div className="text-zinc-400 text-sm">
                  No se encontraron resultados
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
