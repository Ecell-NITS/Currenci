import { z } from "zod";

export const signInSchema = z.object({
  usernameOrEmail: z.string().min(4, "Please enter a valid username or email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
