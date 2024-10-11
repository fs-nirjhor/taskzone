import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } },
) {
  try {
    const { orgId, userId } = auth();

    if (!orgId || !userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const card = await db.card.findUnique({
      where: { id: params.cardId, list: { board: { orgId } } },
      include: {
        list: { select: { title: true } },
      },
    });
    return new NextResponse(JSON.stringify(card), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
