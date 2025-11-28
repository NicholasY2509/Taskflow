"use server";

import { CreateTeamFormData, UpdateTeamFormData } from "./team.schema";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { Role } from "@/prisma/generated/client";
import { getUserByAuthId } from "../users/user.service";

export async function getTeamsService() {
    const supabase = await createClient();
    const { data: { user: authUser }, error } = await supabase.auth.getUser();

    if (error || !authUser) {
        return [];
    }

    const user = await getUserByAuthId(authUser.id);
    if (!user) {
        return [];
    }

    const teams = await prisma.team.findMany({
        where: {
            members: {
                some: {
                    userId: user.id,
                },
            },
        },
        include: {
            _count: {
                select: {
                    members: true,
                    projects: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return teams;
}

export async function getTeamService(teamId: string) {
    return await prisma.team.findUnique({
        where: { id: teamId },
    });
}

export async function createTeamService({ data, userId }: { data: CreateTeamFormData; userId: string }) {
    return await prisma.team.create({
        data: {
            name: data.name,
            description: data.description,
            members: {
                create: {
                    userId,
                    role: Role.ADMIN,
                },
            },
        },
    });
}

export async function updateTeamService({ data }: { data: UpdateTeamFormData }) {
    const { id, ...rest } = data;
    return await prisma.team.update({
        where: { id },
        data: rest,
    });
}

export async function deleteTeamService(teamId: string) {
    return await prisma.team.delete({
        where: { id: teamId },
    });
}

export async function getTeamMemberService(teamId: string, userId: string) {
    return await prisma.teamMember.findUnique({
        where: {
            userId_teamId: {
                userId,
                teamId,
            },
        },
    });
}