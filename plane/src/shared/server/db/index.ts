import { isLocal } from '@shared/config';
import { PrismaClient } from '@prisma/client';

//##########################################################################################
// PRISMA CLIENT SINGLETON
//##########################################################################################
const prismaClientSingleton = () => {
  return new PrismaClient();
};

//##########################################################################################
// GLOBAL THIS PRISMA CLIENT TYPE
//##########################################################################################
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

//##########################################################################################
// PRISMA CLIENT
//##########################################################################################
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

//##########################################################################################
// DEVELOPMENT ENVIRONMENT PRISMA CLIENT
//##########################################################################################
if (isLocal) globalThis.prismaGlobal = prisma;
