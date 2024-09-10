import { redirect } from "next/navigation"
import { createClient } from "./server"

export const checkSession = async () => {
  "use server"
  const supabase = createClient()
  const authData = await supabase.auth.getUser()
  console.log("USER", authData)
  if (authData.data.user) {
    redirect("/")
  }
}
