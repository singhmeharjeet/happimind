"use client";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { createUser } from "@/actions/createUser";
import { AI, Tone } from "@/actions/createUser";

const QuestionnairePage: React.FC = () => {
  const [ai, setAi] = useState<AI>("male");
  const [tone, setTone] = useState<Tone>("empathetic");
  const { user } = useUser();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user?.primaryEmailAddress?.emailAddress) {
      return;
    }

    const res = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      ai: ai,
      tone: tone,
    });

    if (res.success) {
      console.log("User created successfully");
    }
    if (res.error) {
      console.log("Error creating user");
      console.log(res.error);
    }
  }
  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="w-full">
        <section className="item-center space-4 my-6 flex flex-col justify-center">
          <h1 className="w-full text-center text-2xl font-bold text-amber-700">
            Choose your assistant
          </h1>
          <RadioGroup
            defaultValue={ai}
            onValueChange={(value: AI) => setAi(value)}
            className="flex justify-around"
          >
            <div className="flex flex-col items-center space-x-2 space-y-2">
              <Label htmlFor="r1">
                <img
                  className="size-32 rounded"
                  src="/assets/2.png"
                  alt="Assistant"
                />
              </Label>
              <RadioGroupItem value="male" id="r1" />
            </div>
            <div className="flex flex-col items-center space-x-2 space-y-2">
              <Label htmlFor="r2">
                <img
                  className="size-32 rounded"
                  src="/assets/1.png"
                  alt="Cat Avatar"
                />
              </Label>
              <RadioGroupItem value="female" id="r2" />
            </div>
            <div className="flex flex-col items-center space-x-2 space-y-2">
              <Label htmlFor="r3">
                <img
                  className="size-32 rounded"
                  src="/assets/3.png"
                  alt="Person Avatar"
                />
              </Label>
              <RadioGroupItem value="cat" id="r3" />
            </div>
          </RadioGroup>
        </section>
        <section className="mb-6 flex flex-col items-center justify-center space-x-4">
          <h1 className="w-full text-center text-2xl font-bold text-amber-700">
            Choose the tone of your assistant
          </h1>
          <RadioGroup
            defaultValue={tone}
            onValueChange={(value: Tone) => setTone(value)}
            className="mt-4 flex w-fit flex-col justify-center gap-4"
          >
            <div className="ml-4 flex w-60 items-center justify-start gap-2">
              <RadioGroupItem value="empathetic" id="t1" />
              <Label htmlFor="r1">Empathetic</Label>
            </div>
            <div className="ml-4 flex  w-60 items-center justify-start gap-2">
              <RadioGroupItem value="solution-oriented" id="t2" />
              <Label htmlFor="r2">Solution-Oriented</Label>
            </div>
          </RadioGroup>
        </section>

        <div className="w-full items-center justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionnairePage;
