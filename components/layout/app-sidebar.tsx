"use client"

import * as React from "react"
import { FolderArchive, FolderKanban, GalleryVertical, GalleryVerticalEnd, LayoutDashboard, ListTodo, ScrollText, Settings2, UserSquare2 } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { createClient } from "@/lib/supabase/client"
import { User } from "@/types/user"
import { useEffect } from "react"
import { NavItem } from "@/types/layout"
import { NavMain } from "./nav-main"

const navMain: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: 'Projects',
        href: '#',
        icon: FolderKanban
    },
    {
        title: 'Tasks',
        href: '#',
        icon: ListTodo,
    },
    {
        title: 'Teams',
        href: '#',
        icon: UserSquare2,
    },
    {
        title: 'Activity Logs',
        href: '#',
        icon: ScrollText,
    },
    {
        title: "Settings",
        href: "#",
        icon: Settings2,
        children: [
            {
                title: "Users",
                href: "#",
            },
            {
                title: "Roles",
                href: "#",
            },
            {
                title: "Permission",
                href: "#",
            },
        ]
    }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [user, setUser] = React.useState<User | null>(null)
    const supabase = createClient()

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user: supabaseUser } } = await supabase.auth.getUser()

            if (supabaseUser) {
                setUser({
                    name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || "User",
                    email: supabaseUser.email || "",
                    avatar: supabaseUser.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${supabaseUser.email}`,
                })
            }
        }

        fetchUser()
    }, [supabase])
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">Documentation</span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
            </SidebarContent>
            <SidebarFooter>
                {user && <NavUser user={user} />}
            </SidebarFooter>
        </Sidebar>
    )
}
