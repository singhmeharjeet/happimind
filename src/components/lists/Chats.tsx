"use client";
import ChatBubble from "../chats/ChatBubble";
import ChatInput from "../chats/ChatInput";
import { ScrollArea } from "../ui/scroll-area";
import { useContext, useEffect, useRef } from "react";
import { MessagesContext } from "@/context/message";

export default function Chats() {
  const { sessionId, messages: chats } = useContext(MessagesContext);

  const lastMsgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lastMsgRef.current]);

  return (
    <div className="relative flex h-[calc(100dvh-30rem)] w-full grow flex-col">
      <ScrollArea className="">
        {chats.map((chat, index) => {
          return (
            <div
              key={chat.id}
              ref={index === chats.length - 1 ? lastMsgRef : null}
            >
              <ChatBubble time={`${chat.id}`} isSender={chat.isUser}>
                {chat.msg}
              </ChatBubble>
            </div>
          );
        })}
      </ScrollArea>
      <ChatInput />
    </div>
  );
}
