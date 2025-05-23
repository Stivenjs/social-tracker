"use client";

import { renderPlatformIcon } from "@/app/components/social-tracker/platform-icons";
import Image from "next/image";

export function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-zinc-800/50 rounded-full p-6 mb-6">
        <Image src="/lupa-lomu@4x.png" alt="luma-logo" width={100} height={100}/>
      </div>
      <h2 className="text-2xl font-bold mb-3">
        Bienvenido a LoMu: Social Tracker
      </h2>
      <p className="text-zinc-400 max-w-md mb-8">
        Busca un nombre de usuario para encontrar sus perfiles y contenido en
        diferentes plataformas sociales como TikTok, Instagram, YouTube.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl">
        {["tiktok", "instagram", "youtube"].map((platform) => (
          <div
            key={platform}
            className="flex flex-col items-center p-4 bg-zinc-900 rounded-lg border border-zinc-800"
          >
            {renderPlatformIcon(platform)}
            <span className="mt-3 capitalize">{platform}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
