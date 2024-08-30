import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Register() {
  return (
    <main className="md:container mx-2 md:mx-auto">
      <h2 className="text-center">Register</h2>
      <form>
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
