"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

export default function TeamSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [value, setValue] = useState(searchParams.get("search")?.toString() || "");

    const handleSearch = useCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        replace(`${pathname}?${params.toString()}`);
    }, [searchParams, pathname, replace]);

    // Simple debounce effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch(value);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [value, handleSearch]);

    return (
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search teams..."
                className="pl-8"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
