// show all the session of the event

"use client";
import { useParams } from "next/navigation";
import Title from "@/components/ui/Title";
import Chats from "@/components/lists/Chats";
import { MessagesProvider } from "@/context/message";

export default function Page() {
  const sessionid = useParams().sessionid as string;
  return (
    <>
      <MessagesProvider sessionId={sessionid}>
        <div className="flex h-full w-full flex-col gap-2">
          <Title size="lg" variant="underline">
            Your Chats
          </Title>
          <Chats />
        </div>
      </MessagesProvider>
    </>
  );
}
