"use client";

import { MessagesContext } from "@/context/message";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/validators/message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { FC, HTMLAttributes, useContext, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useToast } from "../ui/use-toast";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const queryClient = useQueryClient();
  const { sessionId } = useContext(MessagesContext);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { toast } = useToast();
  const [input, setInput] = useState<string>("");
  const {
    messages,
    getLastMessage,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ["sendMessage"],
    // include message to later use it in onMutate
    mutationFn: async (_message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      console.log("Message Sent", response.body);
      return response.body;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream");

      // construct new message to add
      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUser: false,
        msg: "",
        sessionId,
      };

      // add new message to state
      addMessage(responseMessage);

      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
      }
      // clean up
      setIsMessageUpdating(false);
      setInput("");

      setTimeout(() => console.log("Message", getLastMessage), 3000);
      setTimeout(() => textareaRef.current?.focus(), 10);
    },
    onError: (_, message) => {
      toast({
        description: "Something went wrong",
        type: "background",
        variant: "destructive",
      });
      removeMessage(message.id);
      textareaRef.current?.focus();
    },
  });

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              const message: Message = {
                id: nanoid(),
                isUser: true,
                msg: input,
                sessionId,
              };

              sendMessage(message);
            }
          }}
          rows={4}
          maxRows={8}
          value={input}
          autoFocus
          disabled={isPending}
          onChange={(e) => {
            e.preventDefault();
            setInput(e.target.value);
          }}
          placeholder="Write a message..."
          className="peer block w-full resize-none border-none bg-zinc-100 p-4 pr-14 text-sm text-gray-900 outline-none focus:ring-0 disabled:opacity-50 sm:leading-6"
        />

        <div className="absolute inset-y-0 right-0 flex">
          <kbd className="inline-flex items-center rounded border border-gray-200 bg-white p-4 font-sans text-xs text-gray-400">
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <CornerDownLeft className="size-4" />
            )}
          </kbd>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
