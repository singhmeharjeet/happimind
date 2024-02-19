"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";

export async function addChat({
  sessionId,
  msg,
  isUser,
}: {
  sessionId: any;
  msg: string;
  isUser: boolean;
}) {
  const { userId } = auth();
  if (!userId) {
    return { success: false, message: "You must be signed in." };
  }

  if (!sessionId) {
    return { success: false, message: "Session ID is required" };
  }

  try {
    const response = await db.chat.create({
      data: {
        session: {
          connect: {
            id: sessionId,
          },
        },
        msg,
        isUser,
      },
    });

    return { success: true, message: "Message Sent", event: response };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong! Please try again in some time.",
    };
  }
}
