"use client";

import { getPostById } from "@/app/actions/getBBSAction";
import { putBBS } from "@/app/actions/putBBSAction";
import { formSchema } from "@/app/types/form";
import BBSForm from "@/components/BBSForm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const EditBBSPage = () => {
  const router = useRouter();
  const params = useParams();
  const bbsId = params.bbsId as string;
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState({
    username: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    if (!bbsId) return;

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const post = await getPostById(bbsId);

        if (!post) {
          throw new Error("投稿が見つかりません");
        }

        setPostData({
          username: post.username,
          title: post.title,
          content: post.content,
        });
      } catch (error) {
        console.error("投稿の取得に失敗しました:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [bbsId, router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await putBBS({
        bbsId,
        username: values.username,
        title: values.title,
        content: values.content,
      });
    } catch (error) {
      console.error("投稿の更新に失敗しました:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl p-8 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-xl">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">投稿の編集</h1>
      <BBSForm
        initialData={postData}
        onSubmit={onSubmit}
        isEdit={true}
        onCancel={() => router.push(`/bbs-posts/${bbsId}`)}
      />
    </div>
  );
};

export default EditBBSPage;
