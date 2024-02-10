"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";

/**
 *
 * @param param0
 * @returns type { success: boolean, message: string, events: any }
 */
export async function getSessions({ eventId }: { eventId: string }) {
  const { userId } = auth();
  if (!userId) {
    return { success: false, message: "You must be signed in." };
  }

  try {
    const sessions = await db.session.findMany({
      where: { eventId: eventId },
      select: {
        id: true,
        createdAt: true,
        _count: { select: { qa: true } },
      },
    });


    if (!sessions) {
      throw new Error("DB Error: Couldn't connect");
    }

    return { success: true, sessions };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong! Please try again in some time.",
      error,
    };
  }
}
