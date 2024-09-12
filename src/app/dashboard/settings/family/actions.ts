"use server"

import { redirect } from "next/navigation";
import { createClient } from "../../../../../utils/supabase/server";

export const addFamily = async (_prevState: any, formData: FormData) => {
    const supabase = createClient();

    const { error, data } = await supabase.from('profiles').insert({
        first_name: formData.get("first_name")?.toString()!,
        last_name: formData.get("last_name")?.toString()!,
        email: formData.get("email")?.toString()!,
    })
        .select()
        .single()

    console.log(data)

    if (data.id) {
        const { error: familyMemberError } = await supabase.from('family_members').insert({
            family_id: formData.get("family_id")?.toString()!,
            profile_id: data.id,
            role: formData.get("role")?.toString()!,
        });

        if (familyMemberError) {
            return { error: familyMemberError.message, success: '' }
        }
    }

    if (error) {
        return { error: error.message, success: '' }
    }

    return { error: '', success: 'Family member added successfully' }
}
