"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "../../../../utils/supabase/server"

export default async function Logout() {
  const supabase = createClient()

  await supabase.auth.signOut()

  revalidatePath("/auth/logout")
  redirect("/auth/login")
}
