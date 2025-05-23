import { z } from "zod";

export const updateUserSchema = z.object({
  id: z.string(),
  role: z.enum(["admin", "user", "superAdmin"]),
});

export type UpdateUserInputs = z.infer<typeof updateUserSchema>;
