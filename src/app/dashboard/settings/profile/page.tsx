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

    console.log(profile)

    return (
        <div>
            <h1>Profile Settings</h1>
            {profile && <SettingsProfileForm profile={profile} />}
            {/* <SettingsProfileForm profile={profile} /> */}
        </div>
    )
}