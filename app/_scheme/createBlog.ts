import z from "zod";

export const CREATE_BLOG_SCHEME = z.object({
  title: z.string("Enter valid title").trim().min(3, "The min title is 3 character"),
  description: z
    .string()
    .trim()
    .min(10, "The min description is 10Char")
    .max(100, "The max char is 100"),
});
