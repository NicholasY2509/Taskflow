import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTeamForm } from "@/hooks/useTeamForm";
import { UpdateTeamFormData } from "@/modules/teams/team.schema";
import TeamFormFields from "./team-form-fields";

interface TeamFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    teamId?: string;
    initialData?: Partial<UpdateTeamFormData>;
}

export default function TeamFormModal({ open, onOpenChange, teamId, initialData }: TeamFormProps) {
    const isUpdate = Boolean(teamId);

    const form = useTeamForm({
        mode: isUpdate ? "update" : "create",
        teamId,
        initialData,
        onSuccess: () => onOpenChange(false)
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isUpdate ? "Update Team" : "Create Team"}</DialogTitle>
                </DialogHeader>
                <TeamFormFields
                    form={form}
                    mode={isUpdate ? "update" : "create"}
                    onOpenChange={onOpenChange}
                />
            </DialogContent>
        </Dialog>
    );
}


