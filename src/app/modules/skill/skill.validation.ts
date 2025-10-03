import { Skillset } from "@prisma/client";
import z from "zod";

export const skillZodSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name is required"
          : "Name must be a string",
    })
    .nonempty("Name can't be blank")
    .min(5, "Name must be at least 5 characters long.")
    .max(20, "Name can't be more than 20 characters."),
  Icon: z
    .string("Icon must be a string")
    .nonempty("Icon can't be blank")
    .optional(),
  color: z
    .string("color must be a string")
    .nonempty("color can't be blank")
    .min(4, "Hex color must be at least 4 characters (#RGB)")
    .max(7, "Hex color must be at most 7 characters (#RRGGBB)")
    .regex(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/, {
      message: "Invalid hex color format. Use #RGB or #RRGGBB",
    })
    .transform((val) => val.toUpperCase())
    .optional(),
  skillset: z.enum(
    Object.values(Skillset),
    `Status must be one of: ${Object.values(Skillset).join(", ")}`
  ),
});

export const skillUpdateZodSchema = z.object({
  name: z
    .string("Name must be a string")
    .nonempty("Name can't be blank")
    .min(5, "Name must be at least 5 characters long.")
    .max(20, "Name can't be more than 20 characters.")
    .optional(),
  Icon: z
    .string("Icon must be a string")
    .nonempty("Icon can't be blank")
    .optional(),
  color: z
    .string("color must be a string")
    .nonempty("color can't be blank")
    .min(4, "Hex color must be at least 4 characters (#RGB)")
    .max(7, "Hex color must be at most 7 characters (#RRGGBB)")
    .regex(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/, {
      message: "Invalid hex color format. Use #RGB or #RRGGBB",
    })
    .transform((val) => val.toUpperCase())
    .optional(),
  skillset: z
    .enum(
      Object.values(Skillset),
      `Status must be one of: ${Object.values(Skillset).join(", ")}`
    )
    .optional(),
});
