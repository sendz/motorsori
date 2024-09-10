"use client"

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsMenu() {
    // get pathname and give active class to the current page
    const pathname = usePathname()
    const isActive = (path: string) => pathname.includes(path)
    
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/dashboard/settings/account" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive("account") && "bg-gray-300")}>
                            Account
                        </NavigationMenuLink>
                    </Link>
                    <Link href="/dashboard/settings/profile" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive("profile") && "bg-gray-300")}>
                            Profile
                        </NavigationMenuLink>
                    </Link>
                    <Link href="/dashboard/settings/family" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive("family") && "bg-gray-300")}>
                            Family
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}