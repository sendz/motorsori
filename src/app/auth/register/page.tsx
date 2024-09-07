import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkSession } from "../../../../utils/supabase/session";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const register = async (formData: FormData) => {
  "use server"
  try {
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
    return response
  } catch (e) {
    console.error(e)
  }
}

export default async function Register() {
  await checkSession()

  const _register = async (formData: FormData) => {
    "use server"
    const data = await register(formData)

    if (data) {
      revalidatePath("/auth/register")
      redirect("/auth/login")
    }
  }
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Enter your details to register for a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={_register} className="space-y-4 sm:space-y-6">
          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="space-y-1 sm:space-y-2">
              <Input
                label="First Name"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                required
                className="w-full text-sm sm:text-base py-2 sm:py-3"
              />
            </div>
            <div className="space-y-1 sm:space-y-2">
              <Input
                label="Last Name"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                required
                className="w-full text-sm sm:text-base py-2 sm:py-3"
              />
            </div>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              className="w-full text-sm sm:text-base py-2 sm:py-3"
            />
          </div>
          <div className="space-y-1 sm:space-y-2">
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              required />
          </div>

          <Button
            className="w-full text-sm sm:text-base py-2 sm:py-3"
            type="submit"
          >
            Register
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs sm:text-sm text-gray-600 text-center w-full mt-4 sm:mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
