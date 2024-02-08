"use client";

import React from "react";
import getDbUser from "@/actions/dbUser";

import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { auth } from "@clerk/nextjs";

async function getUser() {
  const user = await getDbUser();
  if (!user) {
    return null;
  }
  const aiImageNumber = user.ai === "male" ? 1 : user.ai === "female" ? 2 : 3;
  return { ...user, aiImageNumber };
}

function Home() {
  const { userId } = auth();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user", `${userId}`],
    queryFn: getUser,
  });

  const [text, setText] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await Promise.resolve({
      success: true,
      message: "Preferences Update",
    });

    if (res.success) {
      toast({
        title: res.message,
        type: "background",
      });
    } else {
      toast({
        description: res.message,
        type: "background",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="mx-auto flex w-full flex-col items-start justify-center gap-4 rounded p-2 backdrop-blur-sm md:w-3/6 md:gap-8 md:p-4">
      <h1 className="text-balanced my-4 w-full text-center text-4xl font-semibold tracking-tighter underline decoration-4 underline-offset-2">
        Change your preferences here!
      </h1>
    </div>
  );
}

export default Home;
