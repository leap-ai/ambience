import { prompts } from "@/lib/imagePrompts";
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

// Cannot use edge since it doesn't support XMLHttpRequest
export const runtime = "nodejs";
export const revalidate = 0;

function getRandomPrompt() {
  return prompts[Math.floor(Math.random() * prompts.length)];
}

export async function GET(request: Request) {
  const { data, error } = await leap.generate.createInferenceJob({
    prompt: getRandomPrompt(),
    negativePrompt:
      "blurry, lowres, ugly, boring, poor lighting, dull, unclear, duplicate, error, low quality, out of frame, watermark, signature",
    numberOfImages: 1,
    webhookUrl: process.env.INSERT_IMAGE_WEBHOOK_URL,
    height: 512,
    width: 1024,
    upscaleBy: "x2",
  });

  if (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    data,
  });
}
