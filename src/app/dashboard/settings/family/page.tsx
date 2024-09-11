"use server"

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "../../../../../utils/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function FamilySettingsPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    const { data: userFamily, error: userFamilyError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('profile_id', user?.id)
        .single();

    if (userFamilyError) {
        console.error('Error fetching user family:', userFamilyError);
        return { error: 'Failed to fetch family data' };
    }

    const { data, error } = await supabase
        .from('families')
        .select(`
    name,
    family_members (
      profiles (
        id,
        first_name,
        last_name
      ),
      role
    )
  `)
        .eq('id', userFamily.family_id)
        .single();

    if (error) {
        console.error('Error fetching family data:', error);
        return { error: 'Failed to fetch family data' };
    }

    if (error) {
        console.error('Error fetching family members:', error);
    }

    return (
        <div>
            <h2 className="text-xl font-bold my-4">Family Settings</h2>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="w-full flex flex-col md:flex-row justify-between items-start">
                        <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
                            <h3 className="text-lg font-bold">{data.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">Manage your family members and settings</p>
                        </div>
                        <div className="w-full md:w-1/2 md:pl-4 flex justify-start md:justify-end">
                            <Button variant="outline" className="w-full md:w-auto">
                                Invite Family Member
                            </Button>
                        </div>
                    </div>
                    <Table>
                        <TableCaption>Members of {data.name}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.family_members.map((member: any) => (
                                <TableRow key={member.profiles.id}>
                                    <TableCell>{member.profiles.first_name} {member.profiles.last_name}</TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell>
                                        <Button variant="secondary" asChild>
                                            <Link href={`/dashboard/settings/family/${member.profiles.id}`}>
                                                View
                                            </Link>
                                        </Button>
                                        {member.profiles.id !== user?.id && (
                                            <Button variant="destructive">
                                                Remove
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}