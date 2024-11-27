import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

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
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    console.log("URL>>>", url);

    const chatId = url.searchParams.get("chatId") as string;
    const userId = url.searchParams.get("userId") as string;
    console.log("ChatId>>", chatId, userId);

    const chat = await prisma.chat.findFirst({
      where: { id: chatId },
    });

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 500 });
    }

    if (chat && chat.userId !== userId) {
      return NextResponse.json(
        { error: "Not authorized to delete this chat" },
        { status: 401 }
      );
    }

    await prisma.chat.delete({
      where: { id: chatId },
    });

    return NextResponse.json({ message: "chat deleted successfully" });
  } catch (error) {
    console.error("Error with fetching chats:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
