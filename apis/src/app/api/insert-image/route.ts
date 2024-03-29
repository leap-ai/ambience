import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// This route catches the webhook response from Leap's API and then inserts the image URL into the database.

export async function POST(request: Request) {
  const body = await request.json();
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("jobId");
  const device = searchParams.get("device");

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
  const image = body.result.images[0];

  const newRow = {
    imageUrl: image.uri,
    prompt: body.result.prompt,
    seed: body.result.seed,
    modelId: body.result.modelId,
    steps: body.result.steps,
    jobId: jobId,
    device: device,
  };

  const { data, error } = await supabase.from("images").insert([newRow]);

  if (error) {
    console.error(error);
    return NextResponse.error();
  }

  console.log(newRow);

  return NextResponse.json({
    message: "Image inserted",
    data,
  });
}
