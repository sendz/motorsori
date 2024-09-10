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

export const updatePassword = async (_prevState: any, formData: FormData) => {
    const supabase = createClient();

    const { data: { user }, error: getUserError } = await supabase.auth.getUser()

    if (getUserError || !user) {
        return { error: "Authentication error", success: '' };
    }
    
    const newPassword = formData.get("new_password")?.toString()
    const confirmPassword = formData.get("confirm_password")?.toString()

    if (!confirmPassword || !newPassword) {
        return { error: "New password and confirm password are required", success: '' };
    }

    if (newPassword !== confirmPassword) {
        return { error: "Passwords not match", success: '' };
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
        return { error: error.message, success: '' };
    }

    return { success: "Password updated successfully", error: '' };
    

}