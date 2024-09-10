"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { register } from "./actions"

export default function RegisterForm() {
    const [state, formAction] = useFormState(register, {
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
                disabled={pending}
            >
                Register
            </Button>
        </form>
    )
}