"use server"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default async function DashboardSettingsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        console.error(error);
    }

    const updateProfile = async (formData: FormData) => {
        "use server"
    
        const supabase = createClient();
        const { data, error } = await supabase
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
            console.error(error);
        }
    
        return data;
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="profile">
                        <TabsList>
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="family">Family</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <div>
                                <h3 className="text-lg font-medium pb-4">Profile Settings</h3>
                                <div className="grid gap-4">
                                    <form action={updateProfile} className="flex flex-col gap-2">
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
                                        <Select name="gender">
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
                                        <Button className="mt-4" type="submit">Save</Button>
                                    </form>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="family">
                            <div>
                                <h3>Family</h3>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}