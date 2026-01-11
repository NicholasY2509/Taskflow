"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import TeamFormModal from "@/components/teams/team-form-modal";
import { useTeams } from "../../context/teams-context";
import { ReactNode } from "react";

export default function TeamsView({ children }: { children: ReactNode }) {
    const { isFormOpen, closeModal, editingTeam, openCreateModal } = useTeams();

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your teams, members, and permissions.
                        </p>
                    </div>
                    <Button onClick={openCreateModal}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Team
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search teams..."
                            className="pl-8"
                        />
                    </div>
                </div>
                {children}
            </div>
            <TeamFormModal
                open={isFormOpen}
                onOpenChange={(open) => !open && closeModal()}
                teamId={editingTeam?.id}
                initialData={editingTeam ? {
                    name: editingTeam.name,
                    description: editingTeam.description || undefined,
                } : undefined}
            />
        </>
    );
}
