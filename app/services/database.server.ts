import { PrismaClient } from '@prisma/client';

interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma ?? new PrismaClient();

/**
 * Store PrismaClient as a global variable in development to prevent hot
 * reloads from creating new (unwanted) instances.
 */
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
