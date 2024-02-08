import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";

const font = Dancing_Script({
  weight: "700",
  adjustFontFallback: true,
  subsets: ["latin"],
});

export default async function LandingPage() {
  const { userId } = auth();
  return (
    <div className="flex-center min-h-full min-w-full flex-col items-center justify-center gap-6 px-4 md:px-6">
      <h1
        className={cn(
          "flex-center text-balance text-center text-6xl font-bold tracking-tighter",
          font.className,
        )}
      >
        Welcome to AI Therapy
      </h1>
      <p className="flex w-full max-w-3xl text-balance text-center">
        Any Language, Any Feeling, we provide personalized therapy sessions
        powered by advanced AI technology. Start your journey towards better
        mental health today.
      </p>
      <div className="mt-10 flex justify-center">
        <Button value="outline" asChild>
          <Link href={!userId ? "/sign-in" : "/home"}>Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
