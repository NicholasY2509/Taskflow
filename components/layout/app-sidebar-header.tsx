"use client"

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumbs } from './breadcrumbs';
import { BreadcrumbItem } from '@/types/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Plus, Search } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItem[];
}) {
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, [supabase]);

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-2">
                {/* Search - Hidden on small mobile */}
                <div className="relative hidden sm:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search tasks..."
                        className="w-[200px] pl-8 lg:w-[300px]"
                    />
                </div>

                {/* Search button for mobile */}
                <Button variant="ghost" size="icon" className="sm:hidden">
                    <Search className="h-5 w-5" />
                </Button>

                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium">New task assigned</p>
                                <p className="text-xs text-muted-foreground">
                                    John assigned you to "Update dashboard UI"
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium">Comment on your task</p>
                                <p className="text-xs text-muted-foreground">
                                    Sarah commented on "Fix login bug"
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-center text-sm text-muted-foreground">
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    <span className="hidden md:inline">New Task</span>
                </Button>

                <div className="md:hidden">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.user_metadata?.avatar_url} />
                        <AvatarFallback>
                            {user?.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
