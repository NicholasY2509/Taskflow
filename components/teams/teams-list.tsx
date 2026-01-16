import { getTeams } from "@/modules/teams/team.data";
import TeamsGrid from "./teams-grid";

export default async function TeamsList({ query }: { query?: string }) {
    const teams = await getTeams(query);

    return <TeamsGrid teams={teams} />;
}
