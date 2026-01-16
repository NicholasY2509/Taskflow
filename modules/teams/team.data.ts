"use server";

import { getTeamsService, getTeamService } from "./team.service";

export async function getTeams(query?: string) {
    const teams = await getTeamsService(query);

    return teams.map((team) => ({
        ...team,
        memberCount: team._count.members,
        projectCount: team._count.projects,
    }));
}

export async function getTeamById(id: string) {
    const team = await getTeamService(id);

    return team;
}
