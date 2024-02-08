"use client";
import Image from "next/image";
import imagePathDark from "public/assets/dark-bg.jpg";
import imagePathLight from "public/assets/Background.png";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function BGImage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed -z-30 h-full w-full">
      {theme === "light" ? (
        <Image
          src={imagePathLight}
          alt="BG image"
          className={cn("absolute inset-0 rounded")}
          fill
        />
      ) : (
        <Image
          src={imagePathDark}
          alt="BG image"
          className={cn("absolute inset-0 rounded")}
          fill
        />
      )}
    </div>
  );
}
