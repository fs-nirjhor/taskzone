"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { UpdateCard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }
  const { id, boardId, ...values } = data;
  let card;

  try {
    card = await db.card.update({
      where: { id, list: { board: { orgId } } }, // orgId is checking for authorization
      data: { ...values },
    });
  } catch (error: any) {
    return { error: error.message as string };
  }
  revalidatePath(`/board/${id}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
