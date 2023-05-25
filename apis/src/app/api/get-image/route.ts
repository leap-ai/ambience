import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  let { data: images, error } = await supabase
    .from("images")
    .select("id,imageUrl")
    .limit(1)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.error();
  }

  if (!images || images.length === 0) {
    return NextResponse.error();
  }

  return NextResponse.json(images[0], {
    headers: {
      "content-type": "application/json",
      "cache-control": "max-age=0, s-maxage=60",
    },
  });
}
