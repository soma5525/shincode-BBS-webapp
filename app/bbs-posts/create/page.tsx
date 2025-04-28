"use client";

import React from "react";
import { z } from "zod";
import { formSchema } from "@/app/types/form";
import { postBBS } from "@/app/actions/postBBSAction";
import BBSForm from "@/components/BBSForm";
import { useRouter } from "next/navigation";

const CreateBBSPage = () => {
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await postBBS({
        username: values.username,
        title: values.title,
        content: values.content,
      });
    } catch (error) {
      console.error("投稿の作成に失敗しました:", error);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">新規投稿</h1>
      <BBSForm onSubmit={onSubmit} onCancel={() => router.push("/")} />
    </div>
  );
};

export default CreateBBSPage;
