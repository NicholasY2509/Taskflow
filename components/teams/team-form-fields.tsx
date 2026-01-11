import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";

interface TeamFormFieldsProps {
    mode: "create" | "update";
    onOpenChange: (open: boolean) => void;
    form: {
        register: any;
        handleSubmit: any;
        errors: any;
        isSubmitting: boolean;
        onSubmit: (data: any) => void;
    };
}

export default function TeamFormFields({
    mode,
    onOpenChange,
    form,
}: TeamFormFieldsProps) {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
    } = form;

    const isUpdate = mode === "update";

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
        >
            <div>
                <Label required>Team Name</Label>
                <Input
                    {...register("name")}
                    placeholder="Team name..."
                    error={errors.name?.message}
                />
            </div>

            <div>
                <Label>Team Description</Label>
                <Textarea
                    {...register("description")}
                    placeholder="Team description..."
                    error={errors.description?.message}
                />
            </div>

            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    type="button"
                    onClick={() => onOpenChange(false)}
                >
                    Cancel
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader className="w-4 h-4 animate-spin mr-2" />
                            {isUpdate ? "Updating..." : "Creating..."}
                        </>
                    ) : (
                        isUpdate ? "Update Team" : "Create Team"
                    )}
                </Button>
            </div>
        </form>
    );
}
