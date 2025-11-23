
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { id, email, name } = await req.json();

        const exists = await prisma.user.findUnique({
            where: { authId: id },
        });

        if (exists) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 409 }
            );
        }

        const newUser = await prisma.user.create({
            data: {
                authId: id,
                email,
                name,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error: any) {
        console.error("🔥 PRISMA ERROR:", error);

        return NextResponse.json(
            { error: error.message ?? "Unknown database error" },
            { status: 500 }
        );
    }
}
