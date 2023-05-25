import { leap } from "@/lib/leap";
import { NextResponse } from "next/server";

if (!process.env.INSERT_IMAGE_WEBHOOK_URL) {
  throw new Error("Missing env var: INSERT_IMAGE_WEBHOOK_URL");
}
//  Check that INSERT_IMAGE_WEBHOOK_URL is a valid URL
try {
  new URL(process.env.INSERT_IMAGE_WEBHOOK_URL);
} catch (error) {
  throw new Error("Invalid env var: INSERT_IMAGE_WEBHOOK_URL");
}

export async function GET(request: Request) {
  const { data, error } = await leap.generate.createInferenceJob({
    prompt: "panoramic view of a majestic mountain range, awe-inspiring",
    numberOfImages: 1,
    webhookUrl: process.env.INSERT_IMAGE_WEBHOOK_URL,
    height: 1024,
    width: 512,
    upscaleBy: "x2",
  });

  if (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }

  return NextResponse.json({
    data,
  });
}
