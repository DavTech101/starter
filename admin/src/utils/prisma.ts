import { PrismaClient } from '@prisma/client';

//##########################################################################################
// PRISMA TYPE
//##########################################################################################
declare global {
  var prisma: PrismaClient | undefined;
}

//##########################################################################################
// PRISMA CLIENT
//##########################################################################################
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') globalThis.prisma = prisma;

export default prisma;
