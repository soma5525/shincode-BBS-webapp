"use server";

import prisma from "@/lib/prismaClient";
import { formSchema } from "../types/form";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 投稿の作成
export const postBBS = async ({
  username,
  title,
  content,
}: z.infer<typeof formSchema>) => {
  try {
    await prisma.post.create({
      data: {
        username,
        title,
        content,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("投稿の作成に失敗しました:", error);
    throw new Error("投稿の作成に失敗しました");
  }

  // redirectはtry/catchブロックの外で呼び出す
  redirect("/");
};
