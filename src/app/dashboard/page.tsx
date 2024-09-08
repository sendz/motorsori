"use server"

import { createClient } from "../../../utils/supabase/server"


export default async function Dashboard() {
    const supabase = createClient()
    const { data: {user} } = await supabase.auth.getUser()
    return (
        <>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <h3>Hi {user?.user_metadata?.first_name}</h3>
        </>
    )
}
