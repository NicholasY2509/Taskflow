import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 md:pl-72">
                <div className="container py-6 md:py-8 px-4 md:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
