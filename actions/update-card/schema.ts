import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Invalid description",
      })
      .min(3, { message: "Description is too short" }),
  ),
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
  id: z.string({
    required_error: "Id is required",
    invalid_type_error: "Invalid id",
  }),
});
