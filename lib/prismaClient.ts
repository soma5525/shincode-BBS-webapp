import { PrismaClient } from "@prisma/client";

declare global {
  // グローバル型定義には let を使用 (ESLintはここを検出している可能性あり)
  // eslint-disable-next-line no-var
  let prisma: PrismaClient | undefined;
}

// ここでシングルトンパターンを使用
const prismaClient = global.prisma || new PrismaClient();

// 開発環境では同じインスタンスを再利用
if (process.env.NODE_ENV === "development") global.prisma = prismaClient;

export default prismaClient;
