"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CheckSquare,
    ListTodo,
    Settings,
    Users,
    FolderOpen,
    ChevronRight,
    Menu,
    LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard",
            active: pathname === "/dashboard",
        },
        {
            label: "My Issues",
            icon: CheckSquare,
            href: "/dashboard/issues",
            active: pathname === "/dashboard/issues",
        },
        {
            label: "Backlog",
            icon: ListTodo,
            href: "/dashboard/backlog",
            active: pathname === "/dashboard/backlog",
        },
        {
            label: "Board",
            icon: FolderOpen,
            href: "/dashboard/board",
            active: pathname === "/dashboard/board",
        },
        {
            label: "Teams",
            icon: Users,
            href: "/dashboard/teams",
            active: pathname === "/dashboard/teams",
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/dashboard/settings",
            active: pathname === "/dashboard/settings",
        },
    ];

    const SidebarContent = () => (
        <div className="flex h-full flex-col gap-4">
            <div className="flex h-14 items-center border-b px-6">
                <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <LayoutDashboard className="h-5 w-5" />
                    </div>
                    <span className="">Taskflow</span>
                </Link>
            </div>
            <ScrollArea className="flex-1 px-4">
                <div className="flex flex-col gap-2 py-2">
                    {routes.map((route) => (
                        <Button
                            key={route.href}
                            variant={route.active ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start gap-2",
                                route.active && "bg-secondary"
                            )}
                            asChild
                        >
                            <Link href={route.href}>
                                <route.icon className="h-4 w-4" />
                                {route.label}
                            </Link>
                        </Button>
                    ))}
                    <Separator className="my-4" />
                    <Collapsible className="group/collapsible">
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between">
                                <span className="flex items-center gap-2">
                                    <FolderOpen className="h-4 w-4" />
                                    Projects
                                </span>
                                <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 py-2">
                            <div className="flex flex-col gap-2">
                                <Button variant="ghost" size="sm" className="w-full justify-start">
                                    Project Alpha
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-start">
                                    Project Beta
                                </Button>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </ScrollArea>
            <div className="mt-auto border-t p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.user_metadata?.avatar_url} />
                                <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-xs">
                                <span className="font-medium truncate w-32 text-left">{user?.user_metadata?.full_name || user?.email}</span>
                                <span className="text-muted-foreground truncate w-32 text-left">{user?.email}</span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Sidebar */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                    <SidebarContent />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div className={cn("hidden border-r bg-background md:block w-72 fixed inset-y-0 left-0 z-30", className)}>
                <SidebarContent />
            </div>
        </>
    );
}
