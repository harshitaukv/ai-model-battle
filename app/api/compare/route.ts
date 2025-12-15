import { NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const gateway = createOpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY!,
  baseURL: "https://gateway.ai.vercel.com/v1",
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const modelA = await generateText({
      model: gateway("gpt-4o-mini"),
      prompt,
    });

    const modelB = await generateText({
      model: gateway("gpt-4o"),
      prompt,
    });

    return NextResponse.json({
      modelA: modelA.text,
      modelB: modelB.text,
    });
  } catch (error: any) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: error.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
