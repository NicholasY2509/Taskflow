import { Suspense } from "react";
import TeamsList from "@/components/pages/teams/teams-list";
import TeamsSkeleton from "@/components/pages/teams/teams-skeleton";
import TeamsView from "@/components/pages/teams/teams-view";

export default function TeamPage() {
    return (
        <TeamsView>
            <Suspense fallback={<TeamsSkeleton />}>
                <TeamsList />
            </Suspense>
        </TeamsView>
    );
}