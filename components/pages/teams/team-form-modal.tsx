import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTeamForm, useUpdateTeamForm } from "@/hooks/useTeamForm";
import { UpdateTeamFormData } from "@/modules/teams/team.schema";
import { Plus, Save } from "lucide-react";
import TeamFormFields from "./team-form-fields";

interface TeamFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    teamId?: string;
    initialData?: Partial<UpdateTeamFormData>;
}

export default function TeamFormModal({ open, onOpenChange, teamId, initialData }: TeamFormProps) {
    const isUpdate = Boolean(teamId);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isUpdate ? "Update Team" : "Create Team"}</DialogTitle>
                </DialogHeader>

                {isUpdate ? (
                    <TeamFormFields
                        mode="update"
                        hook={() => useUpdateTeamForm(teamId!, initialData)}
                        onOpenChange={onOpenChange}
                        submitLabel="Update Team"
                        loadingText="Updating..."
                    />
                ) : (
                    <TeamFormFields
                        mode="create"
                        hook={() =>
                            useTeamForm({
                                onSuccess: () => onOpenChange(false),
                            })
                        }
                        onOpenChange={onOpenChange}
                        submitLabel="Create Team"
                        loadingText="Creating..."
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}


