"use server"

import { createClient } from "../../../../../utils/supabase/server";

export const updateEmail = async (_prevState: any, formData: FormData) => {
    const supabase = createClient();

    const { data: { user }, error: getUserError } = await supabase.auth.getUser()

    if (getUserError || !user) {
        return { error: "Authentication error", success: '' };
    }

    const newEmail = formData.get("email")?.toString()
    if (!newEmail) {
        return { error: "New email is required", success: '' };
    }

    const { error, data } = await supabase.auth.updateUser({ email: newEmail })

    console.log(data)
    if (error) {
        return { error: error.message, success: '' };
    }

    return { success: "Email update initiated. Please check your new email for confirmation.", error: '' };
};