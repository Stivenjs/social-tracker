"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import type { Subscription } from "@/app/components/social-tracker/types";
import { renderPlatformIcon } from "@/app/components/social-tracker/platform-icons";
import { Separator } from "@/components/ui/separator";

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriptions: Subscription[];
  searchSubscription: (name: string) => void;
}

export function MobileSidebar({
  open,
  onOpenChange,
  subscriptions,
  searchSubscription,
}: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[85%] max-w-[300px] p-0 bg-zinc-900 border-zinc-800"
      >
        <SheetHeader className="p-4 text-left border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-white">
              Social Tracker
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="p-4">
          <div className="space-y-1 mb-8 text-white">
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <Users className="mr-2 h-5 w-5" />
              Suscripciones
            </Button>
          </div>

          <div className="mb-4">
            <h2 className="text-sm font-semibold text-zinc-400 mb-3 px-3">
              SUSCRIPCIONES
            </h2>
            <ScrollArea className="h-[calc(100vh-250px)]">
              {/* Display Subscriptions */}
              <div className="space-y-1 px-2 text-white">
                {subscriptions.length > 0 ? (
                  subscriptions.map((sub) => (
                    <SheetClose asChild key={sub.id}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto py-2 px-2"
                        size="sm"
                        onClick={() => searchSubscription(sub.name)}
                        title={`Search for ${sub.name}`}
                      >
                        <Avatar className="h-6 w-6 mr-2 flex-shrink-0">
                          <AvatarImage
                            src={sub.avatar || "/placeholder.svg"}
                            alt={sub.name}
                          />
                          <AvatarFallback className="text-black">
                            {sub.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="flex-1 text-left truncate mr-2">
                          {sub.name}
                        </span>
                        {/* Render a smaller platform icon */}
                        <div className="flex-shrink-0 scale-75 origin-right">
                          {renderPlatformIcon(sub.platform)}
                        </div>
                      </Button>
                    </SheetClose>
                  ))
                ) : (
                  <p className="text-xs text-zinc-500 px-3 py-2">
                    Sin suscripciones
                  </p>
                )}
              </div>

              <div className="mt-6 px-2 text-white">
                <Separator className="my-4" />

                <div className="space-y-3">
                  <p className="text-sm font-medium text-zinc-400 px-3 py-1">
                    Viral
                  </p>
                  <p className="text-sm font-medium text-zinc-400 px-3 py-1">
                    Música
                  </p>
                  <p className="text-sm font-medium text-zinc-400 px-3 py-1">
                    Directo
                  </p>
                  <p className="text-sm font-medium text-zinc-400 px-3 py-1">
                    Video Juegos
                  </p>
                  <p className="text-sm font-medium text-zinc-400 px-3 py-1">
                    Actualidad
                  </p>
                  <p className="text-sm font-medium text-zinc-400 px-3 py-1">
                    Deporte
                  </p>
                  <p className="text-sm font-medium text-zinc-400 px-3 py-1">
                    Educación
                  </p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
