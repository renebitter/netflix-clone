// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query'],
//   });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// export default prisma;

// "global" is not affected by hot-reloading(during development)
// const client = global.prismadb || new PrismaClient();

// if (process.env.NODE_ENV === 'production') global.prismadb = client;

// export default client;

import { PrismaClient } from '@prisma/client';

const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prismadb = client;

export default client;
