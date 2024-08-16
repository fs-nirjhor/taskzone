"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { UpdateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }
  const { title, id } = data;

  let board;
  try {
    board = await db.board.update({
      where: { id, orgId }, // orgId is checking for authorization
      data: { title },
    });
  } catch (error: any) {
    return { error: error.message as string };
  }
  revalidatePath(`/dashboard/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
