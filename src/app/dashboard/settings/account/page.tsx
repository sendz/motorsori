"use server"

import { createClient } from "../../../../../utils/supabase/server";
import {AccountSettingsForm, UpdatePasswordForm} from "./form";

export default async function AccountSettingsPage() {

    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div>
            <h2 className="text-xl font-bold my-4">Account Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16">
                
                <div>
                    <AccountSettingsForm user={user} />
                </div>
                <div>
                    <UpdatePasswordForm />
                </div>
            </div>
        </div>
    )
}