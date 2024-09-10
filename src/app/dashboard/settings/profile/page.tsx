"use server"

import { redirect } from "next/navigation";
import { createClient } from "../../../../../utils/supabase/server";
import SettingsProfileForm from "./form";

export default async function ProfileSettings() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        console.error(error);
    }

    return (
        <div>
            <h2 className="text-xl font-bold my-4">Profile Settings</h2>
            <SettingsProfileForm profile={profile} />
        </div>
    )
}