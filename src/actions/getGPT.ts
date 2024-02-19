"use server";

import { env } from "@/env";
import { auth } from "@clerk/nextjs";

import { addChat } from "./addChat";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY, // This is the default and can be omitted
});

export async function askGPT({
  sessionId,
  msg,
}: {
  sessionId: any;
  msg: string;
}) {
  const { userId } = auth();
  if (!userId) {
    return { success: false, message: "You must be signed in." };
  }

  if (!sessionId) {
    return { success: false, message: "Session ID is required" };
  }

  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: msg }],
      model: "gpt-3.5-turbo-0125",
    });

    console.log("Response:", response?.choices[0]?.message.content);

    await addChat({
      sessionId,
      msg: response?.choices[0]?.message.content || "",
      isUser: false,
    });

    return { success: true, message: "Message Sent", response: response };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "Something went wrong! Please try again in some time.",
    };
  }
}
