import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
}

export default function DashboardLayout({
    children
}: Readonly<PropsWithChildren>) {
    return (
        <div className="flex h-screen bg-gray-100">
            {children}
            <Toaster />
        </div>
    )
}