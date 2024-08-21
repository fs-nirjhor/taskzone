"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { CreateList } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }
  const { title, boardId } = data;

  let list;
  try {
    //? check board
    const board = await db.board.findUnique({ where: { id: boardId, orgId } });
    if (!board) {
      return { error: "Board not found" };
    }
    //? find last lists order
    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const order = lastList ? lastList.order + 1 : 1;

    // create list
    list = await db.list.create({ data: { title, boardId, order } });
  } catch (error: any) {
    return { error: error.message as string };
  }
  revalidatePath(`/organization/${orgId}`);
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
