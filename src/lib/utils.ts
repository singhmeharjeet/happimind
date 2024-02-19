import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function baseurl() {
  if (process.env.NODE_ENV === "production") {
    return "https://happimind.vercel.app";
  } else {
    return "http://localhost:3000";
  }
}

export function bounce(ref: React.RefObject<HTMLElement>) {
  if (ref.current) {
    ref.current.style.transform = "scale(0.98, 0.99)";
    ref.current.style.transition = "transform 150ms ease-in-out";

    setTimeout(() => {
      if (ref.current) {
        ref.current.style.transform = "";
      }
    }, 150);
  }
}
