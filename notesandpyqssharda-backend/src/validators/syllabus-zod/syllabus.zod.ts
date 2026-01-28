import { z } from "zod";

export const syllabusSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "title too short" })
    .max(100, { message: "title too long" }),
  fileUrl: z.string().url({ message: "invalid file URL" }),
  program: z
    .string()
    .trim()
    .min(2, { message: "program too short" })
    .max(100, { message: "program too long" }),
  courseCode: z
    .string()
    .trim()
    .min(2, { message: "course code too short" })
    .max(20, { message: "course code too long" }),
  courseName: z
    .string()
    .trim()
    .min(2, { message: "course name too short" })
    .max(100, { message: "course name too long" }),
  semester: z.coerce
    .number()
    .int({ message: "Semester must be a whole number" })
    .min(1, { message: "Semester must be at least 1" })
    .max(12, { message: "Semester too high" }),
});
