// show all the session of the event

"use client";
import AddSession from "@/components/forms/AddSession";
import Sessions from "@/components/lists/Sessions";
import Title from "@/components/ui/Title";
import { useParams } from "next/navigation";

export default function Page() {
  const eventId = useParams().eventid as string;
  return (
    <>
      <div className="flex-center relative h-fit w-full gap-2">
        <Title size="lg" variant="underline">
          See your Sessions
        </Title>
        <AddSession eventid={eventId} />
      </div>

      <Sessions eventId={eventId} />
    </>
  );
}
