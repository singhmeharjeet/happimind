import { Providers } from "@/lib/Providers";
import "@/styles/globals.css";
import imagePath from "public/assets/Background.png";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

// inset-0 makes it fill the entire space within its parent container.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <div className="absolute inset-0 -z-10">
          <Image
            src={imagePath}
            alt="always add alt"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
