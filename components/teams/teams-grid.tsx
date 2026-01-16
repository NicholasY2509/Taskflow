import { Team } from "@/prisma/generated/client";
import TeamCard from "./team-card";
import CreateTeamButton from "./create-team-button";

interface TeamWithCounts extends Team {
    projectCount: number;
    memberCount: number;
}

interface TeamsGridProps {
    teams: TeamWithCounts[];
}

export default function TeamsGrid({ teams }: TeamsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
            ))}
        </div>
    );
}
