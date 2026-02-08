import { NextResponse } from "next/server";
import { TIMELINES } from "@/lib/timeline";

export async function GET() {
  return NextResponse.json({ timelines: TIMELINES });
}
