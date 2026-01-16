import { Suspense } from "react";
import TeamsView from "@/components/teams/teams-view";
import TeamsList from "@/components/teams/teams-list";
import TeamsSkeleton from "@/components/teams/teams-skeleton";

export default async function TeamPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
    const { search } = await searchParams;
    return (
        <TeamsView>
            <Suspense fallback={<TeamsSkeleton />}>
                <TeamsList query={search} />
            </Suspense>
        </TeamsView>
    );
}