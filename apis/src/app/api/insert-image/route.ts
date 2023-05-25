import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabase";
// import { leap } from "@/lib/leap";

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

  // Grab first image from body.images array
  const image = body.images[0];
  console.log({ image });

  return NextResponse.json(body);

  //   const { data, error } = await leap.generate.getInferenceJob({
  //     inferenceId: request.body.inferenceId,
  //   });

  //   const { data, error } = await supabase.from("images").insert([
  //     {
  //       imageUrl:
  //         "https://static.tryleap.ai/image-gen-a7202a89-dd86-4f23-ba1b-91d54e5ed5bf/generated_images/4.png",
  //     },
  //   ]);

  //   if (error) {
  //     console.error(error);
  //     return NextResponse.error();
  //   }

  //   return NextResponse.json({
  //     message: "Image inserted",
  //   });
}
