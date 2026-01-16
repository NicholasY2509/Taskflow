
import { z } from "zod";

export const inviteMemberSchema = z.object({
    email: z.string().email(),
    teamId: z.string().min(1),
    role: z.enum(["ADMIN", "MANAGER", "STAFF", "CLIENT"]),
});

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
