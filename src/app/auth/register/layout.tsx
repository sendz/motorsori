import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Register",
  description: "Register to Motorsori"
}

export default function RootLayout({
  children
}: Readonly<PropsWithChildren>) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      {children}
      <Toaster />
    </div>
  )
}
