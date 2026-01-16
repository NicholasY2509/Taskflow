"use server";

import { createClient } from "@/lib/supabase/server";
import { inviteMemberSchema } from "./invitation.schema";
import { sendEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";
import { getUserByAuthId } from "../users/user.service";
import { createInvitationService } from "./invitation.service";
import { getTeamService } from "../teams/team.service";
import { renderInvitationEmail } from "./invitation.email";

export async function inviteMemberAction(input: unknown) {
    const parsed = inviteMemberSchema.safeParse(input);
    if (!parsed.success) {
        return {
            error: parsed.error.flatten().fieldErrors,
        };
    }

    const supabase = await createClient();
    const { data: { user: authUser }, error } = await supabase.auth.getUser();

    if (error || !authUser) {
        return { error: { root: "Unauthorized" } };
    }

    const user = await getUserByAuthId(authUser.id);
    if (!user) {
        return { error: { root: "User not found" } };
    }

    const team = await getTeamService(parsed.data.teamId);
    if (!team) {
        return { error: { root: "Team not found" } };
    }

    try {
        const invitation = await createInvitationService({
            ...parsed.data,
            inviterId: user.id,
        });

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const inviteLink = `${baseUrl}/invite/${invitation.token}`;

        const emailHtml = await renderInvitationEmail(
            inviteLink,
            team.name,
            user.name || user.email
        );

        await sendEmail(
            parsed.data.email,
            `You have been invited to join ${team.name} on Taskflow`,
            emailHtml
        );

        console.log("Invitation sent to:", parsed.data.email);
        console.log("Invitation link:", inviteLink);
        console.log("Team name:", team.name);
        console.log("Inviter name:", user.name || user.email);

        revalidatePath("/teams");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to invite member:", error);
        return { error: { root: error.message || "Failed to invite member" } };
    }
}
