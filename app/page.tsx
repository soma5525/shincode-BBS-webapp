import BBSCardList from "../components/BBSCardList";
import { BBSData } from "./types/types";
import { getAllPost } from "./actions/getBBSAction";
import Link from "next/link";

export default async function Home() {
  let bbsAllData: BBSData[] = [];
  let error = false;

  try {
    bbsAllData = await getAllPost();
  } catch (e) {
    console.error("投稿の取得に失敗しました。", e);
    error = true;
  }

  return (
    <main className="container mx-auto">
      <div className="flex justify-between items-center mb-4 px-4 py-2">
        <h1 className="text-2xl font-bold">掲示板一覧</h1>
        <Link
          href="/bbs-posts/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          新規投稿
        </Link>
      </div>

      {error ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          投稿の取得中にエラーが発生しました。後でもう一度お試しください。
        </div>
      ) : bbsAllData.length === 0 ? (
        <div className="p-4 text-center">
          投稿がありません。最初の投稿を作成しましょう！
        </div>
      ) : (
        <BBSCardList bbsAllData={bbsAllData} />
      )}
    </main>
  );
}
