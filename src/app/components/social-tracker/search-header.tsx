"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Menu, Search } from "lucide-react";

interface SearchHeaderProps {
  username: string;
  setUsername: (username: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  onOpenSidebar: () => void;
}

export function SearchHeader({
  username,
  setUsername,
  handleSubmit,
  loading,
  onOpenSidebar,
}: SearchHeaderProps) {
  return (
    <header className="h-16 border-b border-zinc-800 flex items-center px-4 sticky top-0 bg-zinc-900 z-10">
      <div className="flex items-center w-full max-w-3xl mx-auto">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={onOpenSidebar}
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <form onSubmit={handleSubmit} className="relative flex-1 max-w-md flex">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
          <Input
            placeholder="Buscar usuario"
            className="pl-10 bg-zinc-800 border-zinc-700 focus-visible:ring-zinc-700 flex-1"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          <Button
            type="submit"
            className="ml-2 text-black"
            disabled={loading || !username.trim()}
            variant="secondary"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buscar"}
          </Button>
        </form>
      </div>
    </header>
  );
}
