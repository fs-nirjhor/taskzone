"use server";

import { revalidatePath } from "next/cache";
import { db } from "../lib/db";

export const createBoard = async (formData : FormData) => {
    const title = formData.get("title") as string;
    await db.board.create({data:{title}})
    revalidatePath("http://localhost:3000/organization/org_2jGsLX1jf94XuK64P9p250HZegz")
}
