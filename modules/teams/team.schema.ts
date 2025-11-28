import z from "zod";

export const createTeamSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    description: z.string().optional(),
});

export const updateTeamSchema = createTeamSchema.partial().extend({
    id: z.string(),
});

export type CreateTeamFormData = z.infer<typeof createTeamSchema>;
export type UpdateTeamFormData = z.infer<typeof updateTeamSchema>;
