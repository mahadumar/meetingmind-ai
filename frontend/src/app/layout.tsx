import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MeetingMind AI",
  description: "Turn any meeting into a structured action plan — automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: "system-ui, sans-serif" }}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}