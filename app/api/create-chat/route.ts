import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const chat = await prisma.chat.create({
      data: { userId },
    });

    return NextResponse.json({ chat });
  } catch (error) {
    console.error("Error with creating chats:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
