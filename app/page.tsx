import BBSCardList from "./components/BBSCardList";
import { BBSData } from "./types/types";

async function getBBSAllData() {
  try {
    const response = await fetch("http://localhost:3000/api/post", {
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      console.error(
        "API error:",
        response.status,
        response.statusText,
        errorData
      );
      return [];
    }

    const text = await response.text();
    try {
      return JSON.parse(text) as BBSData[];
    } catch (_e) {
      console.error("Failed to parse JSON:", text);
      return [];
    }
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
}

export default async function Home() {
  let bbsAllData: BBSData[] = [];
  try {
    bbsAllData = await getBBSAllData();
  } catch (error) {
    console.error("投稿の取得に失敗しました。", error);
  }
  return (
    <main>
      <BBSCardList bbsAllData={bbsAllData} />
    </main>
  );
}
