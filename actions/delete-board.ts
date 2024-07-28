"use server";

import { revalidatePath } from "next/cache";
import { db } from "../lib/db";
import { auth } from "@clerk/nextjs/server";

export const deleteBoard = async (id: string) => {
    const { orgSlug } = auth();
    await db.board.delete({where:{id}})
    revalidatePath(`/organization/${orgSlug}`)
}
