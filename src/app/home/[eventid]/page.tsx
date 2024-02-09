// show all the session of the event

"use client";
import AddSession from "@/components/forms/AddSession";
import Sessions from "@/components/lists/Sessions";
import { useParams } from "next/navigation";

export default function Page() {
  const eventId = useParams().eventid as string;
  return (
    <>
      <div className="flex-center relative h-fit w-full gap-2">
        <span className="text-balanced text-center text-4xl font-semibold tracking-tighter underline decoration-4 underline-offset-2">
          See your Sessions!
        </span>
        <AddSession eventid={eventId} />
      </div>

      <Sessions eventId={eventId} />
    </>
  );
}
