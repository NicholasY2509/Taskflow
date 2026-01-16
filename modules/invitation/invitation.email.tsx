
import { InvitationEmail } from "./templates/invitation-email";

export async function renderInvitationEmail(
    inviteLink: string,
    teamName: string,
    inviterName: string
) {
    const { renderToStaticMarkup } = await import("react-dom/server");
    return renderToStaticMarkup(
        <InvitationEmail
            inviteLink={inviteLink}
            teamName={teamName}
            inviterName={inviterName}
        />
    );
}
