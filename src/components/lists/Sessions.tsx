"use client";

import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import Grid from "../Grid";
import { getSessions } from "@/actions/getSessions";
import { Card, CardDescription } from "../ui/card";
import { Loader2 } from "lucide-react";

export default function Sessions({ eventId }: { eventId: string }) {
  const { data: sessions, isLoading } = useQuery({
    queryKey: ["sessions", eventId],
    queryFn: async () => {
      const res = await getSessions({ eventId });
      return res.success && res.sessions ? res.sessions : [];
    },
  });

  if (sessions?.length === 0) {
    return (
      <div className="flex-center h-96 w-full">
        <p>Please create a new session from the [ + ] Button above </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-center h-full w-full">
        <Loader2 className="size-4 animate-spin" />
      </div>
    );
  }

  return (
    <Grid>
      {sessions
        ?.map((sess) => {
          return (
            <Link href={`/home/${eventId}/${sess.id}`} key={sess.id}>
              <Card className="p-4">
                <CardDescription>
                  <span className="mr-2 font-semibold text-foreground/90">
                    Session
                  </span>
                  {sess.createdAt.toLocaleString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </CardDescription>
                <CardDescription>
                  <span className="mr-2 font-semibold text-foreground/90">
                    Chats
                  </span>
                  {sess._count.chats}
                </CardDescription>
              </Card>
            </Link>
          );
        })
        .reverse()}
    </Grid>
  );
}
