
import { inviteMemberAction } from "@/modules/invitation/invitation.action";
import { InviteMemberInput, inviteMemberSchema } from "@/modules/invitation/invitation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface UseInviteMemberOptions {
    teamId: string;
    onSuccess?: () => void;
}

export const useInviteMember = ({ teamId, onSuccess }: UseInviteMemberOptions) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<InviteMemberInput>({
        resolver: zodResolver(inviteMemberSchema),
        defaultValues: {
            teamId,
            email: "",
            role: "STAFF",
        },
    });

    const onSubmit: SubmitHandler<InviteMemberInput> = (values) => {
        startTransition(async () => {
            try {
                const result = await inviteMemberAction(values);

                if (result.error) {
                    if ('root' in result.error && typeof result.error.root === 'string') {
                        toast.error(result.error.root);
                    } else {
                        toast.error("Failed to send invitation");
                    }
                    return;
                }

                toast.success("Invitation sent successfully");
                onSuccess?.();
                form.reset();
            } catch (error) {
                toast.error("Something went wrong");
            }
        });
    };

    return {
        form,
        isPending,
        onSubmit: form.handleSubmit(onSubmit),
    };
};
