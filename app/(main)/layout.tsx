import AppLayoutTemplate from "@/components/layout/app-layout-template";
import { BreadcrumbItem } from "@/types/layout";
import { Separator } from "@radix-ui/react-separator";

export default function DashboardLayout({
    children,
    breadcrumbs,
    ...props
}: {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}) {
    return (
        <AppLayoutTemplate
            breadcrumbs={breadcrumbs}
            {...props}
        >
            <div className="p-4">
                {children}
            </div>
        </AppLayoutTemplate>
    );
}
