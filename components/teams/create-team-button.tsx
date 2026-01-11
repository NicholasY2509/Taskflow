"use client"

import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useTeams } from '@/context/teams-context'

const CreateTeamButton = () => {
    const { openCreateModal } = useTeams()

    return (
        <Button variant="outline" className="h-full min-h-[180px] rounded-lg text-primary hover:bg-primary/5
                flex flex-col gap-2 border-dashed hover:border-primary" onClick={openCreateModal}>
            <Plus className="h-8 w-8" />
            <span>Create New Team</span>
        </Button>)
}

export default CreateTeamButton