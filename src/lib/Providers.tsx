"use client";
import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: ReactNode;
}
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};
