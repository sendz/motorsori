import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropsWithChildren } from "react";
import SettingsMenu from "./components/menu";

export default function SettingsLayout({
    children
}: Readonly<PropsWithChildren>) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <SettingsMenu />
                {children}
            </CardContent>
        </Card>
    )
}