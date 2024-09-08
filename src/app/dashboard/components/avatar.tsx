"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "../../../../utils/supabase/client"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"

export const UserAvatar = () => {
    const [user, setUser] = useState<User>()
    const supabase = createClient()

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase.auth.getUser()

            if (data.user) {
                setUser(data.user)
            }

            if (error?.message) {
                redirect("/auth/logout")
            }
        })()
    }, [])

    return (
        <div className="p-4 border-t">
            <div className="flex items-center">
                <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>
                        {`${user?.user_metadata.first_name[0]}${user?.user_metadata.last_name[0]}`}
                    </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                    <p className="text-sm font-medium">{`${user?.user_metadata.first_name} ${user?.user_metadata.last_name}`}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
            </div>
        </div>
    )
}