
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import React from "react";

export const metadata: Metadata = {
  title: "Auction Demo App"
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="h-full min-h-[100vh] w-full bg-gray-200">
            <NavBar />
            {children}
        </div>
      </body>
    </html>
  );
}
