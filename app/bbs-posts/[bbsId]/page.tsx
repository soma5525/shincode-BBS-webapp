import React from "react";
import { BBSData } from "@/app/types/types";
import Link from "next/link";
import { getPostById } from "@/app/actions/getBBSAction";
import { Button } from "@/components/ui/button";
import { deleteBBS } from "@/app/actions/deleteBBSAction";
import { notFound } from "next/navigation";

interface PageParams {
  params: Promise<{ bbsId: string }>;
}

const BBSDetailPage = async ({ params }: PageParams) => {
  try {
    // paramsからbbsIdを取得
    const { bbsId } = await params;

    // 投稿データの取得
    const bbsDetailData = await getPostById(bbsId);
    if (!bbsDetailData) {
      notFound();
    }

    // データが存在する場合の表示内容
    const { title, content, username } = bbsDetailData;

    return (
      <div className="mx-auto max-w-4xl p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-700">{username}</p>
        </div>
        <div className="mb-8">
          <p className="text-gray-900">{content}</p>
        </div>
        <div className="flex justify-between">
          <Link
            href="/"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
          >
            戻る
          </Link>
          <Link
            href={`/bbs-posts/edit/${bbsId}`}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-md"
          >
            編集
          </Link>
          <form action={deleteBBS}>
            <input type="hidden" name="bbsId" value={bbsId} />
            <Button type="submit" variant="destructive">
              削除
            </Button>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="mx-auto max-w-4xl p-4">
        <h1 className="text-2xl font-bold text-red-500">エラー</h1>
        <p>投稿の取得に失敗しました。</p>
        <Link
          href="/"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 inline-block"
        >
          戻る
        </Link>
      </div>
    );
  }
};

export default BBSDetailPage;
