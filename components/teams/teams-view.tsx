import { ReactNode } from "react";
import CreateTeamButton from "@/components/teams/create-team-button";
import TeamSearch from "@/components/teams/team-search";

interface TeamsViewProps {
    children: ReactNode;
}

export default function TeamsView({ children }: TeamsViewProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your teams, members, and permissions.
                    </p>
                </div>
                <CreateTeamButton />
            </div>

            <div className="flex items-center gap-2">
                <TeamSearch />
            </div>
            {children}
        </div>
    );
}
