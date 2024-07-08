import { Providers } from "@/lib/Providers";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import { BGImage } from "@/components/BgImage";
import { ClerkProvider } from "@clerk/nextjs";
import { env } from "@/env";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next/types";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "HappiMind",
  description: "An AI assistant for mental health.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],

  generator: "Meharjeet Singh",
  applicationName: "HappiMind",
  referrer: "origin-when-cross-origin",
  keywords: "mental health, AI, assistant, happimind",
  authors: [{ name: "Meharjeet Singh" }],
  creator: "HappiMind",
  publisher: "HappiMind",
  openGraph: {
    title: "HappiMind",
    description: "An AI assistant for mental health.",
    url: new URL("https://happimind.vercel.app"),

    type: "website",
    images: [
      {
        url: "https://happimind.vercel.app/assets/logo.png",
        height: 630,
        width: 1200,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "HappiMind",
    creator: "@HappiMind",
    title: "@HappiMind",
    description: "An AI assistant for mental health.",
  },
} satisfies Metadata;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(" overflow-x-hidden font-sans", inter.variable)}
          suppressHydrationWarning
        >
          <Providers>
            <main className="aria-hidden flex min-h-[100dvh] min-w-[100dvw] flex-col">
              <BGImage />

              <Navbar />
              <section className="inline-flex h-full grow">{children}</section>
              <Toaster />
            </main>
            {env.NODE_ENV === "development" && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </Providers>
          <Footer />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
