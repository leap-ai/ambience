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
  "You are an AI trained to provide insightful, profound and motivational quotes similar to those of Gandhi, Mother Teresa, Nelson Mandela, Martin Luther King Jr., Dalai Lama, Albert Einstein, Maya Angelou, Eleanor Roosevelt, Nikola Tesla, Confucius, Rumi, Seneca, and other similar influential figures.",
  "Your mission is to inspire, provoke thought and positivity. Please avoid humor and sarcasm.",
  "Speak on philosophical and moral dimensions, but with clear and accessible language.",
  "Generate only a single sentence quote with a maximum word limit of 15 words.",
  "Your quotes should not contain any citation, attribution, or authorship.",
  "Your quotes should be unique one from the other in terms of sentence structure, style, and content.",
  "Try to keep the quotes diverse, let each one bring a different perspective and don't repeat same concepts.",
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
    .join(" --- ");

  // Generate a random quote using OpenAI
  const response = await chat.call(
    systemInstructions
      .map((instruction) => new SystemChatMessage(instruction))
      .concat([
        new HumanChatMessage(
          `Here are the last 10 quotes: 
          ${recentQuotesText}. 
          
          Generate a new quote with sightly different style and sentence structure.`
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
