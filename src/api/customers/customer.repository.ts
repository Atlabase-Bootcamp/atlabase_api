import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

export const create = async (data: any) => {
    return prisma.customer.create({data});
};

export const findAll = async () => {
    return prisma.customer.findMany();
};

export const findById = async (id: string) => {
    return prisma.customer.delete.findUnique({ where: { id } });
};

export const update = async (id: string, data: any) => {
    return prisma.customer.update({ where: { id }, data });
};

export const remove = async (id: string) => {
    return prisma.customer.delete({ where: { id } });
};