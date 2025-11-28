"use server";

import { prisma } from "@/lib/prisma";

export async function createUserService({ authId, email, name }: {
    authId: string;
    email: string;
    name: string;
}) {
    const exists = await prisma.user.findUnique({
        where: { authId },
    });

    if (exists) return exists;

    return prisma.user.create({
        data: { authId, email, name },
    });
}

export async function getUserByAuthId(authId: string) {
    return prisma.user.findUnique({
        where: { authId },
    });
}
