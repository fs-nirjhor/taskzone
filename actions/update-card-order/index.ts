"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { UpdateCardOrder } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }
  const { items, boardId } = data;
  let cards;
  try {
    const transaction = items.map((item) =>
      db.card.update({
        where: { id: item.id, list: { board: { orgId } } },
        data: { order: item.order, listId: item.listId },
      }),
    );
    cards = await db.$transaction(transaction);
  } catch (error: any) {
    return { error: error.message as string };
  } finally {
    revalidatePath(`/board/${boardId}`);
  }
  return { data: cards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
