"use client";

import { create } from "zustand";
import { Team } from "@/prisma/generated/client";

interface TeamWithCounts extends Team {
    projectCount: number;
    memberCount: number;
}

interface TeamsState {
    isFormOpen: boolean;
    editingTeam: TeamWithCounts | undefined;
    openCreateModal: () => void;
    openEditModal: (team: TeamWithCounts) => void;
    closeModal: () => void;
}

export const useTeams = create<TeamsState>((set) => ({
    isFormOpen: false,
    editingTeam: undefined,
    openCreateModal: () => set({ isFormOpen: true, editingTeam: undefined }),
    openEditModal: (team) => set({ isFormOpen: true, editingTeam: team }),
    closeModal: () => set({ isFormOpen: false, editingTeam: undefined }),
}));

