import { getTeams } from "@/modules/teams/team.data";
import TeamCard from "./team-card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useTeams } from "@/context/teams-context";
import CreateTeamButton from "./create-team-button";

export default async function TeamsList() {
    const teams = await getTeams();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
            ))}

            <CreateTeamButton />
        </div>
    );
}