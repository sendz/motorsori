"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { updateEmail, updatePassword } from "./actions"
import { User } from "@supabase/supabase-js"

interface AccountSettingsFormProps {
    user?: User | null
}

export const AccountSettingsForm = ({ user }: AccountSettingsFormProps) => {
    const [updateEmailState, updateEmailAction] = useFormState(updateEmail, {
        error: '',
        success: ''
    })

    const { pending } = useFormStatus()

    const { toast } = useToast()

    useEffect(() => {
        if (updateEmailState?.error) {
            toast({ title: updateEmailState.error, variant: 'destructive' })
        }
        if (updateEmailState?.success) {
            toast({ title: updateEmailState.success, variant: 'default' })
        }
    }, [updateEmailState])

    return (
        <div>
            <form className="flex flex-col gap-2" action={updateEmailAction}>
                <h3 className="text-lg font-medium">Change Login Email</h3>
                <Input type="email" name="email" placeholder="Email" defaultValue={user?.email} />
                <Button className="mt-4" disabled={pending} type="submit">Update</Button>
            </form>
        </div>
    )
}

export const UpdatePasswordForm = () => {
    const [updatePasswordState, updatePasswordAction] = useFormState(updatePassword, {
        error: '',
        success: ''
    })

    const { pending } = useFormStatus()

    const { toast } = useToast()

    useEffect(() => {
        if (updatePasswordState?.error) {
            toast({ title: updatePasswordState.error, variant: 'destructive' })
        }
        if (updatePasswordState?.success) {
            toast({ title: updatePasswordState.success, variant: 'default' })
        }
    }, [updatePasswordState])

    return (
        <form className="flex flex-col gap-2" action={updatePasswordAction}>
            <h3 className="text-lg font-medium">Change Password</h3>
            <Input type="password" name="new_password" placeholder="New Password" />
            <Input type="password" name="confirm_password" placeholder="Confirm New Password" />
            <Button className="mt-4" disabled={pending} type="submit">Update Password</Button>
        </form>
    )
}