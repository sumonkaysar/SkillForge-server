import z from "zod";

export const blogZodSchema = z.object({
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Title is required"
          : "Title must be a string",
    })
    .nonempty("Title can't be blank")
    .min(3, "Title must be at least 3 characters long.")
    .max(50, "Title can't be more than 50 characters."),

  content: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Content is required"
          : "Content must be a string",
    })
    .nonempty("Content can't be blank")
    .min(5, "Content must be at least 5 characters long.")
    .max(5000, "Content must be under 5000 characters"),

  category: z
    .string("Category must be a string")
    .nonempty("Category can't be blank")
    .min(2, "Category must be at least 2 characters long.")
    .max(50, "Category can't be more than 50 characters.")
    .optional(),

  tags: z
    .array(z.string("Tag must be a string"))
    .min(1, "At least one tag is required"),

  isPublished: z
    .boolean("isPublished must be a boolean (either true or false)")
    .default(false),
});

export const blogUpdateZodSchema = z.object({
  title: z
    .string("Title must be a string")
    .nonempty("Title can't be blank")
    .min(3, "Title must be at least 3 characters long.")
    .max(50, "Title can't be more than 50 characters.")
    .optional(),

  content: z
    .string("Content must be a string")
    .nonempty("Content can't be blank")
    .min(5, "Content must be at least 5 characters long.")
    .max(5000, "Content must be under 5000 characters")
    .optional(),

  category: z
    .string("Category must be a string")
    .nonempty("Category can't be blank")
    .min(2, "Category must be at least 2 characters long.")
    .max(50, "Category can't be more than 50 characters.")
    .optional(),

  tags: z
    .array(z.string("Tag must be a string"))
    .min(1, "At least one tag is required")
    .optional(),

  isPublished: z
    .boolean("isPublished must be a boolean (either true or false)")
    .optional(),
});
