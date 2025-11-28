import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";

interface ComponentProps {
    mode: "create" | "update";
    hook: any;
    onOpenChange: (open: boolean) => void;
    submitLabel: string;
    loadingText: string;
}

export default function TeamFormFields({
    mode,
    hook,
    onOpenChange,
    submitLabel,
    loadingText,
}: ComponentProps) {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
    } = hook();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
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

            <div className="flex flex-row gap-2 justify-end">
                <Button variant="outline" className="" onClick={() => onOpenChange(false)} type="button">
                    Cancel
                </Button>

                <Button className="" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader className="w-4 h-4 animate-spin mr-2" />
                            {loadingText}
                        </>
                    ) : (
                        <>
                            {submitLabel}
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}