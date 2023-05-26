import { leap } from "@/lib/leap";
import { NextResponse } from "next/server";

if (!process.env.INSERT_IMAGE_WEBHOOK_URL) {
  throw new Error("Missing env var: INSERT_IMAGE_WEBHOOK_URL");
}
//  Check that INSERT_IMAGE_WEBHOOK_URL is a valid URL
try {
  new URL(process.env.INSERT_IMAGE_WEBHOOK_URL);
} catch (error) {
  throw new Error("Invalid env var: INSERT_IMAGE_WEBHOOK_URL");
}

// Cannot use edge since it doesn't support XMLHttpRequest
export const runtime = "nodejs";
export const revalidate = 0;

const prompts = [
  "cosmic galaxy scene, depicting a breathtaking view of stars and planets; soft ambient lighting, hyperrealistic style, cool color palette, shot with a wide-angle lens",
  "vibrant geometric patterns, incorporating a mix of shapes and colors; high contrast lighting, minimalistic style, warm color palette, captured with a macro lens",
  "aerial view of lush, winding river cutting through a dense forest; natural sunlight, impressionistic style, deep earthy tones, photographed with a drone camera",
  "modern abstract painting, using bold brushstrokes and vivid colors; balanced diffused lighting, abstract expressionist style, bold complementary colors, created with a fisheye lens",
  "bird's-eye view of a mesmerizing coral reef, teeming with marine life; underwater lighting, documentary-inspired style, vibrant aquatic hues, taken with a waterproof camera",
  "intricate mandala design, a harmonious blend of colors and shapes; backlit illumination, spiritual and meditative style, bright and colorful palette, depicted through a tilt-shift lens",
  "futuristic city skyline, illuminated by neon lights and holograms; glowing artificial lights, cyberpunk style, electric color scheme, captured with a long exposure technique",
  "captivating aurora borealis, a natural light show in the polar sky; soft ambient glow, panoramic landscape style, shifting color gradients, photographed with a DSLR camera and a wide field of view",
  "flower field in full bloom, creating a breathtaking color palette; golden hour lighting, botanical illustration style, vibrant and varied floral colors, shot with a telephoto lens",
  "classic arcade game characters, designed in a pixel art style; directional 8-bit lighting, nostalgic retro style, primary color palette, rendered with a digital art program",
  "zen garden with raked sand patterns and carefully placed stones; serene natural light, Asian-inspired style, monochrome color scheme, captured with a shallow depth of field",
  "topographical map, showcasing the beauty of Earth's diverse landscapes; sunlit aerial view, cartographic style, subtle and earthy tones, digital rendering with a 3D camera",
  "origami-inspired art, transforming paper into intricate 3D shapes; strong spotlighting, contemporary art style, pastel color palette, shot with a precisely focused camera",
  "narrow alleyway in an urban city, covered with colorful graffiti; moody and dim lighting, street art style, vivid and chaotic color mix, photographed with a high ISO setting",
  "surreal floating islands, defying gravity against a dreamy sky; ethereal backlighting, fantasy-inspired style, rich and vibrant color harmony, created with a digital painting software",
  "silhouette of a tree against a gradient sky at twilight; low-key sunset light, minimalist style, peaceful and warm color progression, captured with a vintage film camera",
  "macro shot of a frosty leaf, showcasing intricate ice patterns; dramatic side-lighting, nature-inspired style, cool and crisp blues, shot with a high-resolution macro lens",
  "watercolor splash, blending together various hues and tones; diffuse natural light, impressionistic style, harmonious color blend, photographed with a high-speed camera",
  "magnificent waterfall cascading into a serene, crystal-clear pool; bright top-down lighting, scenic landscape style, vibrant greens and blues, captured with a slow shutter speed",
  "time-lapse of busy city traffic, creating streaks of vibrant light patterns; dynamic motion blur, urban exploration style, glowing neon palette, photographed with a tripod and stable camera settings",
  "cherry blossoms in full bloom, creating a pink floral canopy; soft-filtered sunlight, romantic and dreamy style, pale pink and white tones, captured with soft focus and bokeh effects",
  "dynamic neon geometric shapes on a contrasting black background; electric backlighting, futuristic design style, bold neon color palette, rendered with a computer-generated software",
  "majestic ice cave, illuminated by ethereal, glowing light; dramatic natural reflections, otherworldly style, icy blues and purples, taken with a high dynamic range (HDR) camera setting",
  "terraced rice fields, showcasing the beauty of human-made landscapes; rich, warm sidelight, aerial photography style, lush green tones, shot with a high-altitude drone camera",
  "vintage world map, a detailed representation of global exploration; soft, even lighting, antique cartography style, faded sepia color palette, photographed with a high-resolution scanner",
  "modern architectural marvel, showcasing curves and lines in harmony; striking sunbeams, futuristic minimalist style, bold monochromatic theme, captured with geometric composition techniques",
  "line art portrait, minimalist design with striking features; simple contrasting shadows, modern art style, black and white palette, created with a digital drawing tablet",
  "long exposure photography of a meteor shower, streaks of light across the sky; natural celestial illumination, astrophotography style, deep sky blues and starry whites, taken with a sensitive camera sensor",
  "gorgeous view of rolling hills, blanketed by a sea of fog; misty, diffused light, atmospheric landscape style, soothing green and gray tones, photographed with a high-quality panoramic lens",
  "bright and energetic color gradient, transitioning seamlessly from hue to hue; smooth, radiant light, digital art style, intense and bold color spectrum, designed with a graphic software program",
];

function getRandomPrompt() {
  return prompts[Math.floor(Math.random() * prompts.length)];
}

export async function GET(request: Request) {
  const { data, error } = await leap.generate.createInferenceJob({
    prompt: getRandomPrompt(),
    numberOfImages: 1,
    webhookUrl: process.env.INSERT_IMAGE_WEBHOOK_URL,
    height: 512,
    width: 1024,
    upscaleBy: "x2",
  });

  if (error) {
    console.log(error);
    // print the current node runtime
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    data,
  });
}
