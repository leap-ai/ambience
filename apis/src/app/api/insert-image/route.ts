import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// This route catches the webhook response from Leap's API and then inserts the image URL into the database.

export async function POST(request: Request) {
  // Right now just pushing a static image URL into the database.
  // TODO catch webhook, retrieve real url, push image.
  const { data, error } = await supabase.from("images").insert([
    {
      imageUrl:
        "https://static.tryleap.ai/image-gen-a7202a89-dd86-4f23-ba1b-91d54e5ed5bf/generated_images/4.png",
    },
  ]);

  if (error) {
    console.error(error);
    return NextResponse.error();
  }

  return NextResponse.json({
    message: "Image inserted",
  });
}
