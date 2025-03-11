import { z } from "zod";

export const userSchema = z.object({
  fullname: z.string().min(4, "Name must have at least 4 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
});
