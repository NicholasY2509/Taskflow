
import { BreadcrumbItem } from '@/types/layout';
import { type PropsWithChildren } from 'react';
import { AppSidebarHeader } from './app-sidebar-header';
import { AppContent } from './app-content';
import { AppSidebar } from './app-sidebar';
import { AppShell } from './app-shell';

export default function AppLayoutTemplate({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
