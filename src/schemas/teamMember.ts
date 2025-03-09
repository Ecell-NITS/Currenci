import { z } from "zod";

export const teamMemberSchema = z.object({
  name: z.string().min(4, "Name must have at least 4 characters"),
  designation: z.string().min(4, "Designation must have at least 4 characters"),
  email: z.string().email("Invalid email address"),
  linkedin: z.string().url("Invalid linkedin url").optional().or(z.literal("")),
});
