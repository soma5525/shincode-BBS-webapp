"use server";

import prisma from "@/lib/prismaClient";

// 全投稿の取得
export const getAllPost = async () => {
  try {
    return await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("投稿一覧の取得に失敗しました:", error);
    throw new Error("投稿一覧の取得に失敗しました");
  }
};

// IDによる投稿の取得
export const getPostById = async (bbsId: string) => {
  try {
    const id = parseInt(bbsId);
    if (isNaN(id)) {
      throw new Error("無効なID形式です");
    }
    const bbsDetailData = await prisma.post.findUnique({
      where: { id },
    });
    if (!bbsDetailData) {
      throw new Error("投稿が見つかりませんでした");
    }
    return bbsDetailData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("投稿の取得に失敗しました");
  }
};
