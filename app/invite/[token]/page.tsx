
import { createClient } from "@/lib/supabase/server";
import { getUserByAuthId } from "@/modules/users/user.service";
import { redirect } from "next/navigation";
import {
    acceptInvitationService,
    getInvitationByToken
} from "@/modules/invitation/invitation.service";
import {
    ExpiredInvitationCard,
    InvalidInvitationCard,
    InvitationAcceptedCard
} from "@/components/invitation/invitation-states";

interface InvitePageProps {
    params: Promise<{
        token: string;
    }>;
}

export default async function InvitePage({ params }: InvitePageProps) {
    const { token } = await params;

    const invitation = await getInvitationByToken(token);

    if (!invitation) {
        return <InvalidInvitationCard />;
    }

    if (new Date() > invitation.expiresAt) {
        return <ExpiredInvitationCard />;
    }

    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
        redirect(`/login?next=/invite/${token}`);
    }

    const user = await getUserByAuthId(authUser.id);

    if (!user) {
        return <div>User record not found. Please contact support.</div>;
    }

    await acceptInvitationService(invitation.id, user.id);

    return <InvitationAcceptedCard teamName={invitation.team.name} />;
}
