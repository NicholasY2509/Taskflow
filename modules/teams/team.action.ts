"use server";

import { createClient } from "@/lib/supabase/server";
import { createTeamSchema, updateTeamSchema } from "./team.schema";
import { createTeamService, deleteTeamService, updateTeamService } from "./team.service";
import { revalidatePath } from "next/cache";

import { getUserByAuthId } from "../users/user.service";

export async function createTeamAction(input: unknown) {
    const parsed = createTeamSchema.safeParse(input);
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

    try {
        await createTeamService({
            data: parsed.data,
            userId: user.id,
        });
        revalidatePath("/teams");
        return { success: true };
    } catch (error) {
        console.error("Failed to create team:", error);
        return { error: { root: "Failed to create team" } };
    }
}

export async function updateTeamAction(input: unknown) {
    const parsed = updateTeamSchema.safeParse(input);
    if (!parsed.success) {
        return {
            error: parsed.error.flatten().fieldErrors,
        };
    }

    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return { error: { root: "Unauthorized" } };
    }

    try {
        await updateTeamService({
            data: parsed.data,
        });
        revalidatePath("/teams");
        return { success: true };
    } catch (error) {
        return { error: { root: "Failed to update team" } };
    }
}

export async function deleteTeamAction(teamId: string) {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return { error: { root: "Unauthorized" } };
    }

    try {
        await deleteTeamService(teamId);
        revalidatePath("/teams");
        return { success: true };
    } catch (error) {
        return { error: { root: "Failed to delete team" } };
    }
}
