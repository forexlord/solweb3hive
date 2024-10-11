import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const { userId, data } = await req.json();
    let user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (user) {
      user = await prisma.user.update({
        where: { id: userId },
        data,
      });
    }

    return NextResponse.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error with fetching chats:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
