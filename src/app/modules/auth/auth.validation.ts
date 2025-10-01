import z from "zod";

const passwordZodSchema = (label: string) =>
  z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? `${label} is required`
          : `${label} must be a string`,
    })
    .nonempty(`${label} can't be blank`)
    .min(8, `${label} must be at least 8 characters long`)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,

      `${label} must include at least 1 uppercase, 1 lowercase, and 1 special character (! @ # $ % ^ & *)`
    );

export const registerZodSchema = z.object({
  email: z
    .email({
      error: (issue) =>
        issue.input === undefined
          ? "Email is required"
          : "Invalid email address.",
    })
    .nonempty("Email can't be blank."),
  password: passwordZodSchema("Password"),
});

export const changePasswordZodSchema = z.object({
  oldPassword: passwordZodSchema("Old password"),
  newPassword: passwordZodSchema("New password"),
});
