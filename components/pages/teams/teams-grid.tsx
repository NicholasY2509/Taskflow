"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TeamCard from "@/components/pages/teams/team-card";
import { Team } from "@/prisma/generated/client";
import { useTeams } from "./teams-context";

interface TeamWithCounts extends Team {
    projectCount: number;
    memberCount: number;
}

interface TeamsGridProps {
    initialTeams: TeamWithCounts[];
}

export default function TeamsGrid({ initialTeams }: TeamsGridProps) {
    const { openEditModal, openCreateModal } = useTeams();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialTeams.map((team) => (
                <TeamCard key={team.id} team={team} onEdit={openEditModal} />
            ))}

            <Button variant="outline" className="h-full min-h-[180px] rounded-lg text-primary hover:bg-primary/5
                flex flex-col gap-2 border-dashed hover:border-primary" onClick={openCreateModal}>
                <Plus className="h-8 w-8" />
                <span>Create New Team</span>
            </Button>
        </div>
    );
}
