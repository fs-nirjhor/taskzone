"use server";

import { revalidatePath } from "next/cache";
import { db } from "../lib/db";
import {z} from "zod"
import { auth } from "@clerk/nextjs/server";

const CreateBoard = z.object({
    title: z.string()
})

export const createBoard = async (formData : FormData) => {
    const { orgSlug } = auth();
    const {title} = CreateBoard.parse({
        title: formData.get("title")
    })
    await db.board.create({data:{title}})
    revalidatePath(`/organization/${orgSlug}`)
}
