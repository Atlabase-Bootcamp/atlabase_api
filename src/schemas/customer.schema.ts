import { z } from "zod";
import { mongoIdSchema } from "./common.schema.js";

export const createCustomerSchema = z.object({
  body: z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z
      .email("El email no es válido")
      .or(z.literal(""))
      .optional()
      .transform((val) => val ?? null),
    phone_number: z
      .string()
      .min(10, "El teléfono debe tener al menos 10 dígitos")
      .or(z.literal(""))
      .optional()
      .transform((val) => val ?? null),
    notes: z
      .string()
      .optional()
      .transform((val) => val ?? null),
  }),
});

export const updateCustomerSchema = z.object({
  params: mongoIdSchema,
  body: createCustomerSchema.shape.body.partial(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>["body"];
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>["body"];
export type UpdateCustomerParams = z.infer<typeof mongoIdSchema>;
