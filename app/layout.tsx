import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Groupies — Your Music. Your Fans. Your Rules.",
  description:
    "A human-first music platform where artists sell directly to fans, curators earn from their taste, and music finds its people.",
  openGraph: {
    title: "Groupies — Your Music. Your Fans. Your Rules.",
    description:
      "A human-first music platform. No algorithms. Direct fan support. Artists keep control.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f5f5f0]"
        style={{ fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
