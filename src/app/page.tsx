import { Button } from "@/components/ui/button";
import { baseurl, cn } from "@/lib/utils";
import { SignInButton, auth } from "@clerk/nextjs";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";

const font = Dancing_Script({
  weight: "700",
  adjustFontFallback: true,
  subsets: ["latin"],
});

export default async function LandingPage() {
  const { userId } = auth();

  console.log(userId);
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
        We provide personalized therapy sessions powered by advanced AI
        technology. Start your journey towards better mental health today.
      </p>
      <div className="mt-10 flex justify-center">
        <Button value="outline" asChild>
          {!userId ? (
            <SignInButton redirectUrl={`${baseurl()}/home`}>
              Get Started
            </SignInButton>
          ) : (
            <Link href={`${baseurl()}/home`}>Get Started</Link>
          )}
        </Button>
      </div>
    </div>
  );
}
