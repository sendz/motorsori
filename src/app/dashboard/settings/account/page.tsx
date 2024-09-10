"use server"

import { createClient } from "../../../../../utils/supabase/server";
import AccountSettingsForm from "./form";

export default async function AccountSettingsPage() {

    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div>
            <h2 className="text-xl font-bold my-4">Account Settings</h2>
            <AccountSettingsForm user={user} />
        </div>
    )
}