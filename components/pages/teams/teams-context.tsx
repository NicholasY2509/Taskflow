"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Team } from "@/prisma/generated/client";

interface TeamWithCounts extends Team {
    projectCount: number;
    memberCount: number;
}

interface TeamsContextType {
    isFormOpen: boolean;
    openCreateModal: () => void;
    openEditModal: (team: TeamWithCounts) => void;
    closeModal: () => void;
    editingTeam: TeamWithCounts | undefined;
}

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

export function TeamsProvider({ children }: { children: ReactNode }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTeam, setEditingTeam] = useState<TeamWithCounts | undefined>(undefined);

    const openCreateModal = () => {
        setEditingTeam(undefined);
        setIsFormOpen(true);
    };

    const openEditModal = (team: TeamWithCounts) => {
        setEditingTeam(team);
        setIsFormOpen(true);
    };

    const closeModal = () => {
        setIsFormOpen(false);
        setEditingTeam(undefined);
    };

    return (
        <TeamsContext.Provider value={{ isFormOpen, openCreateModal, openEditModal, closeModal, editingTeam }}>
            {children}
        </TeamsContext.Provider>
    );
}

export function useTeams() {
    const context = useContext(TeamsContext);
    if (context === undefined) {
        throw new Error("useTeams must be used within a TeamsProvider");
    }
    return context;
}
