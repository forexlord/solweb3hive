import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { verifier } from "../../../utils/password";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const userExists = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        createdAt: true,
        password: true,
        credit: true,
        noOfPrompts: true,
        walletPublickey: true,
      },
    });

    if (!userExists) {
      return NextResponse.json(
        {
          error: "Invalid credentials, please try again",
        },
        {
          status: 400,
        }
      );
    }

    const passwordMatch = await verifier(password, userExists.password);

    if (!passwordMatch) {
      return NextResponse.json(
        {
          error: "Invalid credentials, please try again",
        },
        {
          status: 400,
        }
      );
    }

    delete userExists.password;

    return NextResponse.json({ message: "Login successful", user: userExists });
  } catch (error) {
    console.error("Error with OpenAI request:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
