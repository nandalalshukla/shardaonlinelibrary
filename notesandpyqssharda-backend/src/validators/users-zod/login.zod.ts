import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .email({ message: "Invalid email" })
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

  password: z.string().trim(),
});
