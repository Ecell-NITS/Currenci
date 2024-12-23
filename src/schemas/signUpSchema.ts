import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(4, "Username must have at least 4 characteres")
      .max(20, "Username must be less than 20 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Set the path to `confirmPassword`
  });

export const otpSchema = z.string().length(6, "Invalid OTP");
