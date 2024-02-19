"use client";
import { createContext, useState } from "react";
import { nanoid } from "nanoid";
import { Message } from "@/lib/validators/message";
import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/actions/getChats";
import { Loader2 } from "lucide-react";
const defaultValue = [
  {
    id: nanoid(),
    msg: "Hello, how can I help you?",
    isUser: false,
    sessionId: "",
  },
];
export const MessagesContext = createContext<{
  sessionId: string;
  messages: Message[];
  isMessageUpdating: boolean;
  getLastMessage: () => Message | undefined;
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  sessionId: "",
  messages: [],
  isMessageUpdating: false,
  getLastMessage: () => undefined,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

export function MessagesProvider({
  children,
  sessionId,
}: {
  sessionId: string;
  children: React.ReactNode;
}) {
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);

  const [messages, setMessages] = useState(defaultValue);

  console.log("Messages: ", messages);
  console.log("Size: ", messages.length);

  const getLastMessage = () => {
    return messages[messages.length - 1];
  };
  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string,
  ) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, msg: updateFn(message.msg) };
        }
        return message;
      }),
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        sessionId,
        messages,
        isMessageUpdating,
        getLastMessage,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
