"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, MoreVertical, Users, Folder } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data for visualization
const MOCK_TEAMS = [
    {
        id: "1",
        name: "Engineering",
        description: "The core engineering team responsible for the platform.",
        members: [
            { id: "1", name: "Alice", avatar: "/avatars/01.png" },
            { id: "2", name: "Bob", avatar: "/avatars/02.png" },
            { id: "3", name: "Charlie", avatar: "/avatars/03.png" },
        ],
        projectCount: 12,
        memberCount: 8,
    },
    {
        id: "2",
        name: "Design",
        description: "Creative minds behind the UI/UX of our products.",
        members: [
            { id: "4", name: "Diana", avatar: "/avatars/04.png" },
            { id: "5", name: "Ethan", avatar: "/avatars/05.png" },
        ],
        projectCount: 5,
        memberCount: 4,
    },
    {
        id: "3",
        name: "Marketing",
        description: "Spreading the word and managing campaigns.",
        members: [
            { id: "6", name: "Fiona", avatar: "/avatars/06.png" },
        ],
        projectCount: 3,
        memberCount: 6,
    },
];

export default function TeamPage() {
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your teams, members, and permissions.
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Team
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search teams..."
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_TEAMS.map((team) => (
                    <Card key={team.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{team.name}</CardTitle>
                                    <CardDescription className="line-clamp-2 mt-1">
                                        {team.description}
                                    </CardDescription>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreVertical className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Manage Members</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">Delete Team</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Folder className="h-4 w-4" />
                                    <span>{team.projectCount} Projects</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    <span>{team.memberCount} Members</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex -space-x-2 overflow-hidden">
                                {team.members.map((member) => (
                                    <Avatar key={member.id} className="inline-block border-2 border-background h-8 w-8">
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                                    </Avatar>
                                ))}
                                {team.memberCount > team.members.length && (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                                        +{team.memberCount - team.members.length}
                                    </div>
                                )}
                            </div>
                        </CardFooter>
                    </Card>
                ))}

                {/* New Team Card Placeholder (Optional, encourages action) */}
                <Button variant="outline" className="h-full min-h-[180px] flex flex-col gap-2 border-dashed hover:border-primary hover:bg-accent/50">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                    <span className="text-muted-foreground font-medium">Create New Team</span>
                </Button>
            </div>
        </div>
    );
}