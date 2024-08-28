"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { CreateCard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }
  const { title, boardId, listId } = data;

  let card;
  try {
    //? check list
    const list = await db.list.findUnique({
      where: { id: listId, board: { orgId } },
    });
    if (!list) {
      return { error: "List not found" };
    }

    // find card order
    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const order = lastCard ? lastCard.order + 1 : 1;

    // create card
    card = await db.card.create({
      data: { title, listId, order },
    });
  } catch (error: any) {
    return { error: error.message as string };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
