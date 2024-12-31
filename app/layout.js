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
  title: "Queue Tube - Effortless Playlist Management",
  description:
    "Queue Tube lets you organize, watch, and take notes on your favorite video playlists distraction-free. Add up to 20 playlists, set favorites, and track videos smarter.",
  metadataBase: new URL("https://queue-tube.vercel.app/"),
  openGraph: {
    title: "Queue Tube",
    description: "Queue Tube - Effortless Playlist Management",
    url: "https://queue-tube.vercel.app/",
    siteName: "queue-tube",
    images: [
      {
        url: "https://queue-tube.vercel.app/logo_white.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://queue-tube.vercel.app/assets/thumbnail.jpg",
        width: 1800,
        height: 1600,
      },
      {
        url: "https://queue-tube.vercel.app/assets/thumbnail.jpg",
        width: 1200,
        height: 600,
      },
    ],
    type: "website",
  },
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
