import type { Metadata } from "next";
import "./globals.css";
import { MusicToggle } from "@/components/MusicToggle";

export const metadata: Metadata = {
  title: "WorldCore - Real-time Interactive World Model",
  description: "A real-time interactive world model demo with keyboard and camera controls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <MusicToggle />
        {children}
      </body>
    </html>
  );
}
