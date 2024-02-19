"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";

/**
 *
 * @param param0
 * @returns type { success: boolean, message: string, events: any }
 */
export async function getChats({ sessionId }: { sessionId: string }) {
  const { userId } = auth();
  if (!userId) {
    return { success: false, message: "You must be signed in." };
  }

  try {
    const chats = await db.chat.findMany({
      where: { sessionId: sessionId },
    });

    if (!chats) {
      throw new Error("DB Error: Couldn't connect");
	}
	  
    return { success: true, chats };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong! Please try again in some time.",
      error,
    };
  }
}
