import React from "react";

interface InvitationEmailProps {
    inviteLink: string;
    teamName?: string;
    inviterName?: string;
}

export const InvitationEmail: React.FC<InvitationEmailProps> = ({
    inviteLink,
    teamName = "a team",
    inviterName,
}) => {
    return (
        <div style={{
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f9fafb",
            padding: "40px 20px",
            color: "#374151",
            lineHeight: "1.6",
        }}>
            <div style={{
                maxWidth: "600px",
                margin: "0 auto",
                backgroundColor: "#ffffff",
                padding: "32px",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
            }}>
                <h2 style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "24px",
                    marginTop: "0",
                    textAlign: "center",
                }}>
                    Join {teamName} on Taskflow
                </h2>

                <p style={{ fontSize: "16px", marginBottom: "24px" }}>
                    Hello,
                </p>

                <p style={{ fontSize: "16px", marginBottom: "24px" }}>
                    {inviterName ? <strong>{inviterName}</strong> : "Someone"} has invited you to join the team <strong>{teamName}</strong> on Taskflow.
                </p>

                <div style={{ textAlign: "center", margin: "32px 0" }}>
                    <a
                        href={inviteLink}
                        style={{
                            display: "inline-block",
                            backgroundColor: "#000000",
                            color: "#ffffff",
                            padding: "12px 24px",
                            fontSize: "16px",
                            fontWeight: "500",
                            borderRadius: "6px",
                            textDecoration: "none",
                        }}
                    >
                        Accept Invitation
                    </a>
                </div>

                <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "32px", textAlign: "center" }}>
                    If you were not expecting this invitation, you can simply ignore this email.
                </p>

                <div style={{ marginTop: "32px", borderTop: "1px solid #e5e7eb", paddingTop: "24px", textAlign: "center" }}>
                    <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0" }}>
                        © {new Date().getFullYear()} Taskflow. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};
