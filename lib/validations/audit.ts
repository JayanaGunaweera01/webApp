import * as z from "zod";

export const AuditValidation = z.object({
  audit: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  audit: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});
