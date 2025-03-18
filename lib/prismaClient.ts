import { PrismaClient } from "@prisma/client";

// グローバル型の適切な定義方法
declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }
}

// グローバルな型参照のため、ここもanyにキャストする必要があるかもしれません
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// シングルトンインスタンスの作成
const prismaClient = globalForPrisma.prisma || new PrismaClient();

// 開発環境でのみグローバル変数にセット
if (process.env.NODE_ENV === "development")
  globalForPrisma.prisma = prismaClient;

export default prismaClient;
