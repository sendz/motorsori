"use server"

import { redirect } from "next/navigation"
import { createClient } from "../../../../utils/supabase/server"

export const register = async (_prevState: any, formData: FormData) => {
    const supabase = createClient()

    const payload = {
        email: formData.get("email")?.toString()!,
        password: formData.get("password")?.toString()!,
        options: {
            data: {
                first_name: formData.get("first_name")?.toString()!,
                last_name: formData.get("last_name")?.toString()!
            }
        }
    }

    const response = await supabase.auth.signUp(payload)

    if (response.error?.message) {
        return { error: response.error?.message }
    }

    redirect("/auth/login")
}

export const checkSession = async () => {
    const supabase = createClient()
    const { data : { user }} = await supabase.auth.getUser()

    if (user) {
      redirect("/")
    }
}