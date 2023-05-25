// pages/api/get-latest-image.ts
import { NextApiRequest, NextApiResponse } from "next";

async function getLatestImage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json({
      message: "Hello from the serverless function!",
    });
  } else {
    res.status(405).json({
      error: "Method Not Allowed",
      message: "Only the GET method is allowed for this endpoint.",
    });
  }
}

export default getLatestImage;
