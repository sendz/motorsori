"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { checkSession, login } from "./actions";

export default function Login() {
  const [state, formAction] = useFormState(login, {
    error: ''
  })

  const { pending } = useFormStatus()

  const { toast } = useToast()

  useEffect(() => {
    (async () => {
      await checkSession()
    })()
  }, [])

  useEffect(() => {
    if (state.error) {
      toast({ title: state.error, variant: 'destructive' })
    }
  }, [state])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Login</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4 sm:space-y-6">
          <div className="space-y-1 sm:space-y-2">
            <Input
              label="Email"
              id="email"
              type="email"
              name="email"
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
              name="password"
              placeholder="Your Password"
              required
              className="w-full text-sm sm:text-base py-2 sm:py-3"
            />
          </div>
          <Button
            disabled={pending}
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
