"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

import imagePathDark from "public/assets/dark-bg.jpg";
import imagePathLight from "public/assets/Background.png";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BGImage() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed -z-30 h-full w-full ">
      <Image
        data-state={theme === "dark" ? "open" : "closed"}
        src={imagePathDark}
        alt="BG image"
        className={cn(
          "absolute inset-0 rounded",
          "data-[state=closed]:-z-30 data-[state=open]:-z-20",
          "data-[state=open]:animate-in data-[state=closed]:animate-out ",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        )}
        fill
      />

      <Image
        src={imagePathLight}
        data-state={theme === "dark" ? "closed" : "open"}
        alt="BG image"
        className={cn(
          "absolute inset-0 rounded",
          "data-[state=closed]:-z-30 data-[state=open]:-z-20",
          "data-[state=open]:animate-in data-[state=closed]:animate-out ",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        )}
        fill
      />
    </div>
  );
}
