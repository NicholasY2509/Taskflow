
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InvitationCardProps {
    title: string;
    description: React.ReactNode;
    icon: React.ElementType;
    iconColor?: string;
    actionLabel?: string;
    actionLink?: string;
    children?: React.ReactNode;
}

const InvitationCard = ({
    title,
    description,
    icon: Icon,
    iconColor = "text-primary",
    actionLabel = "Go Home",
    actionLink = "/",
    children
}: InvitationCardProps) => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-muted/20">
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <Icon className={`h-12 w-12 ${iconColor}`} />
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription className="text-base mt-2">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children || (
                    <Link href={actionLink} className="w-full">
                        <Button className="w-full" size="lg">
                            {actionLabel}
                        </Button>
                    </Link>
                )}
            </CardContent>
        </Card>
    </div>
);

export const InvalidInvitationCard = () => (
    <InvitationCard
        title="Invalid Invitation"
        description="This invitation link is invalid or has expired."
        icon={XCircle}
        iconColor="text-destructive"
    />
);

export const ExpiredInvitationCard = () => (
    <InvitationCard
        title="Invitation Expired"
        description="This invitation link has expired. Please ask for a new invitation."
        icon={XCircle}
        iconColor="text-destructive"
    />
);

export const InvitationAcceptedCard = ({ teamName }: { teamName: string }) => (
    <InvitationCard
        title="Invitation Accepted"
        description={
            <>
                You have successfully joined <strong>{teamName}</strong>.
            </>
        }
        icon={CheckCircle}
        iconColor="text-green-600"
        actionLabel="View Team"
        actionLink="/teams"
    />
);
