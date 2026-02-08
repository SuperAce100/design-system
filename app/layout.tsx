import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Hedvig_Letters_Serif,
  JetBrains_Mono,
  Manrope,
  Schibsted_Grotesk,
} from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeColorUpdater } from "@/components/theme-color-updater";
import { ThemeConfigProvider } from "@/lib/theme-context";
import { ThemeCustomizer } from "@/components/theme-customizer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hedvigLettersSerif = Hedvig_Letters_Serif({
  variable: "--font-hedvig-letters-serif",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asanshay's components",
  description: "A set of beautiful, flexible, and LLM-ready components for your next project.",
  metadataBase: new URL("https://ds.asanshay.com"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${hedvigLettersSerif.variable} ${manrope.variable} ${schibstedGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeConfigProvider>
            <ThemeColorUpdater />
            {children}
            <div className="fixed top-4 right-4 flex items-center gap-1 z-50">
              <ThemeCustomizer />
              <AnimatedThemeToggler />
            </div>
          </ThemeConfigProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
