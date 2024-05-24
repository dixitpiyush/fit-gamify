import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/theme-provider";

const fontPtSerif = PT_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

export const metadata: Metadata = {
  title: "MoveMasters",
  description:
    "A website which aims to combine the world of Fitness with the world of Gaming",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "box-border flex h-screen flex-col bg-background antialiased",
          fontPtSerif.className,
          fontPtSerif.style.fontFamily,
          fontPtSerif.style.fontWeight,
          fontPtSerif.style.fontWeight
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
