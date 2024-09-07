"use server"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { checkSession } from "../../../../utils/supabase/session";
import { createClient } from "../../../../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthTokenResponse } from "@supabase/supabase-js";

const login = async (formData: FormData) => {
  "use server"
  const supabase = createClient()
  const payload = {
    email: formData.get("email")?.toString()!,
    password: formData.get("password")?.toString()!
  }

  return supabase.auth.signInWithPassword(payload)
}

export default async function Login() {
  "use server"
  await checkSession()

  const _login = async (formData: FormData) => {
    "use server"
    try {
      const data: AuthTokenResponse = await login(formData)
      console.log("DATA", data)
      if (data.data.user) {
        revalidatePath("/auth/login")
        redirect("/")
      }
    } catch (e) {
      console.error("LOGIN ERROR", e)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Login</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={_login} className="space-y-4 sm:space-y-6">
          <div className="space-y-1 sm:space-y-2">
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="w-full text-sm sm:text-base py-2 sm:py-3"
            />
          </div>
          <div className="space-y-1 sm:space-y-2">
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Your Password"
              required
              className="w-full text-sm sm:text-base py-2 sm:py-3"
            />
          </div>
          <Button
            className="w-full text-sm sm:text-base py-2 sm:py-3"
            type="submit"
          >
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs sm:text-sm text-gray-600 text-center w-full mt-4 sm:mt-6">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
