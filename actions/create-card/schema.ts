import { z } from "zod";

export const CreateCard = z.object({
  title: z
    .string({
      required_error: "Title is required", // check undefined or null. (will not check empty string)
      invalid_type_error: "Invalid title",
    })
    .trim()
    .superRefine((value, ctx) => {
      if (value.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Title is required",
        });
      } else if (value.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Title is too short",
        });
      }
    }),
  boardId: z.string(),
  listId: z.string(),
});
