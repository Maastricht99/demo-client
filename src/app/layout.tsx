
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import React from "react";
import QueryClientProviderWrapper from "@/util/query-client-provider-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auction Demo App"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProviderWrapper>
          <NavBar />
          {children}
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
