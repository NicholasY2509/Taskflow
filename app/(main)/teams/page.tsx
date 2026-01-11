import { Suspense } from "react";
import TeamsList from "@/components/teams/teams-list";
import TeamsSkeleton from "@/components/teams/teams-skeleton";
import TeamsView from "@/components/teams/teams-view";

export default function TeamPage() {
    return (
        <TeamsView>
            <Suspense fallback={<TeamsSkeleton />}>
                <TeamsList />
            </Suspense>
        </TeamsView>
    );
}