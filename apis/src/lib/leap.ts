import { Leap } from "@leap-ai/sdk";

if (!process.env.LEAP_API_KEY) {
  throw new Error("Missing env var: LEAP_API_KEY");
}

const leap = new Leap(process.env.LEAP_API_KEY);
leap.usePublicModel("sd-1.5");

export { leap };
