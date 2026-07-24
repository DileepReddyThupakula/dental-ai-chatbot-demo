import { PrismaClient } from "@prisma/client";
import { validateEnv } from "./env";

// Validate env vars on client initialization
validateEnv();

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
