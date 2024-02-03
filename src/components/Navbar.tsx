"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/q176u4reZ6H
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Component() {
  return (
    <header className="flex h-16 w-full items-center bg-gray-400/40 px-4 shadow md:px-6">
      <Link className="flex items-center space-x-2" href="#">
        <HeartIcon className="h-6 w-6" />
        <span className="text-lg font-semibold text-white">
          Mental Health App
        </span>
      </Link>
      <nav className="flex w-full items-center justify-end gap-2">
        <SignedOut>
          <Button value="outline" asChild>
            <SignInButton redirectUrl={"http://localhost:3000/about"} />
          </Button>
        </SignedOut>
        <SignedIn>
          <Button variant="outline" asChild>
            <Link href="/home">Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">Preferences</Link>
          </Button>
          <UserButton afterSignOutUrl="http://localhost:3000/" />
        </SignedIn>
      </nav>
    </header>
  );
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
