import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { data, error } = await supabase.from("images").insert([
    {
      imageUrl:
        "https://static.tryleap.ai/image-gen-aba3c7ae-a57d-43ac-b4bf-a3bb98df05db/generated_images/3.png",
    },
  ]);

  console.log({ data });

  if (error) {
    console.error(error);
    return NextResponse.error();
  }

  return NextResponse.json(data);
}
