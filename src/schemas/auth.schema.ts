import z from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(8),
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(8),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
