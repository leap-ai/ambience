import { LeapImageSchema } from "@leap-ai/sdk/dist/types/schemas/Image";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// This route catches the webhook response from Leap's API and then inserts the image URL into the database.

export async function POST(request: Request) {
  const body = await request.json();

  if (!body) {
    return NextResponse.error();
  }

  if (body && body.succeeded === false) {
    console.error(body);
    return NextResponse.error();
  }

  //   If there are no images in the result, return an error
  if (!body.result.images || body.result.images.length === 0) {
    console.error(body);
    return NextResponse.error();
  }

  // Grab first image from body.images array
  const image = body.result.images[0] as LeapImageSchema;
  console.log({ imageUri: image.uri });

  const { data, error } = await supabase.from("images").insert([
    {
      imageUrl: image.uri,
    },
  ]);

  if (error) {
    console.error(error);
    return NextResponse.error();
  }

  return NextResponse.json({
    message: "Image inserted",
    data,
  });
}
