"use server"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users } from "lucide-react"
import { Sidebar } from "./components/sidebar"
import { PropsWithChildren } from "react"

export default async function Dashboard({ children }: Readonly<PropsWithChildren>) {

    const setSidebarOpen = (open: boolean) => {

    }

    return (
        <div className="flex flex-1 md:flex-row flex-col">
            <Sidebar />

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
                    <h1 className="text-2xl font-semibold mb-4">Welcome, John</h1>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1,234</div>
                                <p className="text-xs text-muted-foreground">+10% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <BarChart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$45,231</div>
                                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
