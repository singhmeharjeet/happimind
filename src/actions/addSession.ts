"use server";

import { env } from "@/env";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY, // This is the default and can be omitted
});

export async function addSession({ eventId }: { eventId: string }) {
  const { userId } = auth();
  if (!userId) {
    return { success: false, message: "You must be signed in." };
  }

  try {
    const thread = await openai.beta.threads.create();
    const response = await db.session.create({
      data: {
        event: {
          connect: {
            id: eventId,
          },
        },
        threadId: thread.id,
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
