import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const chats = await prisma.chat.findMany({
      where: { userId },
      include: {
        messages: true,
      },
    });

    return NextResponse.json({ chats });
  } catch (error) {
    console.error("Error with fetching chats:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
