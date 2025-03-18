import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prismaClient";

type Props = {
  params: {
    bbsId: string;
  };
};

export async function GET(request: NextRequest, props: Props) {
  const bbsId = props.params.bbsId;

  try {
    const bbsDetailData = await prisma.post.findUnique({
      where: {
        id: parseInt(bbsId),
      },
    });

    if (!bbsDetailData) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(bbsDetailData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
