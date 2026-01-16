
import { prisma } from "@/lib/prisma";
import { InviteMemberInput } from "./invitation.schema";
import { randomBytes } from "crypto";

export const createInvitationService = async (input: InviteMemberInput & { inviterId: string }) => {
    const { email, teamId, role, inviterId } = input;

    const existingMember = await prisma.teamMember.findFirst({
        where: {
            teamId,
            user: {
                email: email,
            }
        },
    });

    if (existingMember) {
        throw new Error("User is already a member of this team");
    }

    const existingInvitation = await prisma.teamInvitation.findUnique({
        where: {
            teamId_email: {
                teamId,
                email,
            },
        },
    });

    if (existingInvitation) {
        const token = randomBytes(32).toString("hex");
        return await prisma.teamInvitation.update({
            where: { id: existingInvitation.id },
            data: {
                token,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                role, // Update role if changed
            }
        });
    }

    const token = randomBytes(32).toString("hex");
    return await prisma.teamInvitation.create({
        data: {
            email,
            teamId,
            role,
            inviterId,
            token,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
    });
};

export const getInvitationByToken = async (token: string) => {
    return await prisma.teamInvitation.findUnique({
        where: { token },
        include: {
            team: true,
            inviter: true,
        },
    });
};

export const acceptInvitationService = async (invitationId: string, userId: string) => {
    const invitation = await prisma.teamInvitation.findUnique({
        where: { id: invitationId },
    });

    if (!invitation) {
        throw new Error("Invitation not found");
    }

    // Check if user is already a member
    const existingMember = await prisma.teamMember.findUnique({
        where: {
            userId_teamId: {
                userId,
                teamId: invitation.teamId,
            },
        },
    });

    if (existingMember) {
        // If already a member, just delete the invitation
        await prisma.teamInvitation.delete({
            where: { id: invitationId },
        });
        return;
    }

    // Transaction to add member and delete invitation
    try {
        await prisma.$transaction([
            prisma.teamMember.create({
                data: {
                    teamId: invitation.teamId,
                    userId: userId,
                    role: invitation.role,
                },
            }),
            prisma.teamInvitation.delete({
                where: { id: invitationId },
            }),
        ]);
    } catch (error: any) {
        // P2002: Unique constraint failed
        // This handles the race condition where the user was added just after our check
        if (error.code === 'P2002') {
            // Check if invitation still exists and delete it if so
            // We use deleteMany to avoid error if it's already gone
            await prisma.teamInvitation.deleteMany({
                where: { id: invitationId },
            });
            return;
        }
        throw error;
    }
};
