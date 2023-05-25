import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    imageUrl:
      "https://static.tryleap.ai/image-gen-aba3c7ae-a57d-43ac-b4bf-a3bb98df05db/generated_images/3.png",
  });
}
