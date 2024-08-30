import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkSession } from "../../../../utils/supabase/session";

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
    <main className="md:container mx-2 md:mx-auto">
      <h2 className="text-center">Register</h2>
      <form action={_register}>
        <div className="py-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input type="text" name="first_name" id="first_name" placeholder="First Name" required />
        </div>
        <div className="py-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input type="text" name="last_name" id="last_name" placeholder="Last Name" />
        </div>
        <div className="py-2">
          <Label htmlFor="email">Email as Username</Label>
          <Input type="email" name="email" id="email" placeholder="Your Email Address" required />
        </div>
        <div className="py-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" placeholder="Password" required />
        </div>
        <div className="py-2 flex flex-row justify-between">
          <Link href="/auth/login" className="link">Have an account? Log in here.</Link>
          <Button>Register</Button>
        </div>
      </form>
    </main>
  )
}
