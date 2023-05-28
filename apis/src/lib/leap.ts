import { Leap } from "@leap-ai/sdk";

if (!process.env.LEAP_API_KEY) {
  throw new Error("Missing env var: LEAP_API_KEY");
}

const leap = new Leap(process.env.LEAP_API_KEY);
leap.useModel("eab32df0-de26-4b83-a908-a83f3015e971");

export { leap };
