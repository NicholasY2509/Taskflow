import { createTeamAction, deleteTeamAction, updateTeamAction } from "@/modules/teams/team.action";
import { CreateTeamFormData, createTeamSchema, UpdateTeamFormData, updateTeamSchema } from "@/modules/teams/team.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type TeamFormMode = "create" | "update";

interface UseTeamFormOptions {
    mode: TeamFormMode;
    teamId?: string;
    initialData?: Partial<UpdateTeamFormData>;
    onSuccess?: () => void;
}

export const useTeamForm = ({
    mode,
    teamId,
    initialData,
    onSuccess,
}: UseTeamFormOptions) => {
    const isUpdate = mode === "update";

    const form = useForm<
        typeof isUpdate extends true
        ? UpdateTeamFormData
        : CreateTeamFormData
    >({
        resolver: zodResolver(isUpdate ? updateTeamSchema : createTeamSchema),
        defaultValues: isUpdate
            ? { ...initialData, id: teamId }
            : undefined,
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = form;

    const onSubmit = async (data: any) => {
        try {
            const result = isUpdate
                ? await updateTeamAction(data)
                : await createTeamAction(data);

            if (result?.error) {
                Object.entries(result.error).forEach(([key, value]) => {
                    setError(key as any, {
                        type: "manual",
                        message: String(value),
                    });
                });
                return;
            }

            toast.success(
                isUpdate
                    ? "Team updated successfully!"
                    : "Team created successfully!"
            );

            onSuccess?.();
            reset();
        } catch {
            toast.error(
                isUpdate
                    ? "Failed to update team."
                    : "Failed to create team."
            );
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
    };
};


export const useDeleteTeam = () => {
    const [isDeleting, setIsDeleting] = useState(false);

    const onDelete = async (teamId: string) => {
        setIsDeleting(true);
        try {
            const result = await deleteTeamAction(teamId);
            if (result?.error) {
                toast.error(String(result.error.root) || "Failed to delete team");
                return;
            }
            toast.success("Team deleted successfully");
        } catch (error) {
            toast.error("Failed to delete team");
        } finally {
            setIsDeleting(false);
        }
    };

    return { onDelete, isDeleting };
};