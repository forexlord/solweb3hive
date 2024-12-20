import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { hasher } from "../../../utils/password";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

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

    const { password: _, ..._user } = user;
    console.log(_);

    return NextResponse.json({
      message: "Registration successful",
      user: _user,
    });
  } catch (error) {
    console.error("Error with OpenAI request:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
