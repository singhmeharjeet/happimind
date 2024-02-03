"use server";

import { db } from "@/server/db";

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
