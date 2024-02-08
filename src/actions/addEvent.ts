"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";

export async function addEvent({ title }: { title: string }) {
  const { userId } = auth();
  if (!userId) {
    return { success: false, message: "You must be signed in." };
  }

  console.log("Title: ", title);

  try {
    const response = await db.event.create({
      data: {
        user: {
          connect: {
            clerk_id: userId,
          },
        },
        title,
      },
    });

    return { success: true, message: "Event Created", event: response };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong! Please try again in some time.",
    };
  }
}
