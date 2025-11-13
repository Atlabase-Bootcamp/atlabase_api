import z from "zod";

// Exporta registerSchema (valida email, password (min 8), username, first_name, last_name)
export const registerSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(8),
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
  })
});

// Exporta loginSchema (valida email, password).
export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(8),
  })
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
