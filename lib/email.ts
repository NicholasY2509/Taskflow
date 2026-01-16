import { Resend } from "resend";

export const sendEmail = async (
    to: string,
    subject: string,
    html: string
) => {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        throw new Error("RESEND_API_KEY is not set");
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
        from: "Taskflow <onboarding@resend.dev>",
        to,
        subject,
        html,
    });

    console.log("Resend response:", result);

    return result;
};
