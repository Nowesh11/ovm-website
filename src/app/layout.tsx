import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OVM Prestressing Technology (M) Sdn. Bhd.",
  description:
    "Engineering quality, leading innovation — post-tensioning systems, cable systems, bearings and structural health monitoring for bridges across Malaysia and beyond.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="bg-ink text-muted min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
