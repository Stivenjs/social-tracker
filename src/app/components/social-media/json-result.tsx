"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface JsonResultProps {
  data: any;
}

export const JsonResult = ({ data }: JsonResultProps) => {
  return (
    <Card className="border-zinc-800 bg-zinc-900 shadow-lg">
      <CardHeader className="p-4 pb-0">
        <h3 className="text-lg font-bold text-white">JSON Data</h3>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-60 w-full rounded-lg border border-zinc-800 bg-zinc-800/50 p-4">
          <pre className="font-mono text-xs text-zinc-200 whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
