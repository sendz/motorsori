"use server"

import { redirect } from "next/navigation"
import { createClient } from "../../../../utils/supabase/server"

export const login = async (_prevState: any, formData: FormData) => {
    const supabase = createClient()
    const payload = {
      email: formData.get("email")?.toString()!,
      password: formData.get("password")?.toString()!
    }
  
    const response = await supabase.auth.signInWithPassword(payload)

    if (response.error?.message) {
        return { error: response.error?.message }
    }

    redirect("/")
  }