"use client"

import { useState } from "react"
import { UserAvatar } from "./avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown, Home, Users, BarChart, Settings, Menu, Bell, ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input"

export const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            
            {/* SIDEBAR */}
            <div className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static fixed z-30`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="text-xl font-semibold">Dashboard</span>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                </div>
                <nav className="flex-grow">
                    <ul className="p-2 space-y-1">
                        <li>
                            <Button variant="ghost" className="w-full justify-start">
                                <Home className="mr-2 h-4 w-4" />
                                Home
                            </Button>
                        </li>
                        <li>
                            <Button variant="ghost" className="w-full justify-start">
                                <Users className="mr-2 h-4 w-4" />
                                Users
                            </Button>
                        </li>
                        <li>
                            <Button variant="ghost" className="w-full justify-start">
                                <BarChart className="mr-2 h-4 w-4" />
                                Analytics
                            </Button>
                        </li>
                        <li>
                            <Button variant="ghost" className="w-full justify-start">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Button>
                        </li>
                    </ul>
                </nav>
                <UserAvatar />
            </div>
            <header className="md:none bg-white border-b flex items-center justify-between p-4">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(open => !open)}>
                    <Menu className="h-6 w-6" />
                </Button>
            </header>
        </>
    )
}