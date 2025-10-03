import z from "zod";

export const projectZodSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name is required"
          : "Name must be a string",
    })
    .nonempty("Name can't be blank")
    .min(3, "Name must be at least 3 characters long.")
    .max(20, "Name can't be more than 20 characters."),

  title: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Title is required"
          : "Title must be a string",
    })
    .nonempty("Title can't be blank")
    .min(5, "Title must be at least 5 characters long.")
    .max(50, "Title can't be more than 50 characters."),

  description: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Description is required"
          : "Description must be a string",
    })
    .nonempty("Description can't be blank")
    .min(5, "Description must be at least 5 characters long.")
    .max(100, "Description can't be more than 100 characters."),

  longDescription: z
    .string("Long description must be a string")
    .nonempty("Long description can't be blank")
    .min(5, "Long description must be at least 5 characters long.")
    .max(1000, "Long description can't be more than 1000 characters.")
    .optional(),

  features: z
    .array(z.string("Feature must be a string"))
    .min(1, "At least one feature is required"),

  category: z
    .string("Category must be a string")
    .nonempty("Category can't be blank")
    .min(2, "Category must be at least 2 characters long.")
    .max(50, "Category can't be more than 50 characters.")
    .optional(),

  githubFrontend: z
    .url({
      error: (issue) =>
        issue.input === undefined
          ? "GitHub frontend code url is required"
          : "GitHub frontend code url must be a url",
    })
    .nonempty("GitHub frontend code url can't be blank"),

  githubBackend: z
    .url({
      error: (issue) =>
        issue.input === undefined
          ? "GitHub backend code url is required"
          : "GitHub backend code url must be a url",
    })
    .nonempty("GitHub backend code url can't be blank"),

  liveDemo: z
    .url({
      error: (issue) =>
        issue.input === undefined
          ? "Live url is required"
          : "Live url must be a url",
    })
    .nonempty("Live url can't be blank"),
});

export const projectUpdateZodSchema = z.object({
  name: z
    .string("Name must be a string")
    .nonempty("Name can't be blank")
    .min(3, "Name must be at least 3 characters long.")
    .max(20, "Name can't be more than 20 characters.")
    .optional(),

  title: z
    .string("Title must be a string")
    .nonempty("Title can't be blank")
    .min(5, "Title must be at least 5 characters long.")
    .max(50, "Title can't be more than 50 characters.")
    .optional(),

  description: z
    .string("Description must be a string")
    .nonempty("Description can't be blank")
    .min(5, "Description must be at least 5 characters long.")
    .max(100, "Description can't be more than 100 characters.")
    .optional(),

  longDescription: z
    .string("Long description must be a string")
    .nonempty("Long description can't be blank")
    .min(5, "Long description must be at least 5 characters long.")
    .max(1000, "Long description can't be more than 1000 characters.")
    .optional(),

  features: z
    .array(z.string("Feature must be a string"))
    .min(1, "At least one feature is required")
    .optional(),

  category: z
    .string("Category must be a string")
    .nonempty("Category can't be blank")
    .min(2, "Category must be at least 2 characters long.")
    .max(50, "Category can't be more than 50 characters.")
    .optional(),

  githubFrontend: z
    .url("GitHub frontend code url must be a url")
    .nonempty("GitHub frontend code url can't be blank")
    .optional(),

  githubBackend: z
    .url("GitHub backend code url must be a url")
    .nonempty("GitHub backend code url can't be blank")
    .optional(),

  liveDemo: z
    .url("Live url must be a url")
    .nonempty("Live url can't be blank")
    .optional(),
});
