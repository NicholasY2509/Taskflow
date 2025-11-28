import { Skeleton } from "@/components/ui/skeleton";

export default function TeamsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="flex flex-col space-y-1.5 p-6 pb-3">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2 w-full">
                                <Skeleton className="h-5 w-1/2" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                            <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                    </div>
                    <div className="p-6 pb-3">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="flex -space-x-2 overflow-hidden mt-4">
                            <Skeleton className="h-8 w-8 rounded-full border-2 border-background" />
                            <Skeleton className="h-8 w-8 rounded-full border-2 border-background" />
                            <Skeleton className="h-8 w-8 rounded-full border-2 border-background" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
