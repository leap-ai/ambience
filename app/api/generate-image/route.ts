// Generates a new image, using a cron job (can be set in github actions)
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json({
    message: "Hello from the serverless function!",
  });
}
