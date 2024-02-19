import { create } from "domain";
import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  msg: z.string(),
  isUser: z.boolean(),
  createdAt: z.date().optional(),
  sessionId: z.string(),
});

// array validator
export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
