"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";

export async function allEvents() {
  const { userId } = auth();
  if (!userId) {
    return { success: false, message: "You must be signed in." };
  }

  try {
    const events = await db.event.findMany();

    return { success: true, events };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong! Please try again in some time.",
    };
  }
}
