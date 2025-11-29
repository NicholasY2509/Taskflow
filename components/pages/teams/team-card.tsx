import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical, Folder, Users } from "lucide-react";
import { Team } from "@/prisma/generated/client";

interface TeamWithCounts extends Team {
    projectCount: number;
    memberCount: number;
}

interface ComponentProps {
    team: TeamWithCounts;
    onEdit: (team: TeamWithCounts) => void;
}

export default function TeamCard({ team, onEdit }: ComponentProps) {
    return (
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
                            <DropdownMenuItem onClick={() => onEdit(team)}>Edit Team</DropdownMenuItem>
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
                {/* <div className="flex -space-x-2 overflow-hidden">
                    {team.members?.map((member) => (
                        <Avatar key={member.id} className="inline-block border-2 border-background h-8 w-8">
                            <AvatarImage src={member.user.avatar} alt={member.user.name} />
                            <AvatarFallback>{member.user.name[0]}</AvatarFallback>
                        </Avatar>
                    ))}
                    {team.members?.length !== undefined && team.memberCount > team.members?.length && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                            +{team.memberCount - team.members?.length}
                        </div>
                    )}
                </div> */}
            </CardFooter>
        </Card>
    )
}