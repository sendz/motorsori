import { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";

const inter = Inter({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Register",
  description: "Register to Motorsori"
}

export default function RootLayout({
  children
}: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
