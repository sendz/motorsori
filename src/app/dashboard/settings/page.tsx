"use server"

import { redirect } from "next/navigation"

export default async function DashboardSettingsPage() {

    redirect("/dashboard/settings/profile")
    return (
        <div>
            Test
        </div>
    )
}