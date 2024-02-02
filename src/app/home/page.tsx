"use client";
import { SignOutButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return (
      <>
        <div>Hello {user.fullName}!</div>
        <SignOutButton />
      </>
    );
  }

  return <div>Not signed in</div>;
}
