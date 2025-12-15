import z from "zod";

const ProjectStatusEnum = z.enum([
  "PLANNED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
]);

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(3, "El título debe tener al menos 3 caracteres."),
    description: z
      .string()
      .optional()
      .transform((val) => val ?? null),
    start_date: z.coerce
      .date()
      .optional()
      .transform((val) => val ?? null),
    estimated_end_date: z.coerce
      .date()
      .optional()
      .transform((val) => val ?? null),
    status: ProjectStatusEnum.default("PLANNED"),
    customerId: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID de cliente inválido"),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID de proyecto inválido"),
  }),
  body: createProjectSchema.shape.body.omit({ customerId: true }).partial(),
});

export const createTaskSchema = z.object({
  params: updateProjectSchema.shape.params,
  body: z.object({
    title: z.string().min(1, "El título de la tarea es obligatorio"),
    description: z
      .string()
      .optional()
      .transform((val) => val ?? null),
    is_completed: z.boolean().optional(),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID de proyecto inválido"),
    taskId: z.uuid("ID de tarea inválido"),
  }),
  body: createTaskSchema.shape.body.partial(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>["body"];
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>["body"];
export type CreateTaskInput = z.infer<typeof createTaskSchema>["body"];
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>["body"];
export type UpdateTaskParams = z.infer<typeof updateTaskSchema>["params"];
