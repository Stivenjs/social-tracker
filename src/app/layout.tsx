import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LoMu: Social Tracker",
  description:
    "Busca un nombre de usuario para encontrar sus perfiles y contenido en diferentes plataformas sociales como TikTok, Instagram, YouTube",

  icons: {
    icon: "lupa-lomu@4x.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          toastOptions={{
            classNames: {
              description: "!important",
            },
          }}
        />
        <div
          className="fixed bottom-5 right-10 p-4 text-3xl text-white border-3 hidden md:block opacity-45
        "
        >
          <p>Daniel Lopez</p>
          <p>Jhon Muñoz</p>
          <p>Sebastián Reyes</p>
        </div>
      </body>
    </html>
  );
}
