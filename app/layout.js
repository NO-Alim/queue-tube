import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { dbConnect } from "@/service/mongo";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Queue Tube",
  description:
    "Queue Tube is a simple yet powerful app that lets you save youTube videos and playlists to watch later. Easily organize your favorite content, create custom playlists, and access everything in one place whenever you want. Whether you are building a personal video library, managing playlists, or just want a clean, organized way to keep track of YouTube videos.",
};

export default async function RootLayout({ children }) {
  const connect = await dbConnect();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>{children}</SessionProvider>

          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
