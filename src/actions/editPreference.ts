"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";

export type AI = "male" | "female" | "cat";
export type Tone = "empathetic" | "solution-oriented";

export async function editPreference({
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
    return { success: false, message: "You must be signed in." };
  }

  try {
    await db.user.update({
      where: { email },
      data: {
        ai,
        tone,
      },
    });

    return { success: true, message: "Preferences Update" };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong! Please try again in some time.",
    };
  }
}
