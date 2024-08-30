import { Metadata } from "next";
import { Inter } from "next/font/google";
import { defaultHead } from "next/head";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Login",
  description: "Motorsori Login"
};

export default function RootLayout({
  children
}: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
