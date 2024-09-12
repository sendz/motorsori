'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@radix-ui/react-select"
import { useFormState, useFormStatus } from "react-dom"
import { addFamily } from "../actions"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

interface AddFamilyProps {
    familyId: string
}

export const AddFamily = ({ familyId }: AddFamilyProps) => {
    const [state, formAction] = useFormState(addFamily, {
        error: '',
        success: ''
    })

    const { pending } = useFormStatus()

    const { toast } = useToast()

    useEffect(() => {
        if (state.error) {
            toast({ title: state.error, variant: 'destructive' })
        }
        if (state.success) {
            toast({ title: state.success })
        setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }, [state])
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Add Family Member
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Family Member</DialogTitle>
                    <DialogDescription>Add a family member to your family</DialogDescription>
                </DialogHeader>
                <form action={formAction} className="flex flex-col gap-2">
                    <input type="hidden" name="family_id" value={familyId} />
                    {/* <Input label="Email" placeholder="Email" name="email" required /> */}
                    <Input label="First Name" placeholder="First Name" name="first_name" required />
                    <Input label="Last Name" placeholder="Last Name" name="last_name" required />
                    <Label>Role</Label>
                    <Select name="role" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* <SelectItem value="parent">Parent</SelectItem> */}
                            <SelectItem value="children">Children</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button disabled={pending} className="mt-4" type="submit">Add</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
