// 投稿の編集
"use server";

import { z } from "zod";
import { formSchema } from "../types/form";
import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const putBBS = async ({
  bbsId,
  username,
  title,
  content,
}: z.infer<typeof formSchema>) => {
  if (!bbsId) {
    throw new Error("投稿IDが指定されていません");
  }
  const postId = parseInt(bbsId);
  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        username,
        title,
        content,
      },
    });
    revalidatePath(`/bbs-posts/${postId}`);
    revalidatePath("/bbs-posts");
  } catch (error) {
    console.error("投稿の編集に失敗しました:", error);
    throw new Error("投稿の編集に失敗しました");
  }
  redirect(`/bbs-posts/${postId}`);
};
