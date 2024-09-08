import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Sidebar } from "./components/sidebar";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
}

export default function RootLayout({
    children
}: Readonly<PropsWithChildren>) {
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex flex-1 md:flex-row flex-col">
            <Sidebar />

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
                    {children}
                </main>
            </div>
        </div>
            <Toaster />
        </div>
    )
}