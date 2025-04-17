"use client";

import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  username: string;
}

export function LoadingScreen({ username }: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 animate-spin text-zinc-400 mb-4" />
      <p className="text-zinc-400">Buscando perfiles de {username}...</p>
    </div>
  );
}
