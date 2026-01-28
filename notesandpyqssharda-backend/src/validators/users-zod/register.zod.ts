import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Name too short" })
      .max(50, { message: "Name too long" })
      .regex(/^[a-zA-Z ]+$/, { message: "Only letters allowed" }),

    email: z
      .email({ message: "Invalid email format" })
      .trim()
      .toLowerCase()
      .refine(
        (email) => {
          const domain = email.split("@")[1];
          return domain === "ug.sharda.ac.in";
        },
        {
          message: "Only Sharda University student emails are allowed",
        }
      ),

    password: z
      .string()
      .min(6, { message: "Minimum 6 characters" })
      .regex(/[A-Z]/, { message: "One uppercase letter required" })
      .regex(/[a-z]/, { message: "One lowercase letter required" })
      .regex(/[0-9]/, { message: "One number required" })
      .regex(/[@$!%*?&#]/, { message: "One special character required" }),

  }).required();

  
