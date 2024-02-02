import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="h-screen">
      <Button asChild>
        <SignInButton afterSignInUrl="/home" redirectUrl="/home">
          Sign In
        </SignInButton>
      </Button>
    </div>
  );
}
