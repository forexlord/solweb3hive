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

    return NextResponse.json({
      result:
        "Hello, and welcome to the future of decentralized finance and development! In this session, we're diving into how AI can enhance your Web3 experience, particularly on the Solana network. AI is transforming the way we interact with blockchain technologies, from automating complex smart contracts to offering personalized insights and improving user experience with decentralized applications (dApps). Whether you're looking to streamline your payment systems, analyze trends, or simply tip with ease, AI offers powerful tools to help you navigate the Solana ecosystem more efficiently. Stay tuned as we explore how AI and Web3 are combining to unlock new possibilities, including seamless crypto payments, enhanced user engagement, and more!",
      chatId,
    });
  } catch (error) {
    console.error("Error with OpenAI request:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
