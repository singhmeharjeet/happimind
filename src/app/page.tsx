import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <>
      <div className="h-screen">
        <h1 className="mt-20 text-center text-4xl font-bold text-amber-700">
          HappiMind
        </h1>
        <p className="mt-3 text-center text-xl text-orange-400">
          Say Hello to Your Mental Health AI Assistant!
        </p>
        <div className="mt-10 flex justify-center">
          <Button value="outline" asChild>
            <SignInButton redirectUrl={"http://localhost:3001/about"} />
          </Button>
        </div>
      </div>
    </>
  );
}
