import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
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
