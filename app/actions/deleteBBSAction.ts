"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prismaClient";
import { redirect } from "next/navigation";
export const deleteBBS = async (formData: FormData) => {
  try {
    const bbsId = formData.get("bbsId") as string;
    const id = parseInt(bbsId);

    if (isNaN(id)) {
      throw new Error("無効なID形式です");
    }

    await prisma.post.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("投稿の削除に失敗しました:", error);
    throw new Error("投稿の削除に失敗しました");
  }

  // redirectはtry/catchブロックの外で呼び出す
  redirect("/");
};
