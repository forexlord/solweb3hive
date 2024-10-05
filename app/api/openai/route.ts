import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// API route handler
export async function POST(req: NextRequest) {
  try {
    const { prompt, chatId } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Make request to OpenAI API
    // const completion = await openai.completions.create({
    //   model: "gpt-4o-mini",
    //   prompt,
    //   max_tokens: 100,
    // });

    await prisma.message.create({
      data: {
        type: "prompt",
        content: prompt,
        chatId,
      },
    });

    await prisma.message.create({
      data: {
        type: "response",
        content: "This is response>>",
        chatId,
      },
    });

    return NextResponse.json({ result: "This is response>>", chatId });
  } catch (error) {
    console.error("Error with OpenAI request:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
