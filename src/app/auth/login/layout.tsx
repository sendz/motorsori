import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <body className={inter.className}>
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}
