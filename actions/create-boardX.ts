"use server";

import { revalidatePath } from "next/cache";
import { db } from "../lib/db";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const CreateBoard = z.object({
  title: z.string().min(3, { message: "Minimum 3 letters is required" }),
});

export const createBoard = async (prevState: State, formData: FormData) => {
  const { orgSlug } = auth();
  const validatedFields = CreateBoard.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid value",
    };
  }

  const { title } = validatedFields.data;

  try {
    await db.board.create({ data: { title } });
  } catch (error) {
    return {
      message: "Failed to create board",
    };
  }
  revalidatePath(`/organization/${orgSlug}`);
  redirect(`/organization/${orgSlug}`);
};
