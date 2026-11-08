import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.POSTGRES_PRISMA_URL;
if (!connectionString) {
  throw new Error('POSTGRES_PRISMA_URL is required to connect to the database.');
}

const adapter = new PrismaPg({ connectionString });

const globalForPrisma = globalThis;

const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

export default db;