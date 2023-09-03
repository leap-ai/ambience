import { leap } from "@/lib/leap";
import { supabase } from "@/lib/supabase";
import { randomUUID } from "crypto";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
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
const chat = new ChatOpenAI({ temperature: 0.7, modelName: "gpt-4" });

export async function GET(request: Request) {
  const jobId = randomUUID();
  const negativePrompt =
    "blurry, lowres, ugly, boring, poor lighting, dull, unclear, duplicate, error, low quality, out of frame, watermark, signature, double faces, two people, multiple people";

  // Retrieve the 3 most recent quotes from the database
  const { data: recentImages, error: quoteError } = await supabase
    .from("images")
    .select("prompt,id")
    .order("id", { ascending: false })
    .limit(20);

  if (quoteError) {
    return NextResponse.json(
      {
        error: quoteError,
      },
      {
        status: 500,
      }
    );
  }

  // Combine the last 3 quotes into one string
  const recentPromptString = recentImages
    .map((quoteObj) => quoteObj.prompt)
    .join(" --- ");

  const response = await chat.call([
    new SystemMessage(`
      You are a helpful assistant that generates text prompts for beautiful wallpapers each time you are called.
      You always generate a unique prompt that is diverse and unique.
      You do not repeat any of the previous prompts.
      New prompts must be aesthetically pleasing and beautiful.
      New prompts must be very diverse with a very slight bias for nature, geometry, and abstract concepts.
      You do not include any people in the prompt.
      You do not include any commentary or additional text in the prompt.
      You only respond with a new prompt.
      Each prompt should include mood, subject, Timing, Lens, Lighting conditions, Style, Colors, Background, Perspective, Focal point, Space, Pattern/Texture, Element defining the scale, Depth of field, Feeling, Contrast elements into a seamless, picturesque description for a wallpaper image. The description should feel unified and natural, not like a list of factors. Emphasize aesthetic beauty and diversity, considering a slight bias for nature, geometry, and abstract concepts. 
      The prompt itself should be phrased naturally.
      Exclude all people and commentary from the prompt and ensure the description is unique each time.
    `),
    new HumanMessage(
      `Here are the last 20 image prompts, separated by a triple dash (---): ${recentPromptString}.  
            
      Give a new prompt for a beautiful wallpaper.`
    ),
  ]);

  const { data, status, statusText } = await leap.images.generate({
    prompt: response.content,
    negativePrompt,
    modelId: "26a1a203-3a46-42cb-8cfa-f4de075907d8",
    numberOfImages: 1,
    webhookUrl: `${process.env.INSERT_IMAGE_WEBHOOK_URL}?device=desktop&jobId=${jobId}`,
    width: 1920,
    height: 1080,
    steps: 50,
  });

  if (status !== 201 || !data) {
    console.error(status, statusText);
    return NextResponse.json(
      {
        status,
        statusText,
        message: "Error generating desktop image",
      },
      {
        status: 500,
      }
    );
  }

  const {
    data: mobileData,
    status: mobileStatus,
    statusText: mobileStatusText,
  } = await leap.images.generate({
    modelId: "26a1a203-3a46-42cb-8cfa-f4de075907d8",
    prompt: response.content,
    negativePrompt,
    numberOfImages: 1,
    webhookUrl: `${process.env.INSERT_IMAGE_WEBHOOK_URL}?device=mobile&jobId=${jobId}`,
    width: 1080,
    height: 1920,
    steps: 50,
    seed: data.seed,
  });

  if (mobileStatus !== 201 || !data) {
    console.error(mobileStatus, mobileStatusText);
    return NextResponse.json(
      {
        status,
        mobileStatusText,
        message: "Error generating desktop image",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    data,
    mobileData,
  });
}
