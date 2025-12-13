import prisma from "@/src/config/db.js";

export const create = async (data: any) => {
    return prisma.customer.create({data});
};

export const findAll = async (userId: string) => {
    return prisma.customer.findMany({where: { user_id: userId }}); // aplicar el where de userId en el servicio
};

export const findById = async (id: string) => {
    return prisma.customer.findUnique({ where: { id } });
};

export const update = async (id: string, data: any) => {
    return prisma.customer.update({ where: { id }, data });
};

export const remove = async (id: string) => {
    return prisma.customer.delete({ where: { id } });
};