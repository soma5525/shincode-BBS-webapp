import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();
// Use a single prisma instance across hot reloads in development
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
