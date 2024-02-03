import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function baseurl() {
  if (process.env.NODE_ENV === "production") {
    return "https://yourdomain.com";
  } else {
    return "http://localhost:3000";
  }
}
