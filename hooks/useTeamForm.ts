import { createTeamAction, deleteTeamAction, updateTeamAction } from "@/modules/teams/team.action";
import { CreateTeamFormData, createTeamSchema, UpdateTeamFormData, updateTeamSchema } from "@/modules/teams/team.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useTeamForm = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<CreateTeamFormData>({
        resolver: zodResolver(createTeamSchema),
    });

    const onSubmit = async (validatedData: CreateTeamFormData) => {
        try {
            const result = await createTeamAction(validatedData);

            if (result?.error) {
                Object.entries(result.error).forEach(([key, value]) => {
                    setError(key as any, { type: "manual", message: String(value) });
                });
                return;
            }

            toast.success("Team created successfully!");
            onSuccess?.();
            reset();
        } catch (error) {
            toast.error("Failed to create team. Please try again later.");
            setError("root", {
                type: "manual",
                message: "Failed to create team. Please try again later.",
            });
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
    };
}

export const useUpdateTeamForm = (teamId: string, initialData?: Partial<UpdateTeamFormData>, onSuccess?: () => void) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        setValue,
        reset
    } = useForm<UpdateTeamFormData>({
        resolver: zodResolver(updateTeamSchema),
        defaultValues: { ...initialData, id: teamId },
    });

    const onSubmit = async (validatedData: UpdateTeamFormData) => {
        try {
            const result = await updateTeamAction(validatedData);

            if (result?.error) {
                Object.entries(result.error).forEach(([key, value]) => {
                    setError(key as any, { type: "manual", message: String(value) });
                });
                return;
            }

            toast.success("Team updated successfully!");
            onSuccess?.();
            reset();
        } catch (error) {
            toast.error("Failed to update team. Please try again later.");
            setError("root", {
                type: "manual",
                message: "Failed to update team. Please try again later.",
            });
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        setValue,
    };
}

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