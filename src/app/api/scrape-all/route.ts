import { NextRequest, NextResponse } from "next/server";
import { runAllScrapers } from "@/app/lib/scrapers";

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: "Se requiere un nombre de usuario" },
        { status: 400 }
      );
    }

    const data = await runAllScrapers(username);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al scrapear" },
      { status: 500 }
    );
  }
}
      