import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// This route initiates a new image generation job using Leap
// but does not wait for the job to complete.

export async function POST(request: Request) {
  // TODO generate image with leap

  // if (error) {
  //   console.error(error);
  //   return NextResponse.error();
  // }

  return NextResponse.json({
    message: "Image generated",
  });
}
