"use client";

import { allEvents } from "@/actions/allEvents";
import { useQuery } from "@tanstack/react-query";

import Image from "next/image";
import { Card, CardTitle, CardDescription } from "./ui/card";
import axios from "axios";
import { baseurl } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Loader2 } from "lucide-react";
import Link from "next/link";

async function getEvents() {
  const response = await allEvents();

  if (response.success && response.events) {
    return response.events;
  } else {
    console.error(response.message);
  }
  return [];
}

export default function Events() {
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  const { data: urls, isLoading: imagesLoading } = useQuery({
    queryKey: ["images"],
    queryFn: async () =>
      await axios
        .get(baseurl() + "/api/pixels")
        .then((res) => res.data.urls as string[]),
  });

  if (events?.length === 0) {
    return (
      <div className="flex-center h-96">
        <p>Please create a new event from the [ + ] Button above </p>
      </div>
    );
  }

  if (eventsLoading || imagesLoading || urls === undefined) {
    return (
      <div className="h-auto w-full">
        <ul className="grid h-auto w-full grid-cols-1 gap-2 p-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
          {[...Array(5)]
            .map((_, index) => {
              return (
                <Card
                  key={index}
                  className="relative aspect-[16/9] overflow-hidden rounded-lg border-4 shadow-lg dark:border-accent/50"
                >
                  <CardTitle className="text-md absolute h-fit w-full px-4 py-2 mix-blend-hard-light backdrop-blur-xl">
                    <Skeleton className="" />
                  </CardTitle>
                  <div className="flex-center h-full w-full">
                    <Loader2 className="aspect-square h-8 animate-spin" />
                  </div>
                </Card>
              );
            })
            .reverse()}
        </ul>
      </div>
    );
  }

  return (
    <div className="h-auto w-full">
      <ul className="grid h-auto w-full grid-cols-1 gap-2 p-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
        {events
          ?.map((event, index) => {
            return (
              <Link href="/event/[id]" as={`/event/${event.id}`} key={event.id}>
                <Card
                  key={event.id}
                  className="relative aspect-[16/9] overflow-hidden rounded-lg border-4 shadow-lg dark:border-accent/50"
                >
                  <CardTitle className="text-md absolute h-fit w-full truncate px-4 py-2 capitalize mix-blend-hard-light backdrop-blur-xl">
                    {event.title}
                  </CardTitle>
                  <Image
                    key={event.id}
                    alt="Event Image"
                    className="object-cover pt-4"
                    height={225}
                    width={400}
                    src={urls[index % 14]!}
                  />
                </Card>
              </Link>
            );
          })
          .reverse()}
      </ul>
    </div>
  );
}
