// pages/api/generate-image.ts
import { NextApiRequest, NextApiResponse } from "next";

async function generateImage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.status(200).json({
      message: "Hello from the serverless function!",
    });
  } else {
    res.status(405).json({
      error: "Method Not Allowed",
      message: "Only the POST method is allowed for this endpoint.",
    });
  }
}

export default generateImage;
