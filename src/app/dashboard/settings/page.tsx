import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropsWithChildren } from "react";

export default function DashboardSettingsPage({ children }: Readonly<PropsWithChildren>) {
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
                                <h3>Profile</h3>
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