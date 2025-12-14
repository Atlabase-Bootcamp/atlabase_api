import z from "zod";

export const mongoIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID Inválido"),
});

export type IdParam = z.infer<typeof mongoIdSchema>;
