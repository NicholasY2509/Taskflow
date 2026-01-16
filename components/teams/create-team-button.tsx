"use client";

import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import TeamFormModal from './team-form-modal'

export default function CreateTeamButton() {
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <>
            <Button
                variant="default"
                onClick={() => setIsFormOpen(true)}
            >
                <Plus className="h-8 w-8" />
                <span>Create New Team</span>
            </Button>

            <TeamFormModal
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
            />
        </>
    )
}