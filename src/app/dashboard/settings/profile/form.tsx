"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormState, useFormStatus } from "react-dom"
// import { updateProfile } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
import { updateProfile } from "./actions"

type SettingsProfileFormProps = {
    profile?: {
        id: string
        first_name: string
        last_name: string
        email: string
        phone_number: string
        address: string
        emergency_contact: string
        blood_type: string
        allergies: string
        profession: string
        education: string
        birth_date: string
        gender: string
    }
}

export default function SettingsProfileForm({ profile }: SettingsProfileFormProps) {
    const [state, formAction] = useFormState(updateProfile, {
        error: '',
        success: ''
    })

    const { pending } = useFormStatus()

    const { toast } = useToast()

    useEffect(() => {
        if (state?.error) {
            toast({ title: state.error, variant: 'destructive' })
        }
        if (state?.success) {
            toast({ title: state.success })
        }
    }, [state])
    
    return (
        <form action={formAction} className="flex flex-col gap-2">
            <input type="hidden" name="id" value={profile?.id} />
            <Input name="first_name" label="First Name" defaultValue={profile?.first_name} />
            <Input name="last_name" label="Last Name" defaultValue={profile?.last_name} />
            <Input name="email" label="Email" defaultValue={profile?.email} />
            <Input name="phone_number" label="Phone Number" defaultValue={profile?.phone_number} />
            <Input name="address" label="Address" defaultValue={profile?.address} />
            <Input name="emergency_contact" label="Emergency Contact" defaultValue={profile?.emergency_contact} />
            <Input name="blood_type" label="Blood Type" defaultValue={profile?.blood_type} />
            <Input name="allergies" label="Allergies" defaultValue={profile?.allergies} />
            <Input name="profession" label="Profession" defaultValue={profile?.profession} />
            <Input name="education" label="Education" defaultValue={profile?.education} />
            <Input name="birth_date" label="Birth Date" defaultValue={profile?.birth_date} />
            <Label>Gender</Label>
            <Select name="gender" defaultValue={profile?.gender || ''}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button className="mt-4" type="submit" disabled={pending}>Save</Button>
        </form>
    )
}