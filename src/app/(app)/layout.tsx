import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavComponent from "./components/navComponent";
import FooterComponent from "./components/footerComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Idyllic Moments Guest House",
  description: "Made By Paa KA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased` } 
      >

        <NavComponent/>


        {children}

        {/* footer */}
        <FooterComponent/>
      </body>
    </html>
  );
}