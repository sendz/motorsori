"use server"

import { createClient } from "../../../../../utils/supabase/server";

export const updateProfile = async (_prevState: any, formData: FormData) => {
    const supabase = createClient();
    const { error } = await supabase
        .from("profiles")
        .update({
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            email: formData.get("email"),
            phone_number: formData.get("phone_number"),
            address: formData.get("address"),
            emergency_contact: formData.get("emergency_contact"),
            blood_type: formData.get("blood_type"),
            allergies: formData.get("allergies"),
            profession: formData.get("profession"),
            education: formData.get("education"),
            birth_date: formData.get("birth_date") || null,
            gender: formData.get("gender"),
        })
        .eq("id", formData.get("id"))
        .select()
        .single();

    if (error) {
        return { error: error.message, success: '' }
    }

    if (!error) {
        return { success: "Profile updated successfully", error: '' }
    }
}