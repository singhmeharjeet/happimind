"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";

function Home() {
  const { isLoaded } = useAuth();
  const [name, setName] = React.useState("");

  if (!isLoaded) {
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    return;
  }

  return (
    <div className="mx-auto max-w-screen-lg p-6">
      <main className="flex w-full flex-col items-center">
        <Image
          className="flex h-auto w-full max-w-xs"
          src="/assets/1.png"
          alt="Mental Health AI Assistant"
          height={200}
          width={200}
        />
        <div className="ml-10">
          <p className="text-lg text-orange-400">
            {`Hi there! I'm your personalizable mental health assistant. I'm
                here to help you explore your thoughts and help track your mood.
                What's your name?`}
          </p>

          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="How can I help you today?"
              className="w-full"
            />
            <Button
              type="submit"
              className="focus:shadow-outline position= mt-4 rounded-2xl bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-800 focus:outline-none"
            >
              Submit
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;
