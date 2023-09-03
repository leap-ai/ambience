import { Leap } from "@leap-ai/sdk";

if (!process.env.LEAP_API_KEY) {
  throw new Error("Missing env var: LEAP_API_KEY");
}

const leap = new Leap({
  accessToken: process.env.LEAP_API_KEY,
});

export { leap };
