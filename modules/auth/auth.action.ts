"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { registerSchema } from "./auth.scema";
import { createUserService } from "../users/user.service";

export async function signupAction(input: unknown) {
    const parsed = registerSchema.safeParse(input);
    if (!parsed.success) {
        return {
            error: parsed.error.flatten().fieldErrors,
        };
    }

    const data = parsed.data;
    const supabase = await createClient();

    // Create Supabase auth user
    const { data: auth, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: { name: data.name },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
        },
    });

    if (authError) {
        return { error: { root: authError.message } };
    }

    const user = auth.user;

    if (!user) {
        return { error: { root: "Supabase user missing after signup" } };
    }

    await createUserService({
        authId: user.id,
        email: user.email!,
        name: user.user_metadata.name ?? "",
    });

    return { success: true };
}
