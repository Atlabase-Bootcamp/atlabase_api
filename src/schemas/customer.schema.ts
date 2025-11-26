import { z } from 'zod';

export const createCustomerSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.string().email('El correo electronico no es valido'),
    phone: z.string().optional(),
});

export const updateCustomerSchema = createCustomerSchema.partial(); z.object({
    params: z.object({
        id: z.string(),
}),
body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
 }),
});

export const idSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID inválido, debe ser un MongoId válido"),
    })
});

export type customerInput = z.infer<typeof createCustomerSchema>;
export type updateCustomerInput = z.infer<typeof updateCustomerSchema>;
export type customerIdInput = z.infer<typeof idSchema>;