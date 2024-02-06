"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { baseurl } from "@/lib/utils";
import { ModeToggle } from "./DarkModeToggle";
import Image from "next/image";

export default function Component() {
  return (
    <nav className="flex h-16 w-full items-center px-4 shadow backdrop-blur-3xl md:px-6">
      <Link className="flex items-center space-x-2" href="/">
        <div className="w-30 relative flex h-full w-auto items-center justify-center">
          <Image
            src="/assets/logo.png"
            alt="logo"
            height={200}
            width={200}
            className="aspect-auto rounded object-fill"
          />
        </div>
      </Link>
      <div className="flex h-full w-full items-center justify-end gap-2">
        <SignedOut>
          <Button value="ghost" asChild>
            <SignInButton redirectUrl={`${baseurl()}/about`} />
          </Button>
        </SignedOut>
        <SignedIn>
          <Button variant="ghost" asChild>
            <Link href="/home">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/about">Preferences</Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <UserButton afterSignOutUrl={`${baseurl()}/`} />
          </Button>
        </SignedIn>
        <ModeToggle />
      </div>
    </nav>
  );
}
