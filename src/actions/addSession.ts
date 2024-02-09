"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";

export async function addSession({ eventId }: { eventId: string }) {
  const { userId } = auth();
  if (!userId) {
    return { success: false, message: "You must be signed in." };
  }

  try {
    const response = await db.session.create({
      data: {
        event: {
          connect: {
            id: eventId,
          },
        },
      },
    });

    return { success: true, message: "Event Created", session: response };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong! Please try again in some time.",
    };
  }
}
