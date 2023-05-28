import { Leap } from "@leap-ai/sdk";

if (!process.env.LEAP_API_KEY) {
  throw new Error("Missing env var: LEAP_API_KEY");
}

const leap = new Leap(process.env.LEAP_API_KEY);

const models = {
  "Realistic Vision v2.0": "eab32df0-de26-4b83-a908-a83f3015e971",
  "OpenJourney v4": "1e7737d7-545e-469f-857f-e4b46eaa151d",
  "Stable Diffusion 1.5": "8b1b897c-d66d-45a6-b8d7-8e32421d02cf",
  "Stable Diffusion 2.1": "ee88d150-4259-4b77-9d0f-090abe29f650",
};

leap.useModel(models["Realistic Vision v2.0"]);

export { leap };
