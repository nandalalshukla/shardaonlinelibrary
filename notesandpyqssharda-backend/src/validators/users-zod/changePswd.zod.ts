//change password zod schema
import { email, z } from "zod";

export const changePasswordSchema = z.object({
  email: email(),
  currentPassword: z
    .string()
    .min(6, { message: "Minimum 6 characters" })
    .regex(/[A-Z]/, { message: "One uppercase letter required" })
    .regex(/[a-z]/, { message: "One lowercase letter required" })
    .regex(/[0-9]/, { message: "One number required" })
    .regex(/[@$!%*?&#]/, { message: "One special character required" }),
  newPassword: z
    .string()
    .min(6, { message: "Minimum 6 characters" })
    .regex(/[A-Z]/, { message: "One uppercase letter required" })
    .regex(/[a-z]/, { message: "One lowercase letter required" })
    .regex(/[0-9]/, { message: "One number required" })
    .regex(/[@$!%*?&#]/, { message: "One special character required" }),
});
