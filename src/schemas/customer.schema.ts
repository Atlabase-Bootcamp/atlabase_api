import { z } from 'zod';

export const createCustomerSchema = z.object({
    body: z.object({
        name: z.string().min(1, "El nombre es obligatorio"),
        email:z.email('El email no es válido').optional().transform((val) => val??null),
        phone_number: z.string().min(10, "El teléfono debe tener al menos 10 dígitos").optional().transform((val) => val??null),
        notes: z.string().optional().transform((val) => val??null),
    })
});

export const idSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID inválido, debe ser un MongoId válido"),
    })
});

export const updateCustomerSchema = z.object({
    params: idSchema.shape.params,
    body: createCustomerSchema.shape.body.partial()
})

export type customerInput = z.infer<typeof createCustomerSchema>;
export type updateCustomerInput = z.infer<typeof updateCustomerSchema>;
export type customerIdInput = z.infer<typeof idSchema>;