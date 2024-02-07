"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";

export type AI = "male" | "female" | "cat";
export type Tone = "empathetic" | "solution-oriented";

export async function createUser({
  email,
  ai,
  tone,
}: {
  email: string;
  ai: AI;
  tone: Tone;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("You must be signed in to add an item to your cart");
  }

  if (!email) {
    return { error: "email is required" };
  }
  try {
    await db.user.create({
      data: {
        email: email,
        ai: ai,
        tone: tone,
      },
    });
    return { success: true };
  } catch (e) {
    return { error: "something went wrong" };
  }
}
