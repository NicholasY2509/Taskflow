"use client"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { NavItem } from '@/types/layout';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const pathname = usePathname();

    const normalizeHref = (href: NavItem['href']): string => {
        if (typeof href === 'string') return href;
        return '';
    };

    const isActiveLink = (href: NavItem['href']) => {
        const url = normalizeHref(href);
        if (url === '') return false;
        if (url === pathname) return true;

        return pathname.startsWith(url + '/');
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const hasChildren =
                        Array.isArray(item.children) &&
                        item.children.length > 0;

                    if (hasChildren) {
                        const isChildActive = item.children!.some((subItem) =>
                            isActiveLink(subItem.href),
                        );

                        return (
                            <Collapsible
                                key={item.title}
                                defaultOpen={isChildActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            isActive={isChildActive}
                                            className="w-full justify-start"
                                            tooltip={item.title}
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.children!.map((subItem) => {
                                                const isActive = isActiveLink(
                                                    subItem.href,
                                                );

                                                return (
                                                    <SidebarMenuSubItem
                                                        key={subItem.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={isActive}
                                                            className="w-full justify-start"
                                                        >
                                                            <Link href={normalizeHref(subItem.href)}>
                                                                <span>
                                                                    {subItem.title}
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        );
                    }

                    const isActive = isActiveLink(item.href);

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                className="w-full justify-start"
                                tooltip={item.title}
                            >
                                <Link
                                    href={normalizeHref(item.href)}
                                    className="flex items-center gap-2"
                                >
                                    {item.icon && <item.icon />}
                                    <span className="truncate">
                                        {item.title}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
