import { NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const gateway = createOpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY!,
  baseURL: "https://gateway.ai.vercel.com/v1",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== "string") {
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
      model: gateway("gpt-4.1-mini"),
      prompt,
    });

    return NextResponse.json({
      modelA: modelA.text,
      modelB: modelB.text,
    });
  } catch (err) {
    console.error("COMPARE API ERROR:", err);
    return NextResponse.json(
      { error: "AI Gateway call failed" },
      { status: 500 }
    );
  }
}
