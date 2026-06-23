import z from "zod";

export const LOGIN_SCHEMA = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    ),
});

export const SIGNUP_SCHEMA = LOGIN_SCHEMA.extend({
  name: z.string().min(1, "Name is required."),
});
