import { PropsWithChildren } from "react";

export default function SettingsLayout({
    children
}: Readonly<PropsWithChildren>) {
    return (
        <>
            {children}
        </>
    )
}