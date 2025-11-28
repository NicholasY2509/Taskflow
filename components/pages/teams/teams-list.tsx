import { getTeams } from "@/modules/teams/team.data";
import TeamsGrid from "./teams-grid";

export default async function TeamsList() {
    const teams = await getTeams();
    return (<TeamsGrid initialTeams={teams} />);
}