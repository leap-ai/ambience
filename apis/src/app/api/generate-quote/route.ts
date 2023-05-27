import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var: OPENAI_API_KEY");
}

const chat = new ChatOpenAI({ temperature: 0.6, modelName: "gpt-4" });

// Cannot use edge since it doesn't support XMLHttpRequest
export const runtime = "nodejs";
export const revalidate = 0;

const systemInstructions = [
  "You are a helpful assistant that generates a fictitious inspirational quote each time you are called.",
  "You only answer with the text, but not with the author.",
  "You do not wrap the quote in quotations.",
  "You try to keep the quotes short and concise, up to 1 sentences max, up to 15 words max.",
  "You prioritize the use of clear and concise language.",
  "You try to be as diverse as possible in your quotes so they don't sound similar to previous ones.",
];

export async function GET(request: Request) {
  // Retrieve the 3 most recent quotes from the database
  const { data: recentQuotes, error: quoteError } = await supabase
    .from("quotes")
    .select("*")
    .order("id", { ascending: false })
    .limit(10);

  if (quoteError) {
    console.log(quoteError);
    return NextResponse.json(
      {
        error: quoteError,
      },
      {
        status: 500,
      }
    );
  }

  // Combine the last 3 quotes into one string
  const recentQuotesText = recentQuotes
    .map((quoteObj) => quoteObj.quote)
    .join(" ");

  // Generate a random quote using OpenAI
  const response = await chat.call(
    systemInstructions
      .map((instruction) => new SystemChatMessage(instruction))
      .concat([
        new HumanChatMessage(
          `Here are the last 10 quotes: ${recentQuotesText}. Generate a new quote that is diverse and unique.`
        ),
      ])
  );

  console.log(response.text);

  // Then insert into the database
  const { error } = await supabase.from("quotes").insert([
    {
      quote: response.text,
    },
  ]);

  if (error) {
    console.log(error);
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
    quote: response.text,
  });
}
