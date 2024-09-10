"use client"

import { Input } from "@/components/ui/input"
import { useFormState, useFormStatus } from "react-dom"
import { login } from "./actions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

export default function LoginForm() {
    const [state, formAction] = useFormState(login, {
        error: ''
      })
    const { pending } = useFormStatus()

    const { toast } = useToast()


  useEffect(() => {
    if (state.error) {
      toast({ title: state.error, variant: 'destructive' })
    }
  }, [state])
    
    return (
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
    )
}