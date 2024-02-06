import { Providers } from "@/lib/Providers";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import { BGImage } from "@/components/BgImage";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(" overflow-x-hidden font-sans", inter.variable)}
        suppressHydrationWarning
      >
        <Providers>
          <main className="aria-hidden flex min-h-[100dvh] min-w-[100dvw] flex-col">
            <BGImage />
            <Navbar />
            <section className="inline-flex grow">{children}</section>
            <Toaster />
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
