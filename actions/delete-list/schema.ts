import { z } from "zod";

export const DeleteList = z.object({
  id: z.string({
    required_error: "Id is required",
    invalid_type_error: "Invalid id",
  }),
  boardId: z.string(),
});
