import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <>
      <div className="h-screen">
        <main className="flex h-screen flex-1 flex-col items-center justify-center px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl/none">
            Welcome to AI Therapy
          </h1>
          <p className="mt-4 max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We provide personalized therapy sessions powered by advanced AI
            technology. Start your journey towards better mental health today.
          </p>
          <div className="mt-10 flex justify-center">
            <Button value="outline" asChild>
              <SignInButton redirectUrl="http://localhost:3001/about">
                Get Started
              </SignInButton>
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}
