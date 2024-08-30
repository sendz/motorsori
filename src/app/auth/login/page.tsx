import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { checkSession } from "../../../../utils/supabase/session";

export default async function Login() {
  await checkSession()
  return (
    <main className="md:container mx-2 md:mx-auto">
      <h2 className="text-center">Login</h2>
      <form>
        <div className="py-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" placeholder="Email" id="email" />
        </div>
        <div className="py-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" placeholder="Password" id="password" />
        </div>
        <div className="py-2 flex flex-row justify-between">
          <Link href="/auth/register" className="link">Need an account? Register here.</Link>
          <Button>Log In</Button>
        </div>
      </form>
    </main>
  )
}
