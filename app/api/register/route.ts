import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { hasher } from "../../../utils/password";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, phoneNumber } =
      await req.json();

    const emailAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (emailAlreadyExists) {
      return NextResponse.json(
        {
          error: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }
    const passwordHash = await hasher(password);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: passwordHash,
        phoneNumber,
      },
    });

    delete user.password;

    return NextResponse.json({ message: "Registration successful", user });
  } catch (error) {
    console.error("Error with OpenAI request:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
