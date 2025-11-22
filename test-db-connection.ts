import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    try {
        const data = await prisma.role.findMany({ take: 1 });
        console.log("Prisma connection successful! Found data:", data);
    } catch (e) {
        console.error("Prisma connection failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();