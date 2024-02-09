"use client";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { editPreference } from "@/actions/editPreference";
import type { AI, Tone } from "@/actions/editPreference";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import Title from "@/components/ui/Title";

function Page() {
  const [ai, setAi] = useState<AI>("male");
  const [tone, setTone] = useState<Tone>("empathetic");
  const { user } = useUser();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user?.primaryEmailAddress?.emailAddress) {
      return;
    }

    const res = await editPreference({
      email: user?.primaryEmailAddress?.emailAddress,
      ai: ai,
      tone: tone,
    });

    if (res.success) {
      toast({
        title: res.message,
        description: `Changed To: Character: ${ai}, Tone: ${tone}`,
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
    <div className="mx-auto flex w-full flex-col items-start justify-start gap-4 rounded p-2 md:w-5/6 md:gap-8 md:p-4">
      <div className="flex-center w-full">
        <Title size="lg" variant="underline">
          Preferences
        </Title>
      </div>
      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <section className="flex-center w-full flex-col space-y-4">
          <h1 className="flex w-full items-center text-start font-semibold text-primary/95 md:text-xl">
            <span className="flex-center mr-2 h-8 w-8 rounded-full bg-accent p-1 text-primary/95 transition-colors duration-1000">
              1
            </span>
            Choose your assistant
          </h1>
          <RadioGroup
            defaultValue={ai}
            onValueChange={(value: AI) => setAi(value)}
            className="flex justify-around"
          >
            <div className="flex flex-col items-center space-x-2 space-y-2">
              <Label htmlFor="r1">
                <Image
                  height={200}
                  width={200}
                  className="size-32 rounded"
                  src="/assets/2.png"
                  alt="Assistant"
                />
              </Label>
              <RadioGroupItem value="male" id="r1" />
            </div>
            <div className="flex flex-col items-center space-x-2 space-y-2">
              <Label htmlFor="r2">
                <Image
                  height={200}
                  width={200}
                  className="size-32 rounded"
                  src="/assets/1.png"
                  alt="Cat Avatar"
                />
              </Label>
              <RadioGroupItem value="female" id="r2" />
            </div>
            <div className="flex flex-col items-center space-x-2 space-y-2">
              <Label htmlFor="r3">
                <Image
                  height={200}
                  width={200}
                  className="size-32 rounded"
                  src="/assets/3.png"
                  alt="Person Avatar"
                />
              </Label>
              <RadioGroupItem value="cat" id="r3" />
            </div>
          </RadioGroup>
        </section>
        <section className="flex-center w-full flex-col space-y-4">
          <h1 className="flex w-full items-center text-start font-semibold text-primary/95 md:text-xl">
            <span className="flex-center mr-2 h-8 w-8 rounded-full bg-accent p-1 text-primary/95 transition-colors duration-1000">
              2
            </span>
            Choose the tone of your assistant
          </h1>
          <RadioGroup
            defaultValue={tone}
            onValueChange={(value: Tone) => setTone(value)}
            className="mt-4 flex w-fit flex-col justify-center gap-4"
          >
            <div className="ml-4 flex w-60 items-center justify-start gap-2">
              <RadioGroupItem value="empathetic" id="t1" />
              <Label htmlFor="t1">Empathetic</Label>
            </div>
            <div className="ml-4 flex  w-60 items-center justify-start gap-2">
              <RadioGroupItem value="solution-oriented" id="t2" />
              <Label htmlFor="t2">Solution-Oriented</Label>
            </div>
          </RadioGroup>
        </section>

        <div className="flex-center w-full pt-6">
          <Button type="submit" className="w-1/2">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Page;
