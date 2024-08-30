"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { UpdateListOrder } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }
  const { items, boardId } = data;
  let lists;
  try {
    const transaction = items.map((item) =>
      db.list.update({
        where: { id: item.id, board: { orgId } },
        data: { order: item.order },
      }),
    );
    lists = await db.$transaction(transaction);
  } catch (error: any) {
    return { error: error.message as string };
  } finally {
    revalidatePath(`/board/${boardId}`);
  }
  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
