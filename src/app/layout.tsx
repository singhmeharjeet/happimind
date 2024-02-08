import { Providers } from "@/lib/Providers";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import { BGImage } from "@/components/BgImage";
import { ClerkProvider } from "@clerk/nextjs";
import { env } from "@/env";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata = {
  title: "HappiMind",
  description: "An AI assistant for mental health.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

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
            <ReactQueryDevtools initialIsOpen={false} />
          </Providers>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
