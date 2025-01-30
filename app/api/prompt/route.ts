import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

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

    const response = await fetch(
      "https://sol3hive-ai.onrender.com/web3-idea/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_message: prompt,
        }),
      }
    );

    const aiResponse = await response.json();

    if (chatId) {
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
          content:
            aiResponse.response || aiResponse.message || "No response received",
          chatId,
        },
      });
    }

    return NextResponse.json({
      result:
        aiResponse.response || aiResponse.message || "No response received",
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
