import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display"
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body"
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Arittro Chowdhury | SaaS & Cloud Engineer",
  description: "Freelance SaaS Developer & Cloud Architect portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body className="antialiased font-body bg-[#FAFAFA] text-[#17102B]">
        {children}
      </body>
    </html>
  );
}