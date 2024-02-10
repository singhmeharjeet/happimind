import Title from "@/components/ui/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LandingPage() {
  return (
    <div className="flex-center min-h-full min-w-full flex-col items-center justify-center gap-6 px-4 md:px-6">
      <Title size="xl">Welcome to AI Therapy</Title>
      <p className="flex w-full max-w-3xl text-balance text-center">
        Any Language, Any Feeling, we provide personalized therapy sessions
        powered by advanced AI technology. Start your journey towards better
        mental health today.
      </p>
      <div className="mt-10 flex justify-center">
        <Button value="outline" asChild>
          <Link href="/home">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
